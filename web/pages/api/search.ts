import { NowRequest, NowResponse } from "@vercel/node";
/*
type SearchQueryParams = {
  q: string;
  type: ItemType;
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
};
*/

const SPOTIFY_URL = `https://api.spotify.com/v1`;

export default async (req: NowRequest, res: NowResponse) => {
  const { token, query } = await JSON.parse(req.body);
  let headers = new Headers();
  if (token && token.access_token) {
    headers.append("Authorization", `Bearer ${token.access_token}`);
  }
  const q = query;
  const type = "track";
  const limit = 20;
  const qp = new URLSearchParams([
    ["q", q],
    ["type", type],
    ["limit", limit],
  ]);
  try {
    const spotifyResponse = await fetch(
      `${SPOTIFY_URL}/search?${qp.toString()}`,
      { headers }
    );
    try {
      const results = (await spotifyResponse.json()) as TracksSearchResponseType;
      res.send(results);
    } catch (e) {
      res.send(e);
      console.error(e);
    }
  } catch (e) {
    res.send(e);
    console.error(e);
  }
};
