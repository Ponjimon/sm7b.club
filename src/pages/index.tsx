import { NextPage } from 'next';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';
import { Channel } from '../components/Channel';
import { ChannelList } from '../containers/ChannelList';

interface Channel {
  channel: string;
  thumbnail: string;
  isLive: boolean;
  viewers: number;
  isAd: boolean;
}

const Index: NextPage<{ channels: Channel[] }> = ({ channels }) => (
  <ChannelList>
    {channels.map(({ channel, thumbnail, isLive, viewers, isAd }) => (
      <Channel
        key={channel}
        user={channel}
        thumbnail={thumbnail}
        isLive={isLive}
        viewers={viewers}
        isAd={isAd}
      />
    ))}
  </ChannelList>
);

Index.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const res = await fetch(`${origin}/api/channels`);
  const { channels, adIndex, ...rest } = await res.json();

  channels.splice(adIndex, 0, { channel: 'Shure SM7B', isAd: true });

  return { channels, ...rest };
};

export default Index;
