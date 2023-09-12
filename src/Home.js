import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import Home from "./Home";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=70dc30c69365f6b74877a743aea2f5e5&language=en-US&sort_by=popularity.desc`
      ) // Use REACT_APP_TMDB_API_KEY here
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
      console.log("API URL: ", `https://api.themoviedb.org/3/discover/movie?api_key=70dc30c69365f6b74877a743aea2f5e5&language=en-US&sort_by=popularity.desc`);
console.log("Response Data: ", response.data);

  }, []);

  return (
    <Router>
      <div className="App">
        <Home/>
        <h1>Movie App</h1>
        <Switch>
          <Route path="/movie/:id" component={MovieDetails} />
          <Route exact path="/">
            <ul className="movie-list">
              {movies.map((movie) => (
                <li key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <h3>{movie.title}</h3>
                    <p>Release Date: {movie.release_date}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
