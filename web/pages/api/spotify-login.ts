import { NowRequest, NowResponse } from "@vercel/node";
var crypto = require("crypto");

const login = async (req: NowRequest) => {
  console.log(req.query);
  const state = req.query.state as string;
  const code_challenge = req.query.code_challenge as string;
  const getParams = async () => {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const redirect_uri = process.env.SPOTIFY_URI
      ? process.env.SPOTIFY_URI
      : "http://localhost:3000/callback";
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
      })
    );
    return qps.toString();
  };

  const params = await getParams();
  const url = `https://accounts.spotify.com/authorize?${params}`;
  try {
    const resp = await fetch(url, { method: "GET", redirect: "follow" });
    console.log(resp.status);
    return resp;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export default (request: NowRequest, res: NowResponse) => {
  login(request)
    .then((data) => {
      res.end(data?.url);
    })
    .catch((e) => {
      console.error(e);
      res.end("Error");
    });
};
