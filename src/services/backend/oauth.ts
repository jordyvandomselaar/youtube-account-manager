import {Credentials, OAuth2Client} from "google-auth-library";
import {loadTokens} from "./tokens";
import cookie from "cookie"
import {google, youtube_v3} from "googleapis";

export const getOAuth2Client = () => new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
)

export const getAuthenticatedOAuth2Client = (cookieString: string) => {
    const client = getOAuth2Client();
    const _cookie = cookie.parse(cookieString);
    const tokens = JSON.parse(_cookie.tokens) as Credentials;

    client.setCredentials(tokens);

    return client;
}
