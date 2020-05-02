import React, {FC} from "react";
import {GetServerSideProps} from "next";
import {getAuthenticatedOAuth2Client} from "../services/backend/oauth";
const google = require("googleapis")

export interface SubscriptionsProps {

}

export const getServerSideProps: GetServerSideProps = async context => {
    const client = getAuthenticatedOAuth2Client(context.req.headers.cookie);
    const list = await google.youtube_v3.Resource$Subscriptions.list(
        {
            auth: client,
            mine: true
        }
    )

    console.log(list);


    return {props: {}}
}

const Subscriptions: FC<SubscriptionsProps> = () => {
    return (
        <p>hi!</p>
    );
};

export default Subscriptions;
