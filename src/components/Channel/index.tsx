import React, { FC } from 'react';
import Image from 'next/image';
import numeral from 'numeral';
import { getImageLoader } from '../../utils/image-loader';
import {
  AspectSpacer,
  Wrapper,
  BadgeText,
  BadgeWrapper,
  Badge,
} from './styles';

export interface ChannelProps {
  user?: string;
  thumbnail?: string;
  isLive?: boolean;
  viewers?: number;
}

export const Channel: FC<ChannelProps> = ({
  user,
  thumbnail: imgPath,
  isLive,
  viewers,
}) => (
  <Wrapper
    href={`https://twitch.tv/${user}`}
    target="_blank"
    rel="noopener noreferrer"
    className={isLive ? 'is-live' : ''}
  >
    <AspectSpacer />
    <Image
      src={imgPath}
      loader={getImageLoader()}
      layout="fill"
      objectFit="cover"
      priority
    />
    <BadgeWrapper position="bottomRight">
      <Badge>
        <BadgeText>{user}</BadgeText>
      </Badge>
    </BadgeWrapper>
    {isLive && (
      <>
        <BadgeWrapper position="topLeft">
          <Badge variant={'live'}>
            <BadgeText>{'LIVE'}</BadgeText>
          </Badge>
        </BadgeWrapper>
        <BadgeWrapper position="bottomLeft">
          <Badge>
            <BadgeText>
              {numeral(viewers).format('0[.]0a').toUpperCase()} viewers
            </BadgeText>
          </Badge>
        </BadgeWrapper>
      </>
    )}
  </Wrapper>
);
