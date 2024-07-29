import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/context";
import "./Navbar.css";

const Navbar = () => {
  const { isloggedin } = useAuth();

  return (
    <>
      <nav>
        <li style={{ color: "white", listStyle: "none" }}>Soban Nadeem</li>
        <ul>
          <li>
            <NavLink
              to="/"
              style={{
                color: "white",
                listStyle: "none",
                textDecoration: "none",
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              style={{
                color: "white",
                listStyle: "none",
                textDecoration: "none",
              }}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              style={{
                color: "white",
                listStyle: "none",
                textDecoration: "none",
              }}
            >
              Contact
            </NavLink>
          </li>
          {!isloggedin ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  style={{
                    color: "white",
                    listStyle: "none",
                    textDecoration: "none",
                  }}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  style={{
                    color: "white",
                    listStyle: "none",
                    textDecoration: "none",
                  }}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/logout"
                style={{
                  color: "white",
                  listStyle: "none",
                  textDecoration: "none",
                }}
              >
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
