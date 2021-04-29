import Axios, { AxiosPromise } from "axios";
import { SearchMoviesPayload, SortFilterPayload } from "../actions/types";

const { REACT_APP_API_KEY, REACT_APP_API_URL } = process.env;

export const getGenresApi = (): AxiosPromise => {
  return Axios.get(
    `${REACT_APP_API_URL}/genre/movie/list?api_key=${REACT_APP_API_KEY}&language=en-US`
  );
};

export const getMoviesApi = (page: number): AxiosPromise => {
  return Axios.get(
    `${REACT_APP_API_URL}/movie/popular?api_key=${REACT_APP_API_KEY}&language=en-US&page=${page}`
  );
};

export const searchMoviesApi = (query: SearchMoviesPayload): AxiosPromise => {
  const { searchText, page } = { ...query };
  return Axios.get(
    `${REACT_APP_API_URL}/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}`
  );
};

export const sortMoviesApi = (query: SortFilterPayload): AxiosPromise => {
  const { filters, page } = { ...query };
  const { sort_by, year } = { ...filters };
  let combinedQuery = "";
  if (sort_by) combinedQuery += `sort_by=${sort_by}`;
  if (year) combinedQuery += `year=${year}`;
  return Axios.get(
    `${REACT_APP_API_URL}/discover/movie?api_key=${REACT_APP_API_KEY}&language=en-US&${combinedQuery}page=${page}`
  );
};
