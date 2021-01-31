export const pause = ({
  playerInstance: {
    _options: { getOAuthToken, id },
  },
}) => {
  getOAuthToken((access_token: string) => {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
};

export const play = ({
  spotify_uri,
  playerInstance: {
    _options: { getOAuthToken, id },
  },
}) => {
  getOAuthToken((access_token: string) => {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
};
