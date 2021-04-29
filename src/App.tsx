import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ArrowTopCircleIcon from "mdi-react/ArrowTopCircleIcon";

import "./App.scss";
import Filters from "./components/Filters";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/FavouritesPage";
import { getGenres, getMoviesList, reload } from "./store/actions";
import { RootReducer } from "./store/reducers/types";

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { genres, movies, filters, search, total, pagination } = useSelector(
    (state: RootReducer) => state
  );
  const [page, setPage] = useState(1);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleScroll = () => {
    if (
      movies.length > 0 &&
      window.innerHeight + document.documentElement.scrollTop >
        ref.current.clientHeight &&
      pagination
    ) {
      total > movies.length && setPage(page + 1);
    }
  };

  useEffect(() => {
    !genres.length && dispatch(getGenres());
    dispatch(getMoviesList(page));
    dispatch(reload());
    scrollTop();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [movies, pagination]);

  useEffect(() => {
    setPage(1);
    scrollTop();
  }, [filters, search]);

  useEffect(() => {
    !filters && !search && dispatch(getMoviesList(page));
  }, [page, filters, search]);

  return (
    <Router>
      <Header />
      <div className="main-container" ref={ref}>
        {pagination && <Filters page={page} />}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/favourites" component={ListPage} />
        </Switch>
      </div>
      <button className="top-button" onClick={scrollTop}>
        <ArrowTopCircleIcon color="#fff" size={32} />
      </button>
      <Footer />
    </Router>
  );
};

export default App;
