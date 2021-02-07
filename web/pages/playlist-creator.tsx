import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import { AuthContext, SpotifyTokenType, TokenTypes } from "./_app";
import Components from "./../components";

import { useRouter } from "next/router";
import styled from "styled-components";

import {
  SearchContainer,
  DataContainer,
  SearchResultsContainer,
} from "./../components/layout";
import TrackListItem from "components/smart/track-list-item";
import TrackSearchList from "components/smart/track-search-list";
const { Label, Input, Playbar, PlaylistView } = Components;

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

const LoadingShimmer = styled.div``;
const SearchInputContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: 1 / 1 / 2 / 3;
  label {
    font-weight: 500;
    margin: 0px 10px 0px 10px;
  }
  input {
    margin: 0px 10px 0px 10px;
  }
`;

const Main = styled.main`
  background-color: ${(p) => p.theme.colors.gray1};
`;

const Layout = styled.div`
  grid-area: 1 / 1/ 3/ 3;
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 1fr 90px;
  grid-template-columns: 235px 1fr;

  header {
    grid-area: 1 / 1 / 2 / 2;
  }
  nav {
    background-color: #000;
    grid-area: 1 / 1 / 2 / 2;
    font-size: 2rem;
    font-weight: 500;
    width: 100%;
    @media (max-width: 420px) {
      font-size: 1rem;
    }
  }
  main {
    grid-area: 1 / 2 / 2 / 2;
    display: grid;
    grid-template-rows: 1fr 3fr;

    height: 100%;
    width: 100%;

    ${SearchContainer} {
      height: 100%;
      width: 100%;
      grid-area: 1 / 1 / 2 / 1;
    }
    ${DataContainer} {
      height: 100%;
      width: 100%;
      grid-area: 2 / 1 / 3 / 1;
    }
  }

  footer {
    display: grid;
  }
`;

const SearchResults: React.FC<{ query: string }> = ({ query }) => {
  const { token } = useContext(AuthContext);
  const [debouncedQuery] = useDebounce(query, 1000);
  const search = useCallback(async () => {
    console.log(token);
    if (token == null) {
      console.error("no token present");
      return Promise.reject("No token present");
    }
    if (query == "") return Promise.resolve({ data: [], error: null });
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
  }, [debouncedQuery, token]);

  const { loading, data, error } = useTableState<TracksSearchResponseType>(
    search,
    token
  );
  if (loading) {
    <SearchResultsContainer>
      <LoadingShimmer />
    </SearchResultsContainer>;
  }
  if (error) {
    <SearchResultsContainer>{error.message}</SearchResultsContainer>;
  }
  return (
    <SearchResultsContainer>
      <TrackSearchList>
        {data?.tracks?.items.map((i, index) => {
          return <TrackListItem key={index} {...i}></TrackListItem>;
        })}
      </TrackSearchList>
    </SearchResultsContainer>
  );
};

const SearchUI: React.FC<{
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}> = ({ query, setQuery }) => {
  return (
    <SearchContainer>
      <SearchInputContainer>
        <Label htmlFor="search-input">
          <Input
            type="search"
            id="search-input"
            role="search-input"
            name="search"
            spellCheck="false"
            placeholder="Search For A Song"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </Label>
      </SearchInputContainer>
    </SearchContainer>
  );
};

export const PlaylistCreator = () => {
  const [query, setQuery] = useState<string>("");
  return (
    <Layout>
      <nav></nav>
      <Main>
        <SearchUI query={query} setQuery={setQuery} />
        <DataContainer>
          <SearchResults query={query} />
          <PlaylistView />
        </DataContainer>
      </Main>
      <Playbar />
    </Layout>
  );
};

export default PlaylistCreator;
