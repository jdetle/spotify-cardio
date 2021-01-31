import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { AuthContext } from "./_app";

const Callback = () => {
  const { query, push } = useRouter();

  const { verifier, authState, setToken } = useContext(AuthContext);
  useEffect(() => {
    if (query.state != "") {
      if (query.error) {
        throw new Error(query.error as string);
      }
      if (query.state && query.state != authState) {
        throw new Error("State mismatch in request");
      }
    }
  }, [query]);
  useEffect(() => {
    const getToken = async () => {
      if (query.code && verifier != "") {
        try {
          const qp = new URLSearchParams([
            ["code", query.code as string],
            ["code_verifier", verifier],
            ["redirect_base", window.location.href],
          ]);
          const authorizationResp = await fetch(
            `/api/spotify-challenge?${qp.toString()}`
          );
          if (authorizationResp.status === 200) {
            setToken(await authorizationResp.json());
            push("/playlist-creator");
          }
        } catch (e) {
          // console.log(e);
        }
      }
    };
    getToken();
  }, [query, verifier]);
  return <></>;
};

export default Callback;
