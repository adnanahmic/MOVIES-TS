import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { RootReducer } from "../../store/reducers/types";
import { getYearFromDateString, saveToStorage } from "../../utils";
import HeartIcon from "mdi-react/HeartIcon";
import HeartOutlineIcon from "mdi-react/HeartOutlineIcon";
import "./homePage.scss";

const { REACT_APP_IMAGE_URL } = process.env;

const HomePage = (): JSX.Element => {
  const { genres, movies, loading, favourites } = useSelector(
    (state: RootReducer) => state
  );

  const generateGenres = (genre_ids: number[]) => {
    return genre_ids
      .slice(0, 2)
      .map((id) => genres.filter((genre) => genre.id === id)[0].name)
      .join(", ");
  };

  return (
    <div className="movie-card-container">
      {genres.length &&
        movies.map((movie) => (
          <div
            className="movie-card"
            style={{
              backgroundImage: `url(${REACT_APP_IMAGE_URL}${movie.backdrop_path})`,
            }}
            key={movie.id}
          >
            <div className="overlay"></div>
            <div className="content">
              {favourites.find(({ id }) => id === movie.id) ? (
                <HeartIcon className="icon" size={60} color="white" />
              ) : (
                <HeartOutlineIcon
                  className="icon"
                  size={60}
                  color="white"
                  onClick={() => saveToStorage(movie)}
                />
              )}
              <div className="header">
                <h2 className="title">{movie.title}</h2>
                <h4 className="info">
                  ({getYearFromDateString(movie.release_date)}){" "}
                  {generateGenres(movie.genre_ids)}
                </h4>
              </div>
              <p className="desc">{movie.overview}</p>
            </div>
          </div>
        ))}
      {loading && <Loader />}
    </div>
  );
};

export default HomePage;
