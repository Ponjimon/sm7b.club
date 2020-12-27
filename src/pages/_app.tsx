import NextApp, { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';

const Meta: FC = () => {
  const tagline = 'Twitch streamers using the Shure SM7B';
  return (
    <Head>
      <title>sm7b.club</title>

      <link href="/static/manifest.json" rel="manifest" />
      <meta content={tagline} name="Description" />

      <meta content="sm7b.club" property="og:title" />
      <meta content={tagline} property="og:description" />
      <meta content="https://sm7b.club" property="og:url" />

      <meta content="sm7b.club" name="twitter:title" />
      <meta content={tagline} name="twitter:description" />

      <meta content="#9146FF" name="theme-color" />
    </Head>
  );
};

const GlobalStyle = createGlobalStyle`
  ${reset};

  body {
    background: #000;
    font-family: Roboto;
    overflow-x: hidden;
  }
`;

const Main = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={{}}>
        <Meta />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default class App extends NextApp {
  render() {
    return <Main {...this.props} />;
  }
}
