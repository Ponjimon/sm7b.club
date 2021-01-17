import { badRequest, methodNotAllowed } from '@hapi/boom';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { NextApiRequest, NextApiResponse } from 'next';
import { S3 } from 'aws-sdk';
import fetch from 'node-fetch';
import { fromBuffer as fileTypeFromBuffer } from 'file-type';
import { Interaction, InteractionResponse } from '../../../interfaces/discord';
import { verifyKey } from '../../../utils/verify-key';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleUpload = async (
  interaction: Interaction
): Promise<InteractionResponse> => {
  if (interaction.member.user.id !== '103443430302035968') {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: 'You are not allowed to use this command.' },
    };
  }
  const { value: channel } =
    interaction.data?.options?.find(option => option.name === 'channel') || {};
  let { value: url } =
    interaction.data?.options?.find(option => option.name === 'url') || {};

  if (!channel) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: 'Invalid Channel.' },
    };
  }

  if (!url || (url && !url.startsWith('https://'))) {
    // if no vaid URL is set, try to download current live URL
    url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel.toLowerCase()}.jpg`;
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: 'Invalid URL.' },
    };
  }
  const s3 = new S3({
    region: process.env.S3_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET,
    },
  });

  try {
    const res = await fetch(url);
    const status = res.status;

    if (status !== 200) {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Invalid channel \`${channel}\``,
        },
      };
    }
    const data = await res.buffer();
    const { mime } = await fileTypeFromBuffer(data);

    if (mime !== 'image/jpeg') {
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Invalid file type \`${mime}\`. Only \`image/jpeg\` is allowed.`,
        },
      };
    }
    await s3
      .putObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `thumbnails/live_user_${channel}.jpg`,
        ContentType: mime,
        ContentLength: res.headers['content-length'],
        Body: data,
        ACL: 'public-read',
      })
      .promise();
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Success!`,
      },
    };
  } catch (e) {
    console.warn('ERR', e);
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: 'Error fetching image.' },
    };
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    throw methodNotAllowed();
  }
  await verifyKey(process.env.DISCORD_PUBLIC_KEY)(req, res);

  const interaction = req.body as Interaction;

  if (interaction.type === InteractionType.COMMAND) {
    switch (interaction.data.name) {
      case 'upload':
        res.json(await handleUpload(interaction));
        break;
      default:
        throw badRequest('Unknown command.');
    }
    return;
  }

  throw badRequest();
};
