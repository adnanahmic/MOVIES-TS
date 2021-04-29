import { Genre, Movie } from "../reducers/types";

export type AppConstants = "RELOAD" | "PAGINATION";

export type GenreConstants = "GET_GENRES" | "SET_GENRES";

export type MovieConstants =
  | "GET_MOVIES"
  | "SET_MOVIES"
  | "SEARCH_MOVIES"
  | "SORT_MOVIES";

export type SearchFilterConstants = "SET_FILTERS" | "SET_SEARCH";

export interface Filter {
  sort_by?: string;
  year?: string;
}

export interface SortFilterPayload {
  filters: Filter;
  page: number;
}

export interface SearchMoviesPayload {
  searchText: string;
  page: number;
}

export interface APIResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type Payload =
  | null
  | number
  | boolean
  | Genre[]
  | Movie[]
  | SortFilterPayload
  | SearchMoviesPayload
  | APIResponse;

export interface Action {
  type: GenreConstants | MovieConstants | SearchFilterConstants | AppConstants;
  payload: Payload;
}
