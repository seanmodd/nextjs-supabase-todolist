import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from 'src/styles/theme/utility/createEmotionCache';
import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://use.typekit.net/ovo7auu.css" rel="stylesheet" />
        </Head>
        {/* <body style={{ fontFamily: 'neue-haas-grotesk-display' }}> */}
        {/* <body style={{ fontFamily: 'tenon' }}> */}
        {/* <body style={{ fontFamily: 'roc-grotesk' }}> */}
        {/* <body style={{ fontFamily: 'forma-djr-text' }}> */}
        {/* <body style={{ fontFamily: 'franklin-gothic-urw' }}> */}
        {/* <body style={{ fontFamily: 'aktiv-grotesk' }}> */}
        {/* <body style={{ fontFamily: 'franklin-gothic-urw-cond' }}> */}
        {/* <body style={{ fontFamily: 'franklin-gothic-condensed' }}> */}
        {/* <body style={{ fontFamily: 'aktiv-grotesk-thin' }}> */}
        {/* <body style={{ fontFamily: 'eurostile' }}> */}
        {/* <body style={{ fontFamily: 'eurostile-condensed' }}> */}
        {/* <body style={{ fontFamily: 'mono45-headline' }}> */}
        <body style={{ fontFamily: 'mono45-headline' }}>
          {/* <body style={{ fontFamily: 'tablet-gothic' }}> */}
          {/* <body style={{ fontFamily: 'tablet-gothic-narrow' }}> */}
          {/* <body style={{ fontFamily: 'tablet-gothic-semi-condensed' }}> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  /* eslint-disable */
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });
  /* eslint-enable */

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
