import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <meta charSet={"utf-8"}/>
                    <link rel={"icon"} href={"/logo.png"}/>
                    <script src={"https://kit.fontawesome.com/0a15c952b0.js"} crossOrigin={"anonymous"} async/>
                    <script src={"https://www.google.com/recaptcha/api.js?render=6LfUf90hAAAAAAMruXBmB6ly70MHrdCKmiQMqoEy"} async/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
