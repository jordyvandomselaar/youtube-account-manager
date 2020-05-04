import React, {FC, useEffect} from "react";
import {GetServerSideProps} from "next";
import {getOAuth2Client} from "../services/backend/oauth";
import Link from "next/link";
import {useRouter} from "next/router";
import cookie from "cookie";
import Text from "../components/Text";
import {LoggedInProps} from "../hooks/useLoggedIn";

export const getServerSideProps: GetServerSideProps<{
    success: boolean,
}> = async context => {
    const oAuth2Client = getOAuth2Client();
    const code = context.query.code as string;
    let success = true;

    try {
        const tokens = (await oAuth2Client.getToken(code)).tokens;
        const _cookie = cookie.serialize('tokens', JSON.stringify(tokens));

        context.res.setHeader('Set-Cookie', _cookie)
    } catch (e) {
        success = false;
    }

    return {props: {success}}
}


export interface CallbackProps extends LoggedInProps{
    success: boolean
}

const Callback: FC<CallbackProps> = ({success, loggedInDispatch}) => {
    const router = useRouter();

    useEffect(() => {
        if(!success) {
            loggedInDispatch({
                type: "LOGOUT"
            });

            return;
        }

        loggedInDispatch({
            type: "LOGIN"
        });

        router.push("/subscriptions");
    }, [success])

    if (success) {
        return null;
    }

    return (
        <Text>Tokens could not be retrieved. <Link href="/"><a href="/">Try again</a></Link></Text>
    )
};

export default Callback;
