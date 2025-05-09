import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./list.css";
import noposter from "./assets/no-poster.png";
import avatar from "./assets/avatar.jpeg";
import useFetch from "./useFetch";
const List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { query, option, pageno } = location.state || {};

  const { dataa: ldata } = useFetch(
    `https://api.themoviedb.org/3/search/${option}?query=${query}&include_adult=false&language=en-US&page=${pageno}`
  );
  const data = ldata?.results;
  //   console.log(ldata);
  const container = document.querySelector(".container");
  container.style.backgroundImage = "none";
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.transition = "background-image 2s ease-out";
  return (
    <div className="listcontainer">
      <div className="banpages">
        <div className="prev">
          <input
            type="button"
            value="Back"
            className="back"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>

        <div className="pages">
          {(option === "movie" && "Movies List") ||
            (option === "tv" && "TV Shows List") ||
            (option === "person" && "Cast & Crew List")}
          {" - "}
          Page {ldata?.page} Of {ldata?.total_pages}
        </div>

        <div className="next">
          {ldata?.page < ldata?.total_pages && (
            <input
              type="button"
              value="Next"
              className="back ne"
              onClick={() => {
                navigate("/list", {
                  state: { query: query, option: option, pageno: pageno + 1 },
                });
              }}
            />
          )}
        </div>
      </div>

      <div className="listcontent">
        {data?.map((element, i) => {
          return (
            <div
              className="listitem"
              key={i}
              onClick={() => {
                if (["movie", "tv"].includes(option)) {
                  navigate("/moviedetails", {
                    state: { movieid: element?.id, type: option },
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
                alt="img"
                className="listpic"
                width="80px"
                height="120px"
              />
              <div className="ldet">
                <div className="lt"> {element?.title || element?.name}</div>
                {["movie", "tv"].includes(option) && (
                  <div className="rd">
                    Release Date:{" "}
                    {element?.release_date || element?.first_air_date
                      ? element?.release_date || element?.first_air_date
                      : "Coming Soon"}
                  </div>
                )}
                {["movie", "tv"].includes(option) && (
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
  );
};

export default List;
