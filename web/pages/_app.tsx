import App from "next/app";
import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
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

export const AuthContext = React.createContext<{
  authState: string;
  setVerifier: Dispatch<SetStateAction<string>>;
  verifier: string;
  token: SpotifyTokenType | null;
  setToken: Dispatch<SetStateAction<SpotifyTokenType | null>>;
}>({
  authState: "",
  setVerifier: () => null,
  verifier: "",
  token: null,
  setToken: () => null,
});

const AuthProvider: React.FC = ({ children }) => {
  const [authState /*setAuthState*/] = useState<string>("abc123");
  const [verifier, setVerifier] = useState<string>("");
  const [token, setToken] = useState<SpotifyTokenType | null>(null);

  useEffect(() => {
    if (verifier == "" && localStorage) {
      setVerifier(localStorage?.getItem("spotify-verifier") ?? "");
    }
  }, [verifier]);

  return (
    <AuthContext.Provider
      value={{ authState, setVerifier, verifier, token, setToken }}
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
