import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
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

export default MyDocument;
