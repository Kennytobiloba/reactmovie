import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import HomeContent from "./HomeContent";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch top 12 movies
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=70dc30c69365f6b74877a743aea2f5e5&language=en-US&sort_by=popularity.desc&page=1`
      )
      .then((response) => {
        setMovies(response.data.results.slice(0, 12)); // List the top 12 movies
      })
      .catch((error) => {
        console.error("Error fetching top movies: ", error);
      });
  }, []);

  useEffect(() => {
    // Fetch movies based on search query
    if (searchQuery) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=70dc30c69365f6b74877a743aea2f5e5&language=en-US&query=${searchQuery}`
        )
        .then((response) => {
          setSearchResults(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching search results: ", error);
        });
    } else {
      setSearchResults([]); // Clear search results if search query is empty
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
     
      <Router>
        <div className="App">
        <HomeContent handleSearchChange={handleSearchChange} />
          <Switch>
            <Route path="/movie/:id" component={MovieDetails} />
            <Route exact path="/">
              <div className="content">
                <h2>Top 12 Movies</h2>
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
              </div>
            </Route>
            <Route path="/search">
              <div>
                <h2>Search Results</h2>
                <input
                  type="text"
                  placeholder="Search for movies..."
                  onChange={handleSearchChange}
                />
                <ul className="movie-list">
                  {searchResults.map((movie) => (
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
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
