import { useContext, useEffect } from "react";
import { AuthContext, SpotifyTokenType } from "./_app";
import { PlayerContext } from "./../components/web-playback";

const BASE_URL = "https://api.spotify.com/v1";

const getRefreshedToken = async (token: SpotifyTokenType) => {
  if (token.refresh_token) {
    const getParams = async () => {
      const client_id = process.env.SPOTIFY_CLIENT_ID;
      if (!client_id) {
        throw new Error("No client id");
      }
      return new URLSearchParams(
        Object.entries({
          client_id,
          grant_type: "refresh_token",
          refresh_token: token.refresh_token,
        })
      ).toString();
    };

    const params = await getParams();
    const url = `https://accounts.spotify.com/api/token?${params}`;

    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/x-www-form-urlencoded");
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: requestHeaders,
      });
      return await resp.json();
    } catch (e) {
      console.error(e);
      return e;
    }
  }
};
export const AuthLanding = () => {
  const { token, setToken } = useContext(AuthContext);
  const { player } = useContext(PlayerContext);
  console.log(player);
  useEffect(() => {
    if (player) {
      console.log("attempting access token tomfoolery");
      const play = ({
        spotify_uri,
        playerInstance: {
          _options: { getOAuthToken, id },
        },
      }) => {
        getOAuthToken((access_token) => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: "PUT",
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          });
        });
      };

      play({
        playerInstance: player,
        spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr",
      });
    }
  }, []);
  const authToken = token as SpotifyTokenType;
  useEffect(() => {
    const getUser = async () => {
      if (authToken?.access_token) {
        try {
          const headers = new Headers();
          headers.set("Authorization", `Bearer ${authToken.access_token}`);
          console.log(`baseurl: ${BASE_URL}/me`);
          const resp = await fetch(`${BASE_URL}/me`, {
            headers,
          });
          const user = await resp.json();
          console.log("user", user);
          if (user.error && user.error.status == 401) {
            const refreshedToken = await getRefreshedToken(authToken);
            setToken(refreshedToken);
          }
        } catch (e) {
          console.error("error", e);
        }
      }
    };
    getUser();
  }, [token]);
  return <div>hello</div>;
};

export default AuthLanding;
