import React, { FC } from 'react';
import {
  AspectSpacer,
  Wrapper,
  Info,
  LiveBadge,
  LiveBadgeWrapper,
  LiveBadgeText,
} from './styles';

export interface ChannelProps {
  user: string;
  thumbnail: string;
  isLive?: boolean;
}

export const Channel: FC<ChannelProps> = ({
  user,
  thumbnail: imgPath,
  isLive,
}) => (
  <Wrapper
    href={`https://twitch.tv/${user}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <AspectSpacer imgPath={imgPath} />
    <Info>
      <span>{user}</span>
    </Info>
    {isLive && (
      <LiveBadgeWrapper>
        <LiveBadge>
          <LiveBadgeText>LIVE</LiveBadgeText>
        </LiveBadge>
      </LiveBadgeWrapper>
    )}
  </Wrapper>
);
