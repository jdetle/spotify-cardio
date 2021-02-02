import React, { useState, useEffect, useContext } from "react";

import Button from "../components/a";
import Container from "./../components/container";
import T from "./../components/typography";
import { AuthContext } from "./_app";

import { v4 } from "uuid";

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const Landing = () => {
  const Title = "Spotify Cardio";
  const [loginLink, setLoginLink] = useState<string>("");
  const { token, setAuthState, setVerifier } = useContext(AuthContext);

  useEffect(() => {
    const getLink = async () => {
      try {
        const codeResp = await fetch("/api/random-code");
        const code = await codeResp.text();

        const codeChallenge = base64urlencode(await sha256(code));
        const authState = v4()
          .split("-")
          .pop() as string;
        const spotifyResp = await fetch(
          `/api/spotify-login?state=${authState}&code_challenge=${codeChallenge}&redirect_base=${
            window.location.href.split("?")[0]
          }`
        );

        const link = await spotifyResp.text();
        localStorage?.setItem("spotify-verifier", code);
        localStorage?.setItem("spotify-auth-state", authState);
        setVerifier(code);
        setAuthState(authState);
        setLoginLink(link);
      } catch (e) {}
    };

    getLink();
  }, []);
  useEffect(() => {
    /*
    if (token && token.access_token) push("/playlist-creator");
    */
  }, [token]);
  return (
    <div>
      <Container direction={"column"} center>
        <T.h1 aria-hidden={true} id="index_title" role="banner">
          {Title}
        </T.h1>
      </Container>
      <Container direction={"column"} center>
        {token && token.access_token ? (
          <Button
            backgroundColor="green1"
            role="button"
            href="/playlist-creator"
          >
            Go Make a Playlist
          </Button>
        ) : (
          <Button backgroundColor="green" role="button" href={loginLink}>
            Make A Cardio Playlist
          </Button>
        )}
      </Container>
    </div>
  );
};

export default Landing;
