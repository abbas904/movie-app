import React from "react";
import { Link } from "react-router-dom";

import "./movie-card.scss";

import Button from "../button/Button";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import * as Config from "./../../constants/Config";

const MovieCard = (props) => {
  const item = props.item;

  const link =
    "/" + Config.HOME_PAGE + "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <div className="movie-card-wrapper">
      <Link to={link}>
        <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
          <Button>
            <i className="bx bx-play"></i>
          </Button>
        </div>
      </Link>
      <div className="movie-card-footer">
        <h3>{item.title || item.name}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
