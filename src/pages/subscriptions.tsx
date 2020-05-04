import React, {ChangeEvent, FC, useEffect, useState} from "react";
import useSWR, {useSWRPages} from "swr";
import fetcher from "../services/shared/fetcher";
import Head from "next/head";
import Layout from "../layouts/Layout";
import Box from "../components/Box";
import Text from "../components/Text";
import styled from "styled-components";
import {useInView} from "react-intersection-observer";
import {LoggedInProps} from "../hooks/useLoggedIn";
import Link from "next/link";

export interface SubscriptionsProps extends LoggedInProps {

}

const Table = styled.table`
  text-align: left;
  width: 100%;
`

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    render() {
        if (this.state.hasError) {
            return <Text>Something went wrong. Please <Link href="/"><a href="/">Try again</a></Link>.</Text>;
        }

        return this.props.children;
    }
}

interface Subscription {
    id: string;
    snippet: {
        title: string;
    },
}

interface APIResponse {
    items: Subscription[],
    nextPageToken?: string
    previousPageToken?: string
}

const Subscriptions: FC<SubscriptionsProps> = ({loggedIn}) => {
    const [ref, inView] = useInView({threshold: 0});
    const [loadedSubscriptions, setLoadedSubscriptions] = useState<Subscription[]>([]);
    const [deleteIds, setDeleteIds] = useState({});

    const deleteSubscriptions = (ids: string[]) => {
        const names = loadedSubscriptions.filter(
            item => ids.includes(item.id)
        ).map(item => item.snippet.title);

        const message = `Are you sure you'd like to delete:

${names.join(',\n')}?
`

        if (window.confirm(message)) {
            fetch("/api/subscriptions/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ids
                }),
            }).then(() => {
                alert("Subscriptions removed. Youtube takes a little time to process so give it a few minutes to update.");
                setDeleteIds({});
            }).catch(() => {
                alert("Something went wrong. It usually works again if you wait a few minutes! It could be that the subscription was already deleted.");
            });
        }
    };
    const deleteSubscription = (id: string) => () => deleteSubscriptions([id]);

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

    const {pages, isLoadingMore, loadMore, pageSWRs, isReachingEnd, isEmpty} = useSWRPages<string, APIResponse>(
        "/api/subscriptions",
        ({offset, withSWR}) => {
            const url = `/api/subscriptions?pageToken=${offset ?? ''}`;

            const {data, error} = withSWR(useSWR(url, fetcher));

            if (error) {
                throw error;
            }

            if (!data) {
                return null;
            }

            return data.items.map(subscription => (
                <tr key={subscription.id}>
                    <td>
                        <Box my={2}>
                            <input type="checkbox"
                                   id={`checkbox-${subscription.id}`}
                                   value={subscription.id}
                                   onChange={onToggleCheckbox}
                                   checked={!!deleteIds[subscription.id]}/>
                        </Box>
                    </td>
                    <td>
                        <Box my={2}>
                            <label htmlFor={`checkbox-${subscription.id}`}>
                                <Text as="span">{subscription.snippet.title}</Text>
                            </label>
                        </Box>
                    </td>
                    <td>
                        <Box my={2}>
                            <button onClick={deleteSubscription(subscription.id)}>
                                <Text as="span">Delete</Text>
                            </button>
                        </Box>
                    </td>
                </tr>
            ))
        },
        (SWR => {
            return SWR.data.nextPageToken ?? null;
        }),
        [
            deleteIds,
            deleteSubscription,
            onToggleCheckbox
        ]
    )

    useEffect(() => {
        if (inView) {
            loadMore();
        }
    }, [inView]);


    useEffect(() => {
        setLoadedSubscriptions(
            pageSWRs.reduce((carrier, swr) => {
                if (swr.data?.items) {
                    carrier = [...carrier, ...swr.data.items];
                }

                return carrier;
            }, [])
        )
    }, [pageSWRs]);


    const allChecked = loadedSubscriptions.length > 0 && loadedSubscriptions.length === Object.values(deleteIds).length;

    const toggleAll = (e: ChangeEvent<HTMLInputElement>) => {
        if (!loadedSubscriptions.length) {
            return;
        }

        const checked = e.currentTarget.checked;

        if (checked) {
            setDeleteIds(
                loadedSubscriptions.reduce(
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

    const deleteSelectedSubscriptions = () => deleteSubscriptions(Object.keys(deleteIds));

    return (
        <>
            <Head>
                <title>Youtube Account Manager | Subscriptions</title>
            </Head>
            <Layout>
                <Layout.SiteName/>
                <Layout.PageTitle title="Subscriptions"/>
                <Layout.Actions loggedIn={loggedIn}/>
                <Layout.Content>
                    <Box variant="container">
                        <ErrorBoundary>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            <Box my={2}>
                                                <input type="checkbox" checked={allChecked} onChange={toggleAll}/>
                                            </Box>
                                        </th>
                                        <th>
                                            <Box my={2}>
                                                <Text as="span">Name</Text>
                                            </Box>
                                        </th>
                                        <th>
                                            <Box my={2}>
                                                <button onClick={deleteSelectedSubscriptions}><Text
                                                    as="span">Delete</Text>
                                                </button>
                                            </Box>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages instanceof Array && pages}
                                </tbody>
                            </Table>
                            {
                                isEmpty
                                    ? <Text>You're not subscribed to any channels yet =(</Text>
                                    : isReachingEnd ? <Text>Done loading all subscriptions.</Text>
                                    : isLoadingMore ? <Text>Loading more…</Text>
                                        : <button onClick={loadMore} ref={ref}>Load more</button>
                            }
                        </ErrorBoundary>
                    </Box>
                </Layout.Content>
            </Layout>
        </>
    );
};

export default Subscriptions;
