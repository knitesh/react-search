import React, { useState } from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const API_KEY = "Hbo5tPaTp4mY03DVygaZCX1pwR4woLbK";

const searchUrl =
  "https://api.giphy.com/v1/gifs/search?api_key=" +
  API_KEY +
  "&limit=25&offset=0&rating=G&lang=en&q=";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch(`${searchUrl}${searchTerm}`);
      const json = await response.json();
      setSearchResult(json.data.map(data => data.images.fixed_width.url));
    } catch (err) {
      console.log(err);
      setSearchResult([]);
    }
  };
  return (
    <div className="container container-small">
      <h1 class="text-center">Svelte Search</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label for="searchTerm">Search</label>
          <input
            id="searchTerm"
            class="form-control"
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {searchResult && searchResult.length > 0
        ? searchResult.map(gif => <img src={gif} key={gif} alt="gif" />)
        : null}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
