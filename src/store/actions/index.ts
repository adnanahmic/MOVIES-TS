import { Genre, Movie } from "../reducers/types";
import { Action, SearchMoviesPayload, SortFilterPayload } from "./types";

export const reload = (): Action => {
  return { type: "RELOAD", payload: null };
};

export const setPagination = (status: boolean): Action => {
  return { type: "PAGINATION", payload: status };
};

export const getGenres = (): Action => {
  return {
    type: "GET_GENRES",
    payload: null,
  };
};

export const setGenres = (data: Genre[]): Action => {
  return {
    type: "SET_GENRES",
    payload: data,
  };
};

export const getMoviesList = (page: number): Action => {
  return {
    type: "GET_MOVIES",
    payload: page,
  };
};

export const setMoviesList = (data: Movie[]): Action => {
  return {
    type: "SET_MOVIES",
    payload: data,
  };
};

export const searchMovies = (data: SearchMoviesPayload): Action => {
  return {
    type: "SEARCH_MOVIES",
    payload: data,
  };
};

export const setFilters = (data: boolean): Action => {
  return {
    type: "SET_FILTERS",
    payload: data,
  };
};

export const setSearch = (data: boolean): Action => {
  return {
    type: "SET_SEARCH",
    payload: data,
  };
};

export const sortMovies = (data: SortFilterPayload): Action => {
  return {
    type: "SORT_MOVIES",
    payload: data,
  };
};
