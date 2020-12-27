import type { NextApiRequest, NextApiResponse } from 'next';
import TwitchApi from 'node-twitch';

const twitch = new TwitchApi({
  client_id: process.env.TWITCH_CLIENT_ID,
  client_secret: process.env.TWITCH_CLIENT_SECRET,
});

const channelNames = [
  'hasanabi',
  'ivysky',
  'lillyvinnily',
  'natsumiii',
  'physicalgamerz',
  'potasticp',
  'spaceboy',
  'barrr_none',
  'ruutv',
  'theartofkaidn',
  'iamsimeonb',
  'seamoose',
  'ibanjy',
  'its__cole',
  'misspolaroid',
  'illkingkilla',
  'delt4forc3',
  'barefoottasha',
  'z_h_o_r_a',
  'spiritendo',
  'duendepablo',
  'notsch_',
  'annelle',
  'nmplol',
  'fps_shaka',
  'papaplatte',
  'lumenti',
  'arab',
  'trymacs',
  'pobr4tski',
  'kerem',
  'thesmallpack',
  'muusoo',
  'monsterdface',
  'jennyyl',
  'juansguarnizo',
  'dekarldent',
  'julienbam',
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const liveChannels = await twitch.getStreams({ channels: channelNames });
  const channels = [
    ...channelNames
      .filter(
        channel =>
          !liveChannels.data.find(c => c.user_name.toLowerCase() === channel)
      )
      .map(channel => ({
        channel: channel,
        thumbnail: `/static/live_user_${channel}.jpg`,
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
  res.status(200).json({ channels });
};
