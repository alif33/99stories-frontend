
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
		
		<link rel="icon" href="/assets/images/brand/favicon.ico" type="image/x-icon"/>
		<link rel="shortcut icon" type="image/x-icon" href="/assets/images/brand/favicon.ico" />
         {/* ==================== google font ================  */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Risque&display=swap" rel="stylesheet"/>

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link
            href="https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,400;0,700;1,400&family=Open+Sans:ital,wght@1,300&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,700&display=swap"
            rel="stylesheet"/>

         {/* ==================== css link part =============== */}
        <link rel="stylesheet" href="/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="/css/all.min.css"/>
        <link rel="stylesheet" href="/css/style.css"/>
        <link rel="stylesheet" href="/css/dashboard.css"/>
        {/* <link rel="stylesheet" href="/dashboard-responsive.css"/> */}
		
		</Head>
        <body>
          <Main />
          <NextScript />
          <script src="/js/jquery-1.12.4.min.js"></script>
          <script src="/js/bootstrap.bundle.min.js"></script>
       
        </body>
      </Html>
    )
  }
}

export default MyDocument