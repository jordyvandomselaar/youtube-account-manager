import React, {ChangeEvent, FC, useState} from "react";
import useSWR from "swr";
import {GetServerSideProps} from "next";
import fetcher from "../services/shared/fetcher";
import Head from "next/head";
import Layout from "../layouts/Layout";
import Box from "../components/Box";
import Text from "../components/Text";
import styled from "styled-components";

export interface SubscriptionsProps {

}

export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {}
    }
}

const Table = styled.table`
  text-align: left;
  width: 100%;
`

const Subscriptions: FC<SubscriptionsProps> = () => {
    const {data, error} = useSWR<{
        items: {
            id: string;
            snippet: {
                title: string;
            }
        }[]
    }>("/api/subscriptions", fetcher);

    const [deleteIds, setDeleteIds] = useState({});

    const onToggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked;
        const value = e.currentTarget.value;

        if (checked) {
            setDeleteIds(ps => ({
                ...ps,
                [value]: checked
            }));

            return;
        }

        setDeleteIds(ps => {
            const clone = {...ps};

            delete clone[value];

            return clone;
        });
    }

    const allChecked = data && data.items.length === Object.values(deleteIds).length;

    const toggleAll = (e: ChangeEvent<HTMLInputElement>) => {
        if (!data) {
            return;
        }

        const checked = e.currentTarget.checked;

        if (checked) {
            setDeleteIds(
                data.items.reduce(
                    (carrier, item) => {
                        carrier[item.id] = true;

                        return carrier;
                    },
                    {}
                )
            )

            return;
        }

        setDeleteIds({});
    }

    const deleteSubscriptions = (ids: string[]) => {
        const names = data.items.filter(
            item => ids.includes(item.id)
        ).map(item => item.snippet.title);

        const message = `Are you sure you'd like to delete:
            
${names.join(',\n')}?
`

        window.confirm(message);
    };

    const deleteSubscription = (id: string) => () => deleteSubscriptions([id]);
    const deleteSelectedSubscriptions = () => deleteSubscriptions(Object.keys(deleteIds));

    if (error) {
        return (
            <>
                <Head>
                    <title>Youtube Account Manager | Subscriptions</title>
                </Head>
                <Layout>
                    <Layout.SiteName/>
                    <Layout.PageTitle title="Subscriptions"/>
                    <Layout.Content>
                        <Box variant="container">
                            <Text>Something went wrong.</Text>
                        </Box>
                    </Layout.Content>
                </Layout>
            </>
        )
    }


    return (
        <>
            <Head>
                <title>Youtube Account Manager | Subscriptions</title>
            </Head>
            <Layout>
                <Layout.SiteName/>
                <Layout.PageTitle title="Subscriptions"/>
                <Layout.Content>
                    <Box variant="container">
                        {data ? <Table>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" checked={allChecked} onChange={toggleAll}/></th>
                                        <th><Text as="span">Name</Text></th>
                                        <th>
                                            <button onClick={deleteSelectedSubscriptions}><Text as="span">Delete</Text>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.items.map(subscription => (
                                        <tr key={subscription.id}>
                                            <td><input type="checkbox" value={subscription.id} onChange={onToggleCheckbox}
                                                       checked={!!deleteIds[subscription.id]}/></td>
                                            <td>
                                                <Text as="span">{subscription.snippet.title}</Text>
                                            </td>
                                            <td>
                                                <button onClick={deleteSubscription(subscription.id)}>
                                                    <Text as="span">Delete</Text>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            : <Text>Loading…</Text>}
                    </Box>
                </Layout.Content>
            </Layout>
        </>
    );
};

export default Subscriptions;
