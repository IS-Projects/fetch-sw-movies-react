import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/").then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        // eslint-disable-next-line no-throw-literal
        throw { name: "servicesError", message: res.json() };
      }
    });
    const results = response.results;
    const transformedResults = results.map((result) => {
      return {
        id: result.episode_id,
        title: result.title,
        releaseDate: result.release_date,
        openingText: result.opening_crawl,
      };
    });
    setMovies(transformedResults);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading ...</p>}
        {!isLoading && movies.length === 0 && <p>We found no movies. :(</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
