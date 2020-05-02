import React, {FC} from "react";
import useSWR from "swr";
import {GetServerSideProps} from "next";
import fetcher from "../services/shared/fetcher";

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
        return <p>Something went wrong</p>
    }


    return (
        <ul>
            { data ? data.items.map(subscription => (
                <li key={subscription.id}>{subscription.snippet.title}</li>
            )) : <p>Loading…</p>}
        </ul>
    );
};

export default Subscriptions;
