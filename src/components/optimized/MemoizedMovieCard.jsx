import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import apiConfig from '../../api/apiConfig';
import * as Config from '../../constants/Config';

const MemoizedMovieCard = memo(({ item, category }) => {
  const link = `/${Config.HOME_PAGE}/${category}/${item.id}`;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card">
        <div className="movie-card__poster">
          <LazyImage
            src={bg}
            alt={item.title}
            className="movie-card__poster__img"
          />
        </div>
        <h3>{item.title}</h3>
      </div>
    </Link>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for memoization
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.poster_path === nextProps.item.poster_path &&
    prevProps.item.title === nextProps.item.title &&
    prevProps.category === nextProps.category
  );
});

MemoizedMovieCard.displayName = 'MemoizedMovieCard';

export default MemoizedMovieCard; 