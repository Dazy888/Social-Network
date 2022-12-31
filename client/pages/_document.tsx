import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8"/>
                    <link rel="icon" href="https://user-images.githubusercontent.com/16946573/144957680-01ea405e-959b-46b1-a163-df688466ac23.png"/>
                    <script src={"https://kit.fontawesome.com/0a15c952b0.js"} crossOrigin="anonymous"/>
                    <script src="https://www.google.com/recaptcha/api.js?render=6LfUf90hAAAAAAMruXBmB6ly70MHrdCKmiQMqoEy"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument