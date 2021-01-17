import { S3 } from 'aws-sdk';
import { Events } from 'aws-sdk/clients/cognitosync';
import { StreamingEventStream } from 'aws-sdk/lib/event-stream/event-stream';
import type { NextApiRequest, NextApiResponse } from 'next';
import TwitchApi from 'node-twitch';

const twitch = new TwitchApi({
  client_id: process.env.TWITCH_CLIENT_ID,
  client_secret: process.env.TWITCH_CLIENT_SECRET,
});

const isStreamingEventsStream = (
  item: any
): item is StreamingEventStream<Events> => typeof item.on === 'function';

const queryChannels = <T = any>(expression: string) =>
  new Promise<T[]>(async (resolve, reject) => {
    const s3 = new S3({
      region: process.env.S3_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET,
      },
    });
    const { Payload } = await s3
      .selectObjectContent({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: 'data/channels.csv',
        ExpressionType: 'SQL',
        Expression: expression,
        InputSerialization: {
          CSV: {
            FileHeaderInfo: 'USE',
            RecordDelimiter: '\n',
            FieldDelimiter: ',',
          },
        },
        OutputSerialization: {
          JSON: {
            RecordDelimiter: '\n',
          },
        },
      })
      .promise();

    if (isStreamingEventsStream(Payload)) {
      let data = '';
      Payload.on('data', ({ Records }) => {
        if (!Records) {
          return;
        }

        data += Records.Payload.toString();
      });
      Payload.on('error', reject);
      Payload.on('end', () => {
        resolve(
          data
            .split('\n')
            .map(record => {
              if (!record.trim()) {
                return null;
              }
              return JSON.parse(record);
            })
            .filter(a => a)
        );
      });
    }
  });

const DEFAULT_LIMIT = 100;
export default async (req: NextApiRequest, res: NextApiResponse) => {
  let limit = Number(req.query.limit || DEFAULT_LIMIT) || DEFAULT_LIMIT;
  let offset = Number(req.query.offset || 0) || 0;

  if (limit < 1 || limit > DEFAULT_LIMIT) {
    limit = DEFAULT_LIMIT;
  }

  if (offset < 0) {
    offset = 0;
  }
  const [{ _1: total }] = await queryChannels<{ _1: number }>(
    `SELECT count(*) FROM S3Object s`
  );
  const queriedChannels = await queryChannels<{ channel: string }>(
    `SELECT s.channel FROM S3Object s WHERE cast(s.row_index as Int) >= ${
      offset + 1
    } LIMIT ${limit}`
  );
  const channelNames = queriedChannels.map(({ channel }) => channel);
  const liveChannels = await twitch.getStreams({ channels: channelNames });
  const adIndex = Math.floor(Math.random() * liveChannels.data.length) + 1;
  const channels = [
    ...channelNames
      .filter(
        channel => !liveChannels.data.map(c => c.user_name).includes(channel)
      )
      .map(channel => ({
        channel: channel,
        thumbnail: `https://s3.eu-central-1.amazonaws.com/cdn.sm7b.club/thumbnails/live_user_${channel.toLowerCase()}.jpg`,
        isLive: false,
        viewers: 0,
      })),
    ...liveChannels.data.map(channel => ({
      channel: channel.user_name,
      thumbnail: channel.getThumbnailUrl(),
      isLive: true,
      viewers: channel.viewer_count,
    })),
  ].sort(({ viewers }, { viewers: viewersB }) => {
    if (viewers < viewersB) {
      return 1;
    }

    if (viewers > viewersB) {
      return -1;
    }

    return 0;
  });
  res.status(200).json({ total, channels, adIndex });
};
