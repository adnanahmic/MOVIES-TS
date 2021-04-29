import React from "react";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from "mdi-react/FormatListBulletedIcon";
import "./header.scss";

const Header = (): JSX.Element => {
  return (
    <header>
      <Link className="logo" to="/">
        <img src="/logo.png" alt="Logo" />
        <p>Movies</p>
      </Link>
      <nav id="main">
        <Link to="/favourites">
          <FormatListBulletedIcon className="icon" size={36} />
          <span>My List</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
