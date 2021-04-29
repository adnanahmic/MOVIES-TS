export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  genre_ids: number[];
  release_date: string[];
  poster_path: string;
  backdrop_path: string;
}

export interface RootReducer {
  genres: Genre[];
  movies: Movie[];
  loading: boolean;
  filters: boolean;
  search: boolean;
  total: number;
  favourites: Movie[];
  pagination: boolean;
}
