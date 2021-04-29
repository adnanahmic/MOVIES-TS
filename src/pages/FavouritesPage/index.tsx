import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { RootReducer } from "../../store/reducers/types";
import { getYearFromDateString } from "../../utils";
import { setPagination } from "../../store/actions";
import "./favPage.scss";

const { REACT_APP_IMAGE_URL } = process.env;

const FavouritesPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { favourites, loading } = useSelector((state: RootReducer) => state);

  useEffect(() => {
    dispatch(setPagination(false));

    return () => {
      dispatch(setPagination(true));
    };
  }, []);

  return (
    <div className="container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Film Title</th>
            <th>Released</th>
          </tr>
        </thead>
        <tbody>
          {favourites.map((movie, index) => (
            <tr key={movie.id}>
              <td>{index + 1}</td>
              <td id="image-title">
                <img
                  src={`${REACT_APP_IMAGE_URL}${movie.poster_path}`}
                  alt="Movie"
                />
                <div>
                  <h4>{movie.title}</h4>
                  <p>{movie.overview}</p>
                </div>
              </td>
              <td>{getYearFromDateString(movie.release_date)}</td>
            </tr>
          ))}
          {loading && (
            <tr>
              <td colSpan={3}>
                <Loader />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FavouritesPage;
