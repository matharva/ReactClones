import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";
const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          // console.log(url);
          // console.log(url.split("=")[1]);

          // setTrailerUrl(url.split("=")[1]);
          setTrailerUrl(url);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <>
              <img
                onClick={() => handleClick(movie)}
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            </>
          );
        })}
      </div>
      {/* Container -> Posters */}
      <div className="trailer__box">
        {trailerUrl && <ReactPlayer url={trailerUrl} />}
      </div>
    </div>
  );
};

export default Row;
