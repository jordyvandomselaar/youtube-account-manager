import React, {FC} from "react";
import Head from "next/head";
import Layout from "../layouts/Layout";
import Box from "../components/Box";
import Text from "../components/Text";
import {LoggedInProps} from "../hooks/useLoggedIn";

export interface PrivacyStatementProps extends LoggedInProps {

}

const PrivacyStatement: FC<PrivacyStatementProps> = ({loggedIn}) => {
    return (
        <>
            <Head>
                <title>Youtube Account Manager | Privacy Statement</title>
            </Head>
            <Layout>
                <Layout.SiteName/>
                <Layout.PageTitle title="Privacy Statement"/>
                <Layout.Actions loggedIn={loggedIn}/>
                <Layout.Content>
                    <Box variant="container">
                        <Text>Youtube Account Manager does not store any data at all. When you log in, we store your
                            Youtube tokens inside your browser so we can make API calls on your behalf but we don't
                            save, store or otherwise persist any of your data on our systems.</Text>
                    </Box>
                </Layout.Content>
            </Layout>
        </>
    );
};

export default PrivacyStatement;
