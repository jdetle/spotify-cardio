import { SearchResultType } from "pages/api/search";
import { AuthContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";

const SearchResult: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

const SearchTypeResultBox: React.FC = ({ children }) => {
  return <ul>{children}</ul>;
};

const SearchUI: React.FC = ({}) => {
  const { token } = useContext(AuthContext);
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Array<SearchResultType>>(
    []
  );

  const search = async (token) => {
    if (token == null) return;
    try {
      console.log(token);
      const response = await fetch(`/api/search`, {
        method: "POST",
        body: JSON.stringify({ query, token }),
      });
      try {
        const results = await response.json();
        const artists = results.artists;
        const items = artists.items;
        console.log(results);
        setSearchResults(items);
      } catch (e) {}
    } catch (e) {}
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (token) {
            search(token);
          } else {
            console.error("no token");
          }
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
        {searchResults.map((item, i) => {
          return <SearchResult key={i}>{item.name}</SearchResult>;
        })}
      </SearchTypeResultBox>
    </>
  );
};

export default SearchUI;
