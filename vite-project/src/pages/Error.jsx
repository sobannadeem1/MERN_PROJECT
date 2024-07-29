import { NavLink } from "react-router-dom";
import "./NotFound.css";
import React from "react";

const Error = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <NavLink to="/">
        <button>Return to Home Page</button>
      </NavLink>
    </div>
  );
};
export default Error;
