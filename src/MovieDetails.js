import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key= ${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details: ", error);
      });
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <p>Release Date: {movie.release_date}</p>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetails;
