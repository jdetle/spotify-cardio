import React, { useState, useEffect, useContext } from "react";

import Button from "./../components/button";
import Container from "./../components/container";
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
  const { setAuthState, setVerifier } = useContext(AuthContext);
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
          `/api/spotify-login?state=${authState}&code_challenge=${codeChallenge}`
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

  return (
    <div>
      <Container direction={"column"} center>
        <div aria-hidden={true} id="index_title" role="banner">
          {Title}
        </div>
      </Container>
      <Container direction={"column"} center>
        <Button href={loginLink}>
          Authenticate with Spotify To Get Started
        </Button>
      </Container>
    </div>
  );
};

export default Landing;
