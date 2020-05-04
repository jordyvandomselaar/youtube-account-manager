import {NextApiRequest, NextApiResponse} from "next";
import {getAuthenticatedOAuth2Client} from "../../../services/backend/oauth";
import {google, youtube_v3} from "googleapis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const pageToken = req.query.pageToken as string|undefined;
    const client = getAuthenticatedOAuth2Client(req.headers.cookie);
    const youtube: youtube_v3.Youtube =  google.youtube('v3');
    const list = await youtube.subscriptions.list({
        auth: client,
        mine: true,
        part: "id,snippet",
        maxResults: 50,
        pageToken: pageToken
    })

    res.json({
        items: list.data.items,
        nextPageToken: list.data.nextPageToken,
        previousPageToken: list.data.prevPageToken
    });
}
