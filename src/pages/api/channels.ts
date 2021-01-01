import type { NextApiRequest, NextApiResponse } from 'next';
import TwitchApi from 'node-twitch';

const twitch = new TwitchApi({
  client_id: process.env.TWITCH_CLIENT_ID,
  client_secret: process.env.TWITCH_CLIENT_SECRET,
});

const channelNames = [
  'HasanAbi',
  'IvySky',
  'LillyVinnily',
  'Natsumiii',
  'physicalgamerz',
  'PotasticP',
  'Spaceboy',
  'barrr_none',
  'RuuTV',
  'TheARTofKaidn',
  'iamsimeonb',
  'Seamoose',
  'iBanjy',
  'Its__Cole',
  'MissPolaroid',
  'IllKingKilla',
  'Delt4Forc3',
  'BarefootTasha',
  'Z_H_O_R_A',
  'Spiritendo',
  'DuendePablo',
  'NoTsch_',
  'annelle',
  'Nmplol',
  'fps_shaka',
  'Papaplatte',
  'Lumenti',
  'Arab',
  'Trymacs',
  'PoBr4tski',
  'Kerem',
  'thesmallpack',
  'Muusoo',
  'MonsterDface',
  'JennyyL',
  'juansguarnizo',
  'Dekarldent',
  'JulienBam',
  'Perxitaa',
  'rewinside',
  'iBlali',
  'alessandra',
  'TherealJanHegenberg',
  'SweeetTails',
  'chairhandler',
  'lisabby',
  'TheGreatSkeletonMan',
  'JargonTV',
  'JACKZON',
  'Dex5_',
  'johndillon',
  'roozworld',
  'JamesDE',
  'AikoBliss',
  'AnniTheDuck',
  'HerrNewstime',
  'Stayi',
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const liveChannels = await twitch.getStreams({ channels: channelNames });
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
  res.status(200).json({ channels });
};
