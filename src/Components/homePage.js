import React, { useState, useRef, useCallback } from "react";
import useFetch from "./useFetch";

function HomePage() {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, loading, hasMore, error } = useFetch(pageNumber);
  const lastItem = useRef();

  const lastItemCall = useCallback(
    (item) => {
      if (loading) return;
      if (lastItem.current) lastItem.current.disconnect();
      lastItem.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (item) lastItem.current.observe(item);
    },
    [loading, hasMore],
  );

  const Card = ({ item }) => {
    return (
      <div className="row">
        <div className="image">
          <img src={item.node.field_photo_image_section} />
        </div>
        <div className="right-side">
          <div className="heading">{item.node.title}</div>
          <div className="desc">{item.node.path}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="area">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            if (index + 1 === data.length) {
              return (
                <div ref={lastItemCall} className="column" key={item.node.nid}>
                  <Card item={item} />
                </div>
              );
            } else {
              return (
                <div className="column" key={item.node.nid}>
                  <Card item={item} />
                </div>
              );
            }
          })}
        {loading && <div>Loading...</div>}
        {error && <div>Error !!</div>}
      </div>
    </div>
  );
}

export default HomePage;
