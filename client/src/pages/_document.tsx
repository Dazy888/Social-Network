import React from "react"
import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
    <Html>
        <Head>
            <meta charSet={"utf-8"}/>
            <link rel={"icon"} href={"/logo.png"}/>
            <link rel={'stylesheet'} href={'/fontawesome/css/all.css'}/>
            <link rel={'manifest'} href={'/manifest/manifest.json'}/>
            <script src={"https://www.google.com/recaptcha/api.js?render=6LfUf90hAAAAAAMruXBmB6ly70MHrdCKmiQMqoEy"} async/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
    </Html>
)

export default React.memo(Document)
