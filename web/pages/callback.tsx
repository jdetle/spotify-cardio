import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { AuthContext } from "./_app";

const Callback = () => {
  const { query, push } = useRouter();

  const { verifier, authState, setToken, token } = useContext(AuthContext);
  useEffect(() => {
    if (query.state != "") {
      if (query.error) {
        throw new Error(query.error as string);
      }
      if (query.state && query.state != authState) {
        console.log(query.state, authState);
        throw new Error("State mismatch in request");
      }
    }
  }, [query]);
  useEffect(() => {
    const getToken = async () => {
      console.log("in get token", query.code, verifier);
      if (query.code && verifier != "") {
        try {
          const authorizationResp = await fetch(
            `/api/spotify-challenge?code=${query.code}&code_verifier=${verifier}`
          );
          if (authorizationResp.status === 200) {
            setToken(await authorizationResp.json());
            push("/authenticated");
          }
        } catch (e) {
          // console.log(e);
        }
      }
    };
    getToken();
  }, [query, verifier]);

  useEffect(() => {
    console.log(token);
  }, [token]);

  return <div />;
};

export default Callback;
