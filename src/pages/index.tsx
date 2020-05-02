import React, {FC} from "react";
import {GetServerSideProps} from "next";
import google from "googleapis";
import {OAuth2Client} from "google-auth-library";
import {oauth2} from "googleapis/build/src/apis/oauth2";
import {getOAuth2Client} from "../services/backend/oauth";

export const getServerSideProps: GetServerSideProps<{googleLoginUrl: string}> = async context => {
    const oAuth2Client = getOAuth2Client();

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        scope: 'https://www.googleapis.com/auth/youtube',
    });

    return {
        props: {
         googleLoginUrl: authorizeUrl
        }
    }
}

export interface HomeProps {
    googleLoginUrl: string;
}

const Home: FC<HomeProps> = ({googleLoginUrl}) => {
    return (
        <a href={googleLoginUrl}>Log in with Google</a>
    );
};

export default Home;
