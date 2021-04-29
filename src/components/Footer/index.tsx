import React from "react";
import "./footer.scss";

const Footer = (): JSX.Element => {
  return (
    <footer>
      <p id="name">Credits: Adnan Ahmic</p>
      <p id="year">{new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
