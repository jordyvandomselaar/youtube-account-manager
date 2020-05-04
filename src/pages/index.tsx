import React, {FC} from "react";
import {GetStaticProps} from "next";
import {getOAuth2Client} from "../services/backend/oauth";
import Layout from "../layouts/Layout";
import Head from "next/head";
import Box from "../components/Box";
import Text from "../components/Text";

export const getStaticProps: GetStaticProps<{ googleLoginUrl: string }> = async context => {
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
                <title>Youtube Account Manager | Home</title>
            </Head>
            <Layout>
                <Layout.SiteName/>
                <Layout.PageTitle title="Home"/>
                <Layout.Actions />
                <Layout.Content>
                    <Box variant="container">
                        <Text>Welcome to Youtube Account Manager! Using this app, you can unsubscribe from channels in bulk. To get started, <a href={googleLoginUrl}><Text as="span">Log in with Google</Text></a>.</Text>

                        <Text>
                            Interested to see how it works? You can see the code here: <a href="https://github.com/jordyvandomselaar/youtube-account-manager">https://github.com/jordyvandomselaar/youtube-account-manager</a>. It's completely open source so have a look!
                        </Text>
                    </Box>
                </Layout.Content>
            </Layout>
        </>
    );
};

export default Home;
