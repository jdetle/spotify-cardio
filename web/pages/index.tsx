import React, { useState, useEffect, useContext } from "react";
import { v4 } from "uuid";
import styled from "styled-components";

import Button from "../components/a";
import Header from "./../components/header";
import Footer from "./../components/footer";
import Container from "./../components/container";
import T from "./../components/typography";
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

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr 50px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    176deg,
    ${(p) => p.theme.colors.purple1} 0%,
    ${(p) => p.theme.colors.purple2} 35%,
    ${(p) => p.theme.colors.purple1} 100%
  );
  header {
    grid-area: 1 / 1 / 2 / 3;
  }
  nav {
    margin-left: 1rem;
    grid-area: 1/ 1 / 1 / 2;
    font-size: 2rem;
    font-weight: 500;
    width: 100%;
    @media (max-width: 420px) {
      font-size: 1rem;
    }
  }
  main {
    grid-area: 2/ 1/ 4/ 3;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: auto;
    h1 {
      margin: 10rem 0rem 10rem 0rem;

      font-weight: 800;
    }
    a {
      align-self: center;
      text-align: center;
      justify-content: center;
    }
  }

  footer {
    grid-area: 4/ 1 / 4 / 2;
  }
`;

const Main = styled.main`
  grid-area: 1 / 1 / 2 / 2;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 10rem 1fr 10rem;
`;
const Landing: React.FC = () => {
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

  return (
    <Layout>
      <Header
        aria-label="Header containing links to Home"
        tabIndex={0}
      ></Header>{" "}
      <Main>
        <Container direction="column">
          <T.h1 aria-hidden={true} id="index_title" role="banner">
            {Title}
          </T.h1>

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
      </Main>
      <Footer role="contentinfo">
        {`All rights reserved: John Detlefs ${new Date().getFullYear()}`}
      </Footer>
    </Layout>
  );
};

export default Landing;
