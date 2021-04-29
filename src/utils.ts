import { Movie } from "./store/reducers/types";
import store from "./store";
import { reload } from "./store/actions";

export const getYearFromDateString = (date: any): string =>
  date ? date.split("-")[0] : "NA";

export const saveToStorage = (data: Movie): void => {
  const favMoviesString: string | null = localStorage.getItem("favMovies");
  const favMovies: Movie[] = favMoviesString ? JSON.parse(favMoviesString) : [];

  localStorage.setItem("favMovies", JSON.stringify([...favMovies, data]));
  store.dispatch(reload());
};
