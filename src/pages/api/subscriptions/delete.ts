import {NextApiRequest, NextApiResponse} from "next";
import {getAuthenticatedOAuth2Client} from "../../../services/backend/oauth";
import {google, youtube_v3} from "googleapis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = getAuthenticatedOAuth2Client(req.headers.cookie);
    const youtube: youtube_v3.Youtube =  google.youtube('v3');

    const ids: string[] = req.body.ids;

    const deleteRequests = ids.map(id => youtube.subscriptions.delete({
        auth: client,
        id
    }).catch(() => {
        //
    }));

    await Promise.all(deleteRequests)

    res.writeHead(204);
    res.end();
}
