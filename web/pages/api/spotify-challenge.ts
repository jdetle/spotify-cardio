import { NowRequest, NowResponse } from "@vercel/node";

const getToken = async (req: NowRequest) => {
  const code = req.query.code as string;
  const code_verifier = req.query.code_verifier as string;

  const getParams = async () => {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI
      ? process.env.SPOTIFY_REDIRECT_URI
      : "http://localhost:3000/callback";
    if (!client_id) {
      throw new Error("No client id");
    }
    return new URLSearchParams(
      Object.entries({
        client_id,
        grant_type: "authorization_code",
        redirect_uri,
        code,
        code_verifier,
      })
    ).toString();
  };

  const params = await getParams();
  const url = `https://accounts.spotify.com/api/token?${params}`;
  const requestHeaders: HeadersInit = new Headers();
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
};

export default (request: NowRequest, res: NowResponse) => {
  if (request.query.code == null || request.query.code_verifier == null) {
    res.send(new Error("Bad params"));
  }
  getToken(request)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
};
