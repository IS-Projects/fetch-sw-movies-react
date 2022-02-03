import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = async () => {
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
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
