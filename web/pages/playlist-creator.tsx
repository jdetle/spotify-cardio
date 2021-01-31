import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { AuthContext, SpotifyTokenType, TokenTypes } from "./_app";
import Components from "./../components";
import { useRouter } from "next/router";
import styled from "styled-components";

const {
  Label,
  Form,
  TrackSearchList,
  TrackListItem,
  Input,
  Playbar,
  PlaylistView,
} = Components;

const API_BASE_URL = "https://api.spotify.com/v1";

type FetchType<DataType> = (
  token: TokenTypes | null
) => Promise<{ data: DataType | null; error: Error | null }>;

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
  dataFetch: FetchType<DataType>,
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

    const updateTableView = async () => {
      dispatch({ type: "toggleLoading" });
      try {
        const { data, error } = await dataFetch(token);
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
  }, [dataFetch]);

  return useMemo(() => tableState, [tableState]);
}

const SearchInputContainer = styled.div`
  height: 4rem;
  width: 100%;
  padding: 0.5rem;
  background-color: ${(p) => p.theme.colors.gray2};
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: 1 / 1 / 2 / 5;
  label {
    font-weight: 500;
    margin: 0px 10px 0px 10px;
  }
  input {
    margin: 0px 10px 0px 10px;
  }
`;

const SearchAndAddToPlaylistSection = styled.section`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1rem repeat(2, 1fr) 1rem;
  grid-template-rows: 5rem repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 10px;
`;

const SearchUI: React.FC = ({}) => {
  const { token } = useContext(AuthContext);
  const [query, setQuery] = useState<string>("");
  const [submitCount, setSubmitCount] = useState<number>(0);

  const search = useCallback(
    async (token: SpotifyTokenType | null) => {
      if (token == null) return Promise.reject("No token present");
      try {
        const response = await fetch(`/api/search`, {
          method: "POST",
          body: JSON.stringify({ query, token }),
        });
        const json = await response.json();
        return { data: json as TracksSearchResponseType };
      } catch (e) {
        return e;
      }
    },
    [submitCount]
  );

  const { loading, data, error } = useTableState<TracksSearchResponseType>(
    search,
    token
  );

  return (
    <>
      <SearchInputContainer>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitCount((c) => ++c);
          }}
          id="search"
          role="search"
        >
          <Label htmlFor="search-input">
            Search Tracks
            <Input
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
          </Label>
          <Input value="Submit" type="submit" />
        </Form>
      </SearchInputContainer>

      <TrackSearchList data={data} loading={loading} error={error}>
        {data?.tracks?.items.map((item, i) => {
          return <TrackListItem {...item} key={i} />;
        })}
      </TrackSearchList>
    </>
  );
};

export const PlaylistCreator = () => {
  const { token, setToken } = useContext(AuthContext);
  const { push } = useRouter();

  const authToken = token as SpotifyTokenType;
  useEffect(() => {
    const getUser = async () => {
      if (authToken?.access_token) {
        try {
          const headers = new Headers();
          headers.set("Authorization", `Bearer ${authToken.access_token}`);
          const resp = await fetch(`${API_BASE_URL}/me`, {
            headers,
          });
          const user = await resp.json();
          if (user.error && user.error.status == 401) {
            const response = await fetch("/api/refresh", {
              method: "POST",
              body: JSON.stringify({ refresh_token: authToken.refresh_token }),
            });
            const refreshedToken = await response.json();
            setToken(refreshedToken);
          }
        } catch (e) {
          setToken(null);
          console.error(e);
          push("/");
        }
      }
    };
    getUser();
  }, [token]);

  return (
    <SearchAndAddToPlaylistSection>
      <SearchUI />
      <PlaylistView />
      <Playbar />
    </SearchAndAddToPlaylistSection>
  );
};

export default PlaylistCreator;
