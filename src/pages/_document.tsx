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
            materialUiSheets.collect(sheet.collectStyles(<App {...props} />))
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          ...React.Children.toArray(initialProps.styles),
          sheet.getStyleElement(),
          materialUiSheets.getStyleElement()
        ]
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="vi">
        <Head>
          <meta charSet="utf-8" />

          {/* Normalize CSS */}
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            rel="stylesheet"
          />

          <style type="text/css">{globalStyles}</style>

          <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              document.addEventListener("DOMContentLoaded", function(event) {
                setTimeout(function() {
                  window.OneSignal = window.OneSignal || [];
                  OneSignal.push(function() {
                    OneSignal.init({
                      appId: document.location.host === 'medofa.com' ?
                        "5c70e54f-8d3d-4a11-aec4-a824005d5657" :
                        "356ba4fa-e52f-437c-b5f0-c03984642a60", 
                    });
                  });
              }, 10000);
            });
          `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              const terminationEvent = 'onpagehide' in self ? 'pagehide' : 'unload';

              addEventListener(terminationEvent, (event) => {
                console.log(event)
              }, {capture: true});
              `
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              document.addEventListener("DOMContentLoaded", function(event) {
                  setTimeout(function() {
                  (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:2197700,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                }, 10000);
              });
              `
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              document.addEventListener("DOMContentLoaded", function(event) {
                setTimeout(function() {
                  var Tawk_API=Tawk_API||{},
                   Tawk_LoadStart=new Date();
                  (function(){
                  var s1=document.createElement("script"),
                  s0=document.getElementsByTagName("script")[0];
                  s1.async=true;

                  s1.src = document.location.host === 'medofa.com'
                    ? 'https://embed.tawk.to/5fb4a74b3e20f61525e47d9f/default'
                    : 'https://embed.tawk.to/5fedb291df060f156a92a752/1eqs832ov'
                
                  s1.charset='UTF-8';
                  s1.setAttribute('crossorigin','*');
                  s0.parentNode.insertBefore(s1,s0);
                  })();
                }, 10000);
              });
              `
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                if(document.location.host === 'medofa.com' ){
                  gtag('js', new Date());
                  gtag('config', 'G-TPL3K1KQZN');
                }
              `
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
