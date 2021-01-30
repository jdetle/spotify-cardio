import { NowRequest, NowResponse } from "@vercel/node";

const getRefreshedToken = async (refresh_token: string) => {
  if (refresh_token) {
    const getParams = async () => {
      const client_id = process.env.SPOTIFY_CLIENT_ID;
      console.log(process.env.SPOTIFY_CLIENT_ID);
      if (!client_id) {
        throw new Error("No client id");
      }
      return new URLSearchParams(
        Object.entries({
          client_id,
          grant_type: "refresh_token",
          refresh_token,
        })
      ).toString();
    };

    const params = await getParams();
    const url = `https://accounts.spotify.com/api/token?${params}`;

    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/x-www-form-urlencoded");
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: requestHeaders,
      });
      return await resp.json();
    } catch (e) {
      console.error(e);
      return e;
    }
  }
};

export default async (req: NowRequest, res: NowResponse) => {
  const body = JSON.parse(req.body);
  const refreshed = await getRefreshedToken(body.refresh_token);
  if (refreshed?.access_token) {
    res.send(refreshed);
  } else {
    res.statusCode = 500;
    res.send("Something went wrong");
  }
};
