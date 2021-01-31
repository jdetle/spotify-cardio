import { SpotifyTokenType, TokenTypes } from "pages/_app";
import { Dispatch, SetStateAction } from "react";

export const pause = ({
  playerInstance: {
    _options: { getOAuthToken, id },
  },
  setToken,
}: {
  playerInstance: PlayerInstance;
  setToken: Dispatch<SetStateAction<TokenTypes>>;
}) => {
  getOAuthToken((access_token: string, { refresh_token }: SpotifyTokenType) => {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => {
        if (res.status >= 400) {
          fetch("/api/refresh", {
            method: "POST",
            body: JSON.stringify({ refresh_token }),
          }).then((response) =>
            response.json().then((token) => setToken(token))
          );
        }
      })
      .catch(() => {
        fetch("/api/refresh", {
          method: "POST",
          body: JSON.stringify({ refresh_token }),
        }).then((response) => response.json().then((token) => setToken(token)));
      });
  });
};

export const play = ({
  spotify_uri,
  playerInstance: {
    _options: { getOAuthToken, id },
  },
  setToken,
}: {
  spotify_uri: string;
  playerInstance: PlayerInstance;
  setToken: Dispatch<SetStateAction<TokenTypes>>;
}) => {
  getOAuthToken((access_token: string, { refresh_token }: SpotifyTokenType) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => {
        if (res.status >= 400) {
          fetch("/api/refresh", {
            method: "POST",
            body: JSON.stringify({ refresh_token }),
          }).then((response) =>
            response
              .json()
              .then((token) => setToken(token))
              .catch(() => setToken(null))
          );
        }
      })
      .catch(() => {
        fetch("/api/refresh", {
          method: "POST",
          body: JSON.stringify({ refresh_token }),
        }).then((response) =>
          response
            .json()
            .then((token) => setToken(token))
            .catch(() => setToken(null))
        );
      });
  });
};
