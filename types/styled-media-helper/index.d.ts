declare module 'styled-media-helper' {
  class Media {
    up(media: M): string;
    down(media: M): string;
    between(mediaMin: M, mediaMax: M): string;
    only(media: M): string;
  }

  export default function (sizes: Record<string, number>): Media;
}
