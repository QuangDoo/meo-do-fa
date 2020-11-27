import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

const globalStyles = `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

*:focus {
  outline: 0 !important;
}
`;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(materialUiSheets.collect(<App {...props} />))
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            {materialUiSheets.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />

          {/* Normalize CSS */}
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            rel="stylesheet"
          />

          {/* Roboto Font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
            rel="stylesheet"
          />

          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />

          <style type="text/css">{globalStyles}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
