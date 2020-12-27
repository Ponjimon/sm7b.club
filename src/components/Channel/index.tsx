import React, { FC } from 'react';
import { AspectSpacer, Img, Wrapper, Info } from './styles';

export interface ChannelProps {
  user: string;
  imgPath: string;
}

export const Channel: FC<ChannelProps> = ({ user, imgPath }) => (
  <Wrapper
    href={`https://twitch.tv/${user}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <AspectSpacer imgPath={imgPath} />
    <Info>
      <span>{user}</span>
    </Info>
  </Wrapper>
);
