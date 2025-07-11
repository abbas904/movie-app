import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E",
  onLoad,
  onError,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef();

  useEffect(() => {
    let observer;
    if (imageRef) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            rootMargin: '50px 0px',
            threshold: 0.01
          }
        );
        observer.observe(imageRef);
        observerRef.current = observer;
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        setIsInView(true);
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [imageRef]);

  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad && onLoad();
      };
      img.onerror = () => {
        onError && onError();
      };
      img.src = src;
    }
  }, [isInView, src, onLoad, onError]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
      style={{
        opacity: isLoaded ? 1 : 0.3,
        transition: 'opacity 0.3s ease-in-out',
        filter: isLoaded ? 'none' : 'blur(2px)'
      }}
      {...props}
    />
  );
};

export default LazyImage; 