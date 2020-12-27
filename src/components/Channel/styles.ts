import styled from 'styled-components';
import mediaHelper from 'styled-media-helper';

const media = mediaHelper({
  sm: 320,
  md: 768,
  lg: 1240,
});

export const Info = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 30px;
  padding: 15px;
  color: #fff;
  transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
  transition-delay: 0.2s;
  will-change: transform, opacity;
  z-index: 0;
  display: flex;
  align-items: center;

  ${media.up('lg')} {
    opacity: 0;
  }
`;

export const Wrapper = styled.a`
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  will-change: transform;
  z-index: 0;
  line-height: 0;
  display: block;

  ${media.up('lg')} {
    ${Info} {
      transform: translateY(100%);
    }

    &:hover {
      transform: scale(1.1);
      z-index: 1;

      ${Info} {
        transform: translateY(0%);
        opacity: 1;
      }
    }
  }
`;

export const AspectSpacer = styled.div<{ imgPath: string }>`
  padding-bottom: 56.25%;
  pointer-events: none;

  background-image: url(${({ imgPath }) => imgPath});
  background-size: cover;
  z-index: 1;
`;

export const Img = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  min-height: 100%;
  top: 0;

  max-width: 100%;
  vertical-align: top;
  pointer-events: none;
  border: 0;
`;
