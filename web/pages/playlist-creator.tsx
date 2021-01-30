import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { AuthContext, SpotifyTokenType, TokenTypes } from "./_app";
import { PlayerContext } from "../contexts/web-playback";

const BASE_URL = "https://api.spotify.com/v1";

type FetchType<DataType> = (
  token: TokenTypes | null
) => Promise<{ data: DataType | null; error: Error | null }>;

const SearchResult: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

const SearchTypeResultBox: React.FC = ({ children }) => {
  return <ul>{children}</ul>;
};

type ActionType<DataType> =
  | { type: "toggleLoading" }
  | { type: "setData"; payload: DataType }
  | { type: "setError"; payload: Error | null };

interface ITableState<DataType> {
  loading: boolean;
  data: DataType | null;
  error: Error | null;
}

export function useTableState<DataType>(
  fetch: FetchType<DataType>,
  token: TokenTypes
) {
  const initialState: ITableState<DataType> = {
    loading: false,
    data: null,
    error: null,
  };
  const reducer = (
    state: ITableState<DataType>,
    action: ActionType<DataType>
  ) => {
    switch (action.type) {
      case "toggleLoading":
        return { ...state, loading: true };
      case "setData":
        return { ...state, data: action.payload, loading: false };
      case "setError":
        return { ...state, error: action.payload, loading: false };
      default:
        throw Error("Action type not supported");
    }
  };

  const [tableState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let isSubscribed = true;
    dispatch({ type: "toggleLoading" });

    const updateTableView = async () => {
      try {
        const { data, error } = await fetch(token);
        if (isSubscribed) {
          if (data) {
            dispatch({ type: "setData", payload: data });
            return;
          }
          if (error) {
            dispatch({ type: "setError", payload: error });
          }
        }
      } catch (e) {
        dispatch({ type: "setError", payload: e });
      }
    };
    updateTableView();
    return () => {
      isSubscribed = false;
    };
  }, [fetch]);

  return useMemo(() => tableState, [tableState]);
}
const SearchUI: React.FC = ({}) => {
  const { token } = useContext(AuthContext);
  const [query, setQuery] = useState<string>("");
  const [
    searchResults,
    // setSearchResults,
  ] = useState<TracksSearchResponseType | null>(null);

  const search = useCallback(async (token: SpotifyTokenType | null) => {
    if (token == null) return new Error("No token");
    try {
      const response = await fetch(`/api/search`, {
        method: "POST",
        body: JSON.stringify({ query, token }),
      });
      try {
        const results = await response.json();
        return results as TracksSearchResponseType;
      } catch (error) {
        return error;
      }
    } catch (error) {
      return error;
    }
  }, []);

  const { loading, data, error } = useTableState<TracksSearchResponseType>(
    search,
    token
  );

  console.log(loading, data, error);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        id="search"
        role="search"
      >
        <label htmlFor="search-input">Search this site</label>
        <input
          type="search"
          id="search-input"
          role="search-input"
          name="search"
          spellCheck="false"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <input value="Submit" type="submit" />
      </form>
      <SearchTypeResultBox>
        {searchResults?.tracks.items.map((item, i) => {
          return <SearchResult key={i}>{item.name}</SearchResult>;
        })}
      </SearchTypeResultBox>
    </>
  );
};

const getRefreshedToken = async (token: TokenTypes) => {
  if (token?.refresh_token) {
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
export const PlaylistCreator = () => {
  const { token, setToken } = useContext(AuthContext);
  const { player } = useContext(PlayerContext);

  useEffect(() => {
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
    console.log(play);
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
  return (
    <section>
      <SearchUI />
    </section>
  );
};

export default PlaylistCreator;
