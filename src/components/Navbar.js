import React from "react";
import { useAuth0 } from "../auth0-context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <header>
      <nav
        className="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            {" "}
            Discourse
          </Link>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            {!isAuthenticated ? (
              <button onClick={loginWithRedirect} className="button is-white">
                Log in
              </button>
            ) : (
              <button onClick={logout} className="button is-danger is-light">
                Log out
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
