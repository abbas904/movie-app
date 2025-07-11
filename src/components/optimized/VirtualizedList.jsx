import React, { useState, useEffect, useRef, useCallback } from 'react';

const VirtualizedList = ({ 
  items, 
  itemHeight = 200, 
  containerHeight = 600,
  renderItem,
  className = "",
  ...props 
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerRef, setContainerRef] = useState(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 0 });

  // Calculate visible items based on scroll position
  useEffect(() => {
    if (!containerRef) return;

    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    setVisibleRange({ start: startIndex, end: endIndex });
  }, [scrollTop, itemHeight, containerHeight, items.length, containerRef]);

  // Handle scroll events
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  // Calculate total height for scrollbar
  const totalHeight = items.length * itemHeight;

  // Calculate offset for visible items
  const offsetY = visibleRange.start * itemHeight;

  return (
    <div
      ref={setContainerRef}
      className={`virtualized-list ${className}`}
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
      {...props}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: offsetY,
            left: 0,
            right: 0
          }}
        >
          {items.slice(visibleRange.start, visibleRange.end).map((item, index) => (
            <div
              key={item.id || index}
              style={{
                height: itemHeight,
                position: 'relative'
              }}
            >
              {renderItem(item, visibleRange.start + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList; 