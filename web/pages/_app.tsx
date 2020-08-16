import App from "next/app";
import React, { useState, useEffect } from "react";
import { WindowSize } from "react-fns";
import { App as AppWrapper } from "../components/app";
import Layout from "../components/layout";

type SpotifyTokenType = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

type SpotifyErrorTokenType = {
  error: string;
};

export const AuthContext = React.createContext<{
  authState: string;
  setVerifier: (str: string) => void;
  setAuthState: (str: string) => void;
  verifier: string;
  token: SpotifyTokenType | SpotifyErrorTokenType | null;
  setToken: (str: SpotifyTokenType) => void;
}>({
  authState: "",
  setVerifier: () => null,
  setAuthState: () => null,
  verifier: "",
  token: null,
  setToken: () => null,
});

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

  console.log(token);

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
      <AppWrapper>
        <AuthProvider>
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
        </AuthProvider>
      </AppWrapper>
    );
  }
}

export default MyApp;
