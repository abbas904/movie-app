import React, { useEffect, useRef } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./header.scss";
import logo from "./../../assets/logo.png";
import * as Config from "./../../constants/Config";

const headerNav = [
  { display: "Home", path: `/${Config.HOME_PAGE}` },
  { display: "Movies", path: `/${Config.HOME_PAGE}/movie` },
  { display: "TV Series", path: `/${Config.HOME_PAGE}/tv` },
];

const Header = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    history.push("/signin");
  };

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="logo" />
          <Link to={`/${Config.HOME_PAGE}`}>Cinema Hub</Link>
        </div>

        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}

          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout} className="btn btn-logout">
                Log Out
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signin">
                  <button className="btn btn-signin">Sign In</button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button className="btn btn-signup">Sign Up</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
