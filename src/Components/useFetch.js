import React, { useEffect, useState } from "react";

export default function useFetch(pageNumber) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    setLoading(true);
    fetch(`https://express-channel.vercel.app/api/${pageNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setData((prevData) => {
          return [...prevData, ...data.nodes];
        });
        setHasMore(data.nodes.length > 0);
        setLoading(false);
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    getData();
  }, [pageNumber]);

  return { data, loading, hasMore, error };
}
