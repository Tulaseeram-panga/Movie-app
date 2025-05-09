import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import "./trending.css";
import avatar from "./assets/avatar.jpeg";
import noposter from "./assets/no-poster.png";
const Trending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { opt, pno } = location.state || {};
  const [pageno, setPageno] = useState(pno || 1);
  const [option, setOption] = useState(opt || "all");

  useEffect(() => {
    setPageno(1);
  }, [option]);

  const { dataa: data } = useFetch(
    `https://api.themoviedb.org/3/trending/${option}/day?language=en-US&page=${pageno}`
  );

  const list = data?.results;
  //   console.log(data?.results);
  const container = document.querySelector(".container");
  container.style.backgroundImage = `none`;
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.transition = "background-image 2s ease-out";
  return (
    <div className="listcontainer">
      <div className="banpages">
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
          {(option === "all" && "All Trending List") ||
            (option === "movie" && "Trending Movies List") ||
            (option === "tv" && "Trending TV Shows List") ||
            (option === "person" && "Trending Cast & Crew List")}
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
              setOption("all");
              setPageno(1);
            }}
          >
            All
          </li>
          <li
            onClick={() => {
              setOption("movie");
              setPageno(1);
            }}
          >
            Movies
          </li>
          <li
            onClick={() => {
              setOption("tv");
              setPageno(1);
            }}
          >
            TV shows
          </li>
          <li
            onClick={() => {
              setOption("person");
              setPageno(1);
            }}
          >
            Cast & Crew
          </li>
        </div>
        <div className="trendist">
          {list?.map((element, i) => {
            return (
              <div
                className="lisitem"
                key={i}
                onClick={() => {
                  if (["movie", "tv"].includes(element?.media_type)) {
                    navigate("/moviedetails", {
                      state: {
                        movieid: element?.id,
                        type: element?.media_type,
                      },
                    });
                  } else if (option === "person") {
                    navigate("/persondetails", {
                      state: { personid: element?.id },
                    });
                  }
                }}
              >
                <img
                  src={
                    element?.poster_path || element?.profile_path
                      ? `https://image.tmdb.org/t/p/original${
                          element?.poster_path || element?.profile_path
                        }`
                      : option === "person"
                      ? avatar
                      : noposter
                  }
                  alt="poster"
                  width="80px"
                  className="timg"
                  height="120px"
                />
                <div className="tdet">
                  <div className="ttitle">
                    {element?.title || element?.name}
                  </div>

                  {["movie", "tv"].includes(element?.media_type) && (
                    <div className="rd">
                      Release Date:{" "}
                      {element?.release_date || element?.first_air_date
                        ? element?.release_date || element?.first_air_date
                        : "Coming Soon"}
                    </div>
                  )}

                  {["movie", "tv"].includes(element?.media_type) && (
                    <div className="rating">
                      Rating: {Math.floor(element?.vote_average * 100) / 100}
                    </div>
                  )}

                  {element?.gender < 3 && (
                    <div className="gender">
                      Gender:{" "}
                      {(element?.gender === 0 && "Not set") ||
                        (element?.gender === 1 && "Female") ||
                        (element?.gender === 2 && "Male") ||
                        (element?.gender === 3 && "Non-binary")}
                    </div>
                  )}

                  {element?.known_for_department && (
                    <div className="knfor">
                      Known For: {element?.known_for_department}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Trending;
