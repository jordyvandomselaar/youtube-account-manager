import {Credentials} from "google-auth-library";

export const saveTokens = (tokens: Credentials) => window.localStorage.setItem("credentials", JSON.stringify(tokens));

export const loadTokens = (): Credentials => JSON.parse(window.localStorage.getItem("credentials"));
