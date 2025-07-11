import React, { useState, useEffect, useCallback } from "react";
import tmdbApiOptimized, { category, movieType, tvType } from "../../api/tmdbApiOptimized";
import VirtualizedList from "./VirtualizedList";
import MemoizedMovieCard from "./MemoizedMovieCard";
import "./movie-list.scss";

const MovieListOptimized = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      let response = null;
      const params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApiOptimized.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApiOptimized.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApiOptimized.similar(props.category, props.id);
      }

      setItems(response.results);
      setTotalPage(response.total_pages);
      setLoading(false);
    };

    getList();
  }, [props.category, props.type, props.id]);

  const loadMore = useCallback(async () => {
    if (page < totalPage) {
      setLoading(true);
      let response = null;
      const params = {
        page: page + 1,
      };

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApiOptimized.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApiOptimized.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApiOptimized.similar(props.category, props.id);
      }

      setItems((prevItems) => [...prevItems, ...response.results]);
      setPage(page + 1);
      setLoading(false);
    }
  }, [page, totalPage, props.category, props.type, props.id]);

  const renderItem = useCallback((item, index) => (
    <MemoizedMovieCard
      key={item.id}
      item={item}
      category={props.category}
    />
  ), [props.category]);

  if (loading && items.length === 0) {
    return (
      <div className="movie-list">
        <div className="movie-list__loading">
          <div className="loading-spinner"></div>
          <p>جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list">
      <VirtualizedList
        items={items}
        itemHeight={300}
        containerHeight={600}
        renderItem={renderItem}
        className="movie-list__grid"
      />
      
      {page < totalPage && (
        <div className="movie-list__loadmore">
          <button 
            className="btn btn-outline" 
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? "جاري التحميل..." : "تحميل المزيد"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieListOptimized; 