import Head from "next/head";
import {AuthorizationLayout} from "../../layouts/AuthorizationLayout";

export default function Authorization() {
    return(
        <AuthorizationLayout>
            <Head>
                <title>Authorization</title>
            </Head>
            <p>Hello JSX</p>
        </AuthorizationLayout>
    )
}