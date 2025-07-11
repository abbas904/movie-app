import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

import { OutlineButton } from "../components/button/Button";
import MovieListOptimized from "../components/optimized/MovieListOptimized";

import { category, movieType, tvType } from "../api/tmdbApiOptimized";

import * as Config from "./../constants/Config";

// Lazy load HeroSlide for better performance
const HeroSlide = lazy(() => import("../components/hero-slide/HeroSlide"));

const HomeOptimized = () => {
  return (
    <>
      <Suspense fallback={
        <div style={{
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f0f0f"
        }}>
          <div className="loading-spinner"></div>
        </div>
      }>
        <HeroSlide />
      </Suspense>

      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to={`/${Config.HOME_PAGE}/movie`}>
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieListOptimized category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to={`/${Config.HOME_PAGE}/movie`}>
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieListOptimized category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to={`/${Config.HOME_PAGE}/tv`}>
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieListOptimized category={category.tv} type={tvType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV</h2>
            <Link to={`/${Config.HOME_PAGE}/tv`}>
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieListOptimized category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </>
  );
};

export default HomeOptimized; 