import React, { useState } from "react";
import useFetch from "./useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import "./movie.css";
import noposter from "./assets/no-poster.png";
const Movie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { opt, pno } = location.state || {};
  const [pageno, setPageno] = useState(pno || 1);
  const [option, setOption] = useState(opt || "now_playing");
  const { dataa: data } = useFetch(
    `https://api.themoviedb.org/3/movie/${option}?language=en-US&page=${pageno}`
  );
  const list = data?.results;
  // console.log(data);
  const container = document.querySelector(".container");
  container.style.backgroundImage = "none";
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.transition = "background-image 2s ease-out";
  return (
    <div className="mlistcontainer">
      <div className="mbanpages">
        {data?.page > 1 && (
          <div className="prev">
            <input
              type="button"
              value="Back"
              className="back"
              onClick={() => {
                setPageno((pageno) => pageno - 1);
              }}
            />
          </div>
        )}

        <div className="pages">
          {(option === "now_playing" && "Now Playing Movies List") ||
            (option === "popular" && "Popular Movies List") ||
            (option === "top_rated" && "Top Rated Movies List") ||
            (option === "upcoming" && "Upcoming Movies List")}
          {" - "}
          Page {data?.page} Of {data?.total_pages}
        </div>

        <div className="next">
          {data?.page < data?.total_pages && (
            <input
              type="button"
              value="Next"
              className="back ne"
              onClick={() => {
                setPageno((pageno) => pageno + 1);
              }}
            />
          )}
        </div>
      </div>
      <div className="trendcontainer">
        <div className="trendbtn">
          <li
            onClick={() => {
              setOption("now_playing");
              setPageno(1);
            }}
          >
            Now Playing
          </li>
          <li
            onClick={() => {
              setOption("popular");
              setPageno(1);
            }}
          >
            Popular
          </li>
          <li
            onClick={() => {
              setOption("top_rated");
              setPageno(1);
            }}
          >
            Top Rated
          </li>
          <li
            onClick={() => {
              setOption("upcoming");
              setPageno(1);
            }}
          >
            Upcoming
          </li>
        </div>

        <div className="trendist">
          {list?.map((element, i) => {
            return (
              <div
                className="lisitem"
                key={i}
                onClick={() => {
                  navigate("/moviedetails", {
                    state: {
                      movieid: element?.id,
                      type: "movie",
                    },
                  });
                }}
              >
                <img
                  src={
                    element?.poster_path || element?.profile_path
                      ? `https://image.tmdb.org/t/p/original${
                          element?.poster_path || element?.profile_path
                        }`
                      : noposter
                  }
                  alt="poster"
                  width="80px"
                  className="timg"
                  height="120px"
                />
                <div className="tdet">
                  <div className="ttitle">{element?.title}</div>

                  {
                    <div className="rd">
                      Release Date:{" "}
                      {element?.release_date
                        ? element?.release_date
                        : "Coming Soon"}
                    </div>
                  }

                  {
                    <div className="rating">
                      Rating: {Math.floor(element?.vote_average * 100) / 100}
                    </div>
                  }
                </div>
              </div>
            );
          })}
        </div>
        {/* container div end  */}
      </div>
    </div>
  );
};

export default Movie;
