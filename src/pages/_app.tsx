import NextApp, { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { CSSVariables } from '../styles/variables';

const Meta: FC = () => {
  const tagline = 'Twitch streamers using the Shure SM7B';
  return (
    <Head>
      <title>SM7B Club</title>

      <link href="/static/manifest.json" rel="manifest" />
      <meta content={tagline} name="description" />

      <meta content="SM7B Club" property="og:title" />
      <meta content={tagline} property="og:description" />
      <meta content="https://sm7b.club" property="og:url" />

      <meta content="SM7B Club" name="twitter:title" />
      <meta content={tagline} name="twitter:description" />

      <meta content="#9146FF" name="theme-color" />
    </Head>
  );
};

const GlobalStyle = createGlobalStyle`
  ${reset};
  ${CSSVariables};

  html {
    font-size: 62.5%;
    text-size-adjust: 100%;
  }

  body {
    background: #000;
    font-family: Roboto;
    font-size: 1.3rem;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      background: transparent;
      width: .8rem;
    }

    &::-webkit-scrollbar-thumb {
      background: #1f1f23;
      border-radius: .4rem;
    }
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
