import React, { FC } from 'react';
import Image from 'next/image';
import numeral from 'numeral';
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
  isAd?: boolean;
}

export const Channel: FC<ChannelProps> = ({
  user,
  thumbnail: imgPath,
  isLive,
  viewers,
  isAd,
}) => (
  <Wrapper
    href={isAd ? 'https://amzn.to/35KnLVB' : `https://twitch.tv/${user}`}
    target="_blank"
    rel="noopener noreferrer"
    className={isLive || isAd ? 'is-live' : ''}
  >
    <AspectSpacer />
    <Image
      src={
        isAd
          ? 'https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=DE&ASIN=B0002E4Z8M&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=sm7bclub-21'
          : imgPath
      }
      layout="fill"
      objectFit="cover"
      priority
    />

    <BadgeWrapper position="bottomRight">
      <Badge>
        <BadgeText>{user}</BadgeText>
      </Badge>
    </BadgeWrapper>
    {(isLive || isAd) && (
      <>
        <BadgeWrapper position="topLeft">
          <Badge variant={isAd ? 'ad' : 'live'}>
            <BadgeText>{isAd ? 'AD' : 'LIVE'}</BadgeText>
          </Badge>
        </BadgeWrapper>
        {!isAd && (
          <BadgeWrapper position="bottomLeft">
            <Badge>
              <BadgeText>
                {numeral(viewers).format('0[.]0a').toUpperCase()} viewers
              </BadgeText>
            </Badge>
          </BadgeWrapper>
        )}
      </>
    )}
  </Wrapper>
);
