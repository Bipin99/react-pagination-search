import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import Spinner from "./Spinner";
import Input from "./Input";

export default function Search() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=${query}&resultsFormat=native&page=${page}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const response = await res.json();
        const results = response.results;

        setData(results);
        setTotalPages(response.pagination.totalPages);
        if (containerRef.current) {
          containerRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data. Please try again.");
      } finally {
        setLoading(false);
     
      }
    };

    fetchData();
  }, [page, query]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  const prevHandler = () => {
    setPage((prev) => prev - 1);
  };
  const nextHandler = () => {
    setPage((prev) => prev + 1);
  };

  if (loading) {
  
    
    return (
      <div className={styles.loader}>

        <Input setQuery={setQuery} />
        <Spinner />
      </div>
    );
  }
  if (error) {
  return  <div>{error}</div>;
  }

  return (
    <div ref={containerRef}>
      <Input setQuery={setQuery} />
      {data.length > 0 ? (
        <>
      
            <div className={`${styles.pagination} ${styles.toppage}`}>
            {page > 1 && <button onClick={prevHandler}>&#9664; Prev</button>}
            {page < totalPages && <button onClick={nextHandler}>Next &#9654;</button>}
          </div>
          <div className={styles["product-container"]}>

          
            {data.map((ele) => (
              <div className={styles["product-container__card"]} key={ele.id}>
             
                  {" "}
                  <img
                    className={styles["product-image"]}
                    src={ele.thumbnailImageUrl}
                    alt={ele.name}
                    loading="lazy"
                  />
               
                <div className={styles["product-details"]}>
                  <h5>{ele.name}</h5>
                  <div className={styles.priceblock}>
                    <p className={styles.price}>${ele.price}</p>
                    {ele.msrp && ele.msrp > ele.price ? (
                      <p className={styles["msrp"]}>${ele.msrp}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
          {page > 1 && <button onClick={prevHandler}>&#9664; Prev</button>}
            {page < totalPages && <button onClick={nextHandler}>Next &#9654;</button>}
          </div>
        </>
      ) : (
        <div className={styles["no-results-container"]}>
          <div className={styles["no-results-content"]}>
            <h2>No Results Found</h2>
            <p>Sorry, we couldn&apos;t find any matching items.</p>
          </div>
        </div>
      )}
    </div>
  );
}
