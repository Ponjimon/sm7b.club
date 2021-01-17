import styled from 'styled-components';
import {
  styleAlignItemsStretch,
  styleFlex,
  styleFlexGrow,
  styleFlexNowrap,
  styleFlexRow,
  styleFlexColumn,
  styleFlexShrink,
  styleFlexShrink0,
  styleJustifyContentBetween,
  styleJustifyContentStart,
  styleAlignSelfCenter,
} from '../../styles/flex-box';
import { styleFullHeight, styleFullWidth } from '../../styles/layout';

export const AppBarContainer = styled.nav`
  height: 5rem;
  ${styleFlexShrink0};
`;

export const AppBarMenu = styled.div`
  ${styleFlex}
  ${styleAlignItemsStretch}
  ${styleFlexNowrap};
  ${styleFullHeight}
  box-shadow: var(--shadow-elevation-1);
  background-color: var(--color-background-base);
`;

export const AppBarContent = styled.div`
  ${styleFlex}
  ${styleFullWidth}
  ${styleFlexNowrap}
  ${styleAlignItemsStretch}
  ${styleJustifyContentStart}
  ${styleFlexGrow}
  ${styleFlexShrink}
`;

export const AppBarMenuItems = styled.div`
  ${styleJustifyContentBetween}
  ${styleFlexRow}
  ${styleFlex}
  ${styleFullHeight}
`;

export const AppBarMenuItemContainer = styled.div`
  ${styleFlexColumn}
  ${styleFlex}
  ${styleFullHeight}
`;

export const AppBarMenuItem = styled.div`
  ${styleAlignSelfCenter}
  ${styleFlex}
  ${styleFullHeight}
`;
