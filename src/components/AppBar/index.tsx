import React, { FC } from 'react';
import {
  AppBarContainer,
  AppBarContent,
  AppBarMenu,
  AppBarMenuItem,
  AppBarMenuItemContainer,
  AppBarMenuItems,
} from './styles';

export const AppBar: FC = () => (
  <AppBarContainer>
    <AppBarMenu>
      <AppBarContent>
        <div>
          <AppBarMenuItems>
            <AppBarMenuItemContainer>
              <AppBarMenuItem>Test</AppBarMenuItem>
            </AppBarMenuItemContainer>
          </AppBarMenuItems>
        </div>
      </AppBarContent>
    </AppBarMenu>
  </AppBarContainer>
);
