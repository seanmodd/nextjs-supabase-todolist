import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://use.typekit.net/ovo7auu.css" rel="stylesheet" />
        </Head>
        <body>
          {/* <body className="forma-djr-micro"> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
