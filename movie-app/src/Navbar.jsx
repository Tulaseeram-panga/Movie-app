import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./App.css";
import noposter from "./assets/no-poster.png";
import { FaSearch } from "react-icons/fa";
import avatar from "./assets/avatar.jpeg";
import useFetch from "./useFetch";
const Smovie = ({ data, option, setQuery }) => {
  const navigate = useNavigate();
  useEffect(() => {
    data = {};
    data.length = 0;
  }, [option]);
  // console.log(data);
  return (
    <div className={`smovie ${data?.length === 0 ? "ed" : "smovie"}`}>
      {data?.map((element, i) => {
        return (
          <li
            key={i}
            onClick={() => {
              if (["movie", "tv"].includes(option)) {
                navigate("/moviedetails", {
                  state: { movieid: data[i].id, type: option },
                });
              } else if (option === "person") {
                navigate("persondetails", {
                  state: { personid: data[i].id },
                });
              }
              const movie = document.querySelector("#movie");
              movie.value = "";
              data.length = 0;
              setQuery("");
            }}
          >
            <div className="stitle">{element?.title || element?.name}</div>
            <div className="simg">
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
                className="navimg"
                width="40px"
                height="60px"
              />
            </div>
          </li>
        );
      })}
    </div>
  );
};
const Navbar = () => {
  const [query, setQuery] = useState("");
  const [option, SetOption] = useState("movie");
  const navigate = useNavigate();
  const url = `https://api.themoviedb.org/3/search/${option}?query=${query}&include_adult=false&language=en-US&page=1`;
  const { dataa: dat } = useFetch(url);
  const data = dat?.results;

  const SearchMovie = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li className="wptitle">MOVIE MATCH</li>
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/trending" state={{ opt: "all", pno: 1 }}>
            <li>Trending</li>
          </NavLink>
          <NavLink to="/movie" state={{ opt: "now_playing", pno: 1 }}>
            <li>Movies</li>
          </NavLink>
          <NavLink to="/tvshows" state={{ opt: "airing_today", pno: 1 }}>
            <li>TV shows</li>
          </NavLink>
          <div className="searchbar">
            <select
              className="option"
              name="option"
              onChange={(event) => {
                SetOption(event.target.value);
              }}
            >
              <option value="movie">Movie</option>
              <option value="tv">Tv Show</option>
              <option value="person">Actor</option>
            </select>
            <input
              type="text"
              name=""
              placeholder="Search Here"
              id="movie"
              autoComplete="off"
              onChange={SearchMovie}
            />
            <FaSearch
              className="sicon"
              onClick={() => {
                if (data.length > 0) {
                  navigate("/list", {
                    state: { query: query, option: option, pageno: 1 },
                  });
                  const movie = document.querySelector("#movie");
                  movie.value = "";
                  data.length = 0;
                  setQuery("");
                } else {
                  //
                }
              }}
            />
          </div>
        </ul>
      </nav>
      <Smovie data={data} option={option} setQuery={setQuery} />
    </div>
  );
};

export default Navbar;
