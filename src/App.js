import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = async () => {
    const response = await fetch("https://swapi.dev/api.films/").then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        // eslint-disable-next-line no-throw-literal
        throw { name: "servicesError", message: await res.json() };
      }
    });
    const results = response.results;
    setMovies(results);
  };

  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
