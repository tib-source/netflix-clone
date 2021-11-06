import axios from "./../axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import requests from "../requests";
import "./Banner.css";
const truncate = (string = "Loading...", length = 150) => {
  return string.split("").length > length
    ? string.substring(0, length) + " ..."
    : string;
};
const Banner = () => {
  const [movie, setMovie] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchMovies() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const random = Math.floor(Math.random() * request.data.results.length);
      console.log(random);
      setMovie(request.data.results[random]);
    }
    fetchMovies();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url('${baseUrl}${movie?.backdrop_path}')`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movie?.name ||
            movie?.title ||
            movie?.original_title ||
            movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <div className="banner__description">
          {truncate(movie?.overview, 150)}
        </div>
      </div>
    </header>
  );
};

export default Banner;
