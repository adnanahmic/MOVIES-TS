import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchMovies,
  setFilters,
  setSearch,
  sortMovies,
} from "../../store/actions";
import { Filter } from "../../store/actions/types";
import { RootReducer } from "../../store/reducers/types";
import "./filters.scss";

interface Props {
  page: number;
}

const Filters = (props: Props): JSX.Element => {
  const { page } = props;
  const dispatch = useDispatch();
  const { filters, search } = useSelector((state: RootReducer) => state);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [years, setYears] = useState<string[]>([]);
  const [data, setData] = useState({
    sort: "",
    year: "",
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 30; i++) years.push((currentYear - i).toString());
    setYears(years);
  }, []);

  useEffect(() => {
    (data.sort || data.year) && search && dispatch(setSearch(false));
  }, [data]);

  useEffect(() => {
    !filters &&
      setData({
        sort: "",
        year: "",
      });
  }, [filters]);

  useEffect(() => {
    const filters: Filter = {};
    if (data.sort) filters.sort_by = data.sort;
    if (data.year) filters.year = data.year;

    if (Object.keys(filters).length) dispatch(sortMovies({ filters, page }));
  }, [data, page]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (showSearch) {
      dispatch(setSearch(true));
      if (filters) {
        dispatch(setFilters(false));
      }
    } else dispatch(setSearch(false));
  }, [showSearch]);

  useEffect(() => {
    if (!search) {
      setSearchText("");
      setShowSearch(false);
    }
  }, [search]);

  useEffect(() => {
    searchText &&
      searchText.length % 3 === 0 &&
      dispatch(searchMovies({ searchText, page }));
  }, [searchText, page]);

  return (
    <div className="filter-container">
      <div id="sub">
        <input
          className="search-input"
          type="text"
          placeholder="Search movies"
          onChange={(event) => setSearchText(event.target.value)}
          value={searchText}
        />
      </div>
      <div className="filter">
        <label>Sort: </label>
        <select name="sort" value={data.sort} onChange={handleSelectChange}>
          <option value="" disabled>
            Select Order
          </option>
          <option value="original_title.asc">Title Ascending</option>
          <option value="original_title.desc">Title Descending</option>
        </select>
      </div>
      <div className="filter">
        <label>Year: </label>
        <select name="year" value={data.year} onChange={handleSelectChange}>
          <option value="" disabled>
            Select Year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
