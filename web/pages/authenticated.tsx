import { Container } from "next/app";
import { useContext, useEffect } from "react";
import { AuthContext, SpotifyTokenType } from "./_app";

const BASE_URL = "https://api.spotify.com/v1";
export const AuthLanding = () => {
  const { token } = useContext(AuthContext);
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
          console.log(resp.status);
          const user = await resp.json();
          console.log("user", user);
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
