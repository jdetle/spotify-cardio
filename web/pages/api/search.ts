import { NowRequest, NowResponse } from "@vercel/node";

type ItemType = "album" | "artist" | "playlist" | "track" | "show" | "episode";
export type SearchResultType = {
  external_urls: any;
  name: string;
};

type SearchQueryParams = {
  q: string;
  type: ItemType;
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
};

const SPOTIFY_URL = `https://api.spotify.com/v1`;

export default async (req: NowRequest, res: NowResponse) => {
  const { token, query } = await JSON.parse(req.body);

  let headers = new Headers();
  console.log(token);
  if (token && token.access_token) {
    headers.append("Authorization", `Bearer ${token.access_token}`);
  }
  const q = query;
  const type = "artist";
  const qp = new URLSearchParams([
    ["q", q],
    ["type", type],
  ]);
  try {
    const spotifyResponse = await fetch(
      `${SPOTIFY_URL}/search?${qp.toString()}`,
      { headers }
    );
    try {
      const results = await spotifyResponse.json();
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
