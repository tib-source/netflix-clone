import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
const baseUrl = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    };
    fetchMovies();
  }, [fetchUrl]);

  return (
    <div className="row">
      {/* title here */}
      <h2>{title}</h2>
      {/* posters */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={
              isLargeRow
                ? `${baseUrl}${movie.poster_path}`
                : `${baseUrl}${movie.backdrop_path}`
            }
            alt={movie.title}
            className={`row__poster ${isLargeRow && "row__large"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
