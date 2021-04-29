import { put, takeLatest, all, call } from "redux-saga/effects";
import { setGenres, setMoviesList } from "../actions";
import {
  getGenresApi,
  getMoviesApi,
  searchMoviesApi,
  sortMoviesApi,
} from "../api";

// export interface Response {
//   config?: any;
//   data?: any;
//   headers?: any;
//   request?: any;
//   status?: number;
//   statusText?: string;
// }

function* fetchGenres() {
  const response = yield call(getGenresApi);
  if (response.status === 200) yield put(setGenres(response?.data?.genres));
}

function* fetchMovies(action) {
  const response = yield call(getMoviesApi, action.payload);

  if (response.status === 200) yield put(setMoviesList(response.data));
}

function* searchMovies(action) {
  const response = yield call(searchMoviesApi, action.payload);
  if (response.status === 200) yield put(setMoviesList(response.data));
}

function* sortMovies(action) {
  const response = yield call(sortMoviesApi, action.payload);
  if (response.status === 200) yield put(setMoviesList(response.data));
}

export default function* rootSaga() {
  yield all([
    takeLatest("GET_MOVIES", fetchMovies),
    takeLatest("GET_GENRES", fetchGenres),
    takeLatest("SEARCH_MOVIES", searchMovies),
    takeLatest("SORT_MOVIES", sortMovies),
  ]);
}
