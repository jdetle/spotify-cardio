import { SpotifyTokenType, TokenTypes } from "pages/_app";
import { Dispatch, SetStateAction } from "react";

const SPOTIFY_API_BASE = `https://api.spotify.com`;
const GET_CURRENTLY_PLAYING = `${SPOTIFY_API_BASE}/v1/me/player/currently-playing`;
const PUT_PLAYER = `${SPOTIFY_API_BASE}/v1/me/player`;
const PLAY = `${SPOTIFY_API_BASE}/v1/me/player/play`;

const refresh = async (
  refresh_token: string,
  setToken: Dispatch<SetStateAction<TokenTypes>>
) => {
  const response = await fetch("/api/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token }),
  });
  try {
    const token = await response.json();
    setToken(token);
  } catch (e) {
    setToken(null);
  }
};

export const getPlayerState = async ({
  token,
}: {
  playerInstance: PlayerInstance;
  token: SpotifyTokenType;
}) => {
  try {
    const res = await fetch(`${GET_CURRENTLY_PLAYING}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    if (res.status >= 400) {
      return res;
    }
    const json = await res.json();
    return json;
  } catch (e) {
    return e;
  }
};

export const pause = async ({
  playerInstance: {
    _options: { id },
  },
  token,
}: {
  playerInstance: PlayerInstance;
  token: SpotifyTokenType;
}) => {
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/me/player/pause?device_id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );
    if (res.status >= 400) {
      return res;
    }
  } catch (e) {
    return e;
  }
};

export const play = async ({
  spotify_uri,
  playerInstance: {
    _options: { id },
  },
  token,
}: {
  spotify_uri: string;
  playerInstance: PlayerInstance;
  token: SpotifyTokenType;
}) => {
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          uris: spotify_uri ? [spotify_uri] : undefined,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );
    if (res.status >= 400) {
      return res;
    }
  } catch (e) {
    return e;
  }
};

export const togglePlay = async ({
  playerInstance: {
    _options: { id },
  },
  token,
}: {
  playerInstance: PlayerInstance;
  token: SpotifyTokenType;
  setToken: Dispatch<SetStateAction<TokenTypes>>;
}) => {
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );

    if (res.status >= 400) {
      return res;
    }
  } catch (e) {
    return e;
  }
};
