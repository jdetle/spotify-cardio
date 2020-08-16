import React, { useState, useEffect, useContext } from "react";

import Button from "./../components/button";
import Container from "./../components/container";
import { AuthContext } from "./_app";

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
  const { authState, setVerifier } = useContext(AuthContext);
  useEffect(() => {
    const getLink = async () => {
      if (authState != "") {
        try {
          const codeResp = await fetch("/api/random-code");
          const code = await codeResp.text();
          const codeChallenge = base64urlencode(await sha256(code));
          const spotifyResp = await fetch(
            `/api/spotify-login?state=${authState}&code_challenge=${codeChallenge}`
          );
          const link = await spotifyResp.text();
          localStorage?.setItem("spotify-verifier", code);
          setVerifier(code);
          setLoginLink(link);
        } catch (e) {}
      }
    };

    getLink();
  }, [authState]);
  return (
    <div>
      <Container direction={"column"} center>
        <div aria-hidden={true} id="index_title" role="banner">
          {Title}
        </div>
      </Container>
      <Container direction={"column"} center>
        <Button href={loginLink}>Auth with spotify</Button>
      </Container>
    </div>
  );
};

export default Landing;
