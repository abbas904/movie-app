import React, { useEffect, useRef } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./header.scss";
import logo from "./../../assets/logo.png";
import * as Config from "./../../constants/Config";
import { useAuth } from "../../context/AuthContext";

const headerNav = [
  {
    display: "Home",
    path: `/${Config.HOME_PAGE}`,
  },
  {
    display: "Movies",
    path: `/${Config.HOME_PAGE}/movie`,
  },
  {
    display: "TV Series",
    path: `/${Config.HOME_PAGE}/tv`,
  },
];

const HeaderEnhanced = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const headerRef = useRef(null);
  const { isLoggedIn, currentUser, logout } = useAuth();

  const active = headerNav.findIndex((e) => e.path === pathname);

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
    logout();
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
            <>
              <li>
                <Link to="/profile">
                  <button className="btn btn-profile">
                    {currentUser?.username || "الملف الشخصي"}
                  </button>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-logout">
                  تسجيل الخروج
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin">
                  <button className="btn btn-signin">تسجيل الدخول</button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button className="btn btn-signup">إنشاء حساب</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderEnhanced; 