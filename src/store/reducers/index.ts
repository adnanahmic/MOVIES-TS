import { Action, APIResponse } from "../actions/types";
import { Movie, RootReducer } from "./types";

const initialState: RootReducer = {
  genres: [],
  movies: [],
  loading: false,
  filters: false,
  search: false,
  pagination: true,
  total: 0,
  favourites: [],
};

export default (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "RELOAD": {
      const favMoviesString: any = localStorage.getItem("favMovies");
      const favMovies: Movie[] = favMoviesString
        ? JSON.parse(favMoviesString)
        : [];
      return {
        ...state,
        favourites: favMovies,
      };
    }
    case "PAGINATION":
      return { ...state, pagination: payload };
    case "SET_GENRES":
      return { ...state, genres: payload || [] };
    case "GET_MOVIES":
      return { ...state, loading: true };
    case "SEARCH_MOVIES":
      return {
        ...state,
        loading: true,
        search: true,
        movies: (payload as APIResponse).page > 1 ? state.movies : [],
      };
    case "SORT_MOVIES":
      return {
        ...state,
        loading: true,
        filters: true,
        movies: (payload as APIResponse).page > 1 ? state.movies : [],
      };
    case "SET_MOVIES":
      return {
        ...state,
        loading: false,
        movies: [...state.movies, ...(payload as APIResponse)?.results],
        total: (payload as APIResponse)?.total_results,
      };
    case "SET_FILTERS":
      return {
        ...state,
        filters: payload,
        movies: payload ? [] : state.movies,
      };
    case "SET_SEARCH":
      return {
        ...state,
        search: payload,
        movies: state.search && !payload ? [] : state.movies,
      };
    default:
      return state;
  }
};
