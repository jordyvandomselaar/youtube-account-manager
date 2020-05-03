import React, {FC} from "react";
import {GetServerSideProps} from "next";
import {getOAuth2Client} from "../services/backend/oauth";
import Layout from "../layouts/Layout";
import Link from "next/link";
import Head from "next/head";
import Box from "../components/Box";

export const getServerSideProps: GetServerSideProps<{ googleLoginUrl: string }> = async context => {
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
        <>
            <Head>
                <title>Peer-to-peer | Home</title>
            </Head>
            <Layout>
                <Layout.SiteName/>
                <Layout.PageTitle title="Home"/>
                <Layout.Content>
                    <Box variant="container">
                        <a href={googleLoginUrl}>Log in with Google</a>
                    </Box>
                </Layout.Content>
            </Layout>
        </>
    );
};

export default Home;
