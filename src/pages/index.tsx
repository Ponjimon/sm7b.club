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
}

const Index: NextPage<{ channels: Channel[] }> = ({ channels }) => (
  <ChannelList>
    {channels.map(({ channel, thumbnail, isLive, viewers }) => (
      <Channel
        key={channel}
        user={channel}
        thumbnail={thumbnail}
        isLive={isLive}
      />
    ))}
  </ChannelList>
);

Index.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const res = await fetch(`${origin}/api/channels`);
  const json = await res.json();

  return json;
};

export default Index;
