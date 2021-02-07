import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document<{ styleTags: Object }> {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  public render() {
    return (
      <Html lang="en">
        <Head>
          {this.props.styleTags}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <link rel="icon" type="image/x-icon" href="./static/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://open.scdn.co/cdn/build/web-player/web-player.d1458de0.css"
          ></link>
          <link
            rel="preload"
            href="https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Book.3466e0ec.woff2"
            as="font"
            type="font/woff2"
          ></link>
          <link
            rel="preload"
            href="https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Bold.8d0a45cc.woff2"
            as="font"
            type="font/woff2"
          ></link>
          <link
            rel="preload"
            href="https://open.scdn.co/cdn/fonts/spoticon_regular_2.d319d911.woff2"
            as="font"
            type="font/woff2"
          ></link>
          <link
            rel="preload"
            href="https://open.scdn.co/cdn/fonts/spoticon_regular_2.d319d911.woff2"
            as="font"
            type="font/woff2"
          ></link>
          <link
            rel="icon"
            sizes="32x32"
            type="image/png"
            href="https://open.scdn.co/cdn/images/favicon32.a19b4f5b.png"
          ></link>
          <meta
            name="Description"
            content="An app to help create spotify playlists"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://sdk.scdn.co/spotify-player.js"></script>
        </body>
      </Html>
    );
  }
}
