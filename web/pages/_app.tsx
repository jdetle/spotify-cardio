import App from "next/app";
import React, { useState, useEffect } from "react";
import { WindowSize } from "react-fns";
import { MergeExclusive } from "type-fest";

import { ThemeProvider } from "styled-components";
import { App as AppWrapper } from "../components/app";
import WebPlayback from "../contexts/web-playback";
import Layout from "../components/layout";
import { PlaylistProvider } from "contexts/playlist";

export type SpotifyTokenType = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

export type SpotifyErrorTokenType = {
  error: string;
  error_description: string;
};

export type TokenTypes = MergeExclusive<
  MergeExclusive<SpotifyErrorTokenType, SpotifyTokenType>,
  null
>;

export const AuthContext = React.createContext<{
  authState: string;
  setVerifier: (str: string) => void;
  setAuthState: (str: string) => void;
  verifier: string;
  token: TokenTypes;
  setToken: (token: TokenTypes) => void;
}>({
  authState: "",
  setVerifier: () => null,
  setAuthState: () => null,
  verifier: "",
  token: null,
  setToken: () => null,
});

const FIGMA_PALETTE = {
  gray1: "#191414",
  gray2: "#4F4f4F",
  gray3: "#828282",
  gray4: "#BDBDBD",
  gray5: "#E0E0E0",
  gray6: "#F2F2F2",
  red: "#EB5757",
  orange: "#F2994A",
  yellow: "#F2C94C",
  green1: "#1AB26B",
  green2: "#27AE60",
  green3: "#1ED760",
  blue1: "#2F80ED",
  blue2: "#2D9CDB",
  blue3: "#56CCF2",
  purple1: "#9B51E0",
  purple2: "#BB6BD9",
};

const AuthProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<string>("");
  const [verifier, setVerifier] = useState<string>("");
  const [token, setToken] = useState<SpotifyTokenType | null>(null);
  useEffect(() => {
    if (verifier == "" && localStorage) {
      setVerifier(localStorage?.getItem("spotify-verifier") ?? "");
    }
  }, [verifier]);

  useEffect(() => {
    if (authState == "" && localStorage) {
      setAuthState(localStorage?.getItem("spotify-auth-state") ?? "");
    }
  }, [authState]);

  useEffect(() => {
    if (token == null && localStorage) {
      const stringifiedToken = localStorage?.getItem("spotify-token");
      if (stringifiedToken) {
        const parsed = JSON.parse(stringifiedToken);
        setToken(parsed);
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (str: string) => {
          setAuthState(str);
          localStorage?.setItem("spotify-auth-state", str);
        },
        setVerifier: (str: string) => {
          setVerifier(str);
          localStorage?.setItem("spotify-verifier", str);
        },
        verifier,
        token,
        setToken: (token: SpotifyTokenType) => {
          localStorage?.setItem("spotify-auth-state", "");
          localStorage?.setItem("spotify-verifier", "");
          setAuthState("");
          setVerifier("");
          setToken(token);
          localStorage?.setItem("spotify-token", JSON.stringify(token));
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={{ colors: FIGMA_PALETTE }}>
        <AppWrapper>
          <AuthProvider>
            <WebPlayback>
              <PlaylistProvider>
                <WindowSize>
                  {(size) => (
                    <Layout>
                      <Component
                        {...pageProps}
                        size={size.width > 0 ? { ...size } : null}
                      />
                    </Layout>
                  )}
                </WindowSize>
              </PlaylistProvider>
            </WebPlayback>
          </AuthProvider>
        </AppWrapper>
      </ThemeProvider>
    );
  }
}

export default MyApp;
