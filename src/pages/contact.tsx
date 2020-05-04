import React, {FC} from "react";
import Head from "next/head";
import Layout from "../layouts/Layout";
import Box from "../components/Box";
import Text from "../components/Text";
import {LoggedInProps} from "../hooks/useLoggedIn";

export interface PrivacyStatementProps extends LoggedInProps{}

const Contact: FC<PrivacyStatementProps> = ({loggedIn}) => {
    return (
        <>
            <Head>
                <title>Youtube Account Manager | Contact</title>
            </Head>
            <Layout>
                <Layout.SiteName/>
                <Layout.PageTitle title="Contact"/>
                <Layout.Actions loggedIn={loggedIn}/>
                <Layout.Content>
                    <Box variant="container">
                        <Text>Hi there! I (Jordy van Domselaar) built this because I wanted to unsubscribe from many channels at once. Doing it one by one is a really big chore and to be honest, who likes chores?</Text>

                        <Text>If you'd like to contact me, <a href="mailto:jordy.m.van.domselaar+yam@gmail.com">send me an e-mail!</a></Text>
                    </Box>
                </Layout.Content>
            </Layout>
        </>
    );
};

export default Contact;
