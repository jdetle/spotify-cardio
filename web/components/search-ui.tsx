import { SearchResultType } from "pages/api/search";
import { AuthContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";

const SearchUI: React.FC = ({}) => {
  const { token } = useContext(AuthContext);
  const [query, setQuery] = useState<string>("bowie");
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
        console.log(results);
        //setSearchResults(results);
      } catch (e) {}
    } catch (e) {}
  };

  useEffect(() => {
    search(token);
  }, [token]);
  return (
    <>
      <form id="search" role="search">
        <label htmlFor="search-input">Search this site</label>
        <input
          type="search"
          id="search-input"
          name="search"
          spellCheck="false"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <input value="Submit" type="submit" />
      </form>
      <input role="search-input"></input>
      {searchResults.map((item, i) => {
        return <div key={i}></div>;
      })}
    </>
  );
};

export default SearchUI;
