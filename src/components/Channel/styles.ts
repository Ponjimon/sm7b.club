import styled, { css } from 'styled-components';

export interface BadgeWrapperProps {
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}
export const BadgeWrapper = styled.div<BadgeWrapperProps>`
  position: absolute;
  margin: 1rem;

  ${({ position }) => {
    switch (position) {
      case 'topLeft':
        return css`
          top: 0;
          left: 0;
        `;
      case 'topRight':
        return css`
          top: 0;
          right: 0;
        `;

      case 'bottomLeft':
        return css`
          bottom: 0;
          left: 0;
        `;
      case 'bottomRight':
        return css`
          bottom: 0;
          right: 0;
        `;
    }
  }}
`;

export interface BadgeProps {
  variant?: 'default' | 'live';
}

export const Badge = styled.div<BadgeProps>`
  display: inline-block;
  text-align: center;
  pointer-events: none;
  color: #fff;
  font-size: 1.3rem;

  ${({ variant }) => {
    switch (variant) {
      case 'live':
        return css`
          border-radius: 0.4rem;
          background: var(--color-fill-live);
          padding: 0 0.5rem;

          ${BadgeText} {
            text-transform: uppercase;
            font-weight: 600;
          }
        `;
      default:
        return css`
          border-radius: 0.2rem;
          padding: 0 0.4rem;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        `;
    }
  }};
`;

export const BadgeText = styled.p`
  white-space: nowrap;
  line-height: 1.5;
  font-size: 1.3rem;
`;

export const Wrapper = styled.a`
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  will-change: transform;
  z-index: 0;
  line-height: 0;
  display: block;
  opacity: 0.3;

  &.is-live,
  &:hover {
    opacity: 1;
  }

  &:hover {
    &:after {
      box-shadow: inset 0 0 0 4px #9146ff;
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
`;

export const AspectSpacer = styled.div`
  padding-bottom: 56.25%;
  pointer-events: none;
  z-index: 1;
`;
