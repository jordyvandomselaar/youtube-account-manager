import IUFetch from "isomorphic-unfetch";

const fetcher = async (input: RequestInfo, init?: RequestInit) => (await IUFetch(input, init)).json();

export const fetch = (input: RequestInfo, init?: RequestInit) => IUFetch(input, init);

export default fetcher
