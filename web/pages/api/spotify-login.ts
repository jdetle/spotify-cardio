import { NowRequest, NowResponse } from "@vercel/node";

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];

const login = async (req: NowRequest) => {
  const state = req.query.state as string;
  const code_challenge = req.query.code_challenge as string;
  const redirect_base = req.query.redirect_base as string;
  const getParams = async () => {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const redirect_uri = `${redirect_base}callback`;
    if (!client_id) {
      throw new Error("No client id");
    }
    const qps = new URLSearchParams(
      Object.entries({
        client_id,
        response_type: "code",
        redirect_uri,
        code_challenge_method: "S256",
        state,
        code_challenge,
        scope: scopes.join(" "),
      })
    );
    return qps.toString();
  };

  const params = await getParams();
  const url = `https://accounts.spotify.com/authorize?${params}`;
  try {
    const resp = await fetch(url, { method: "GET", redirect: "follow" });
    return resp;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export default async (request: NowRequest, res: NowResponse) => {
  try {
    const loginData = await login(request);
    res.send(loginData.url);
  } catch (e) {
    console.error(e);
    res.send(e);
  }
};
