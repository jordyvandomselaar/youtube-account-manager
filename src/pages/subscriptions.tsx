import React, {FC} from "react";
import useSWR from "swr";
import {GetServerSideProps} from "next";
import fetcher from "../services/shared/fetcher";
import Head from "next/head";
import Layout from "../layouts/Layout";
import Box from "../components/Box";

export interface SubscriptionsProps {

}

export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {}
    }
}

const Subscriptions: FC<SubscriptionsProps> = () => {
    const {data, error} = useSWR<{
        items: {
            id: string;
            snippet: {
                title: string;
            }
        }[]
    }>("/api/subscriptions", fetcher);

    if(error) {
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
                            Something went wrong.
                        </Box>
                    </Layout.Content>
                </Layout>
            </>
        )
    }


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
                        <ul>
                            { data ? data.items.map(subscription => (
                                <li key={subscription.id}>{subscription.snippet.title}</li>
                            )) : <p>Loading…</p>}
                        </ul>
                    </Box>
                </Layout.Content>
            </Layout>
        </>
    );
};

export default Subscriptions;
