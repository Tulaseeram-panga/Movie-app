import React from "react";
import useFetch from "./useFetch";
// import "./App.css";
import bg from "./assets/personback.jpg";
import { FaPlay } from "react-icons/fa";
import "./persondetails.css";
import noposter from "./assets/no-poster.png";
import avatar from "./assets/avatar.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
const Persondetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { personid } = location.state || {};
  const { dataa: persondata } = useFetch(
    `https://api.themoviedb.org/3/person/${personid}?language=en-US`
  );
  const { dataa: mcredits } = useFetch(
    `https://api.themoviedb.org/3/person/${personid}/combined_credits?language=en-US`
  );
  const container = document.querySelector(".container");
  container.style.backgroundImage = `url(${bg})`;
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.transition = "background-image 2s ease";

  const cast = mcredits?.cast;
  const crew = mcredits?.crew;
  // console.log(mcredits?.crew);
  return (
    <div className="dcontainer">
      <input
        type="button"
        value="Back"
        className="back"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="moviemain">
        <div className="poster">
          <img
            src={
              persondata?.profile_path
                ? `https://image.tmdb.org/t/p/original${persondata?.profile_path}`
                : avatar
            }
            alt="poster"
            width="250px"
            className="iposter"
            height="375px"
          />
          {persondata?.homepage && (
            <div className="pbtn">
              <FaPlay
                className="picon"
                onClick={() => {
                  window.open(persondata?.homepage, "_blank");
                }}
              />
            </div>
          )}
        </div>
        <div className="details">
          <h1 className="dtitle">{persondata?.name}</h1>
          {(persondata?.birthday || persondata?.deathday) && (
            <div className="bandd">
              {persondata?.birthday && (
                <span className="born">Born: {persondata?.birthday}</span>
              )}
              {persondata?.deathday && (
                <span className="died">Died: {persondata?.deathday}</span>
              )}
            </div>
          )}

          {(persondata?.place_of_birth || persondata?.known_for_department) && (
            <div className="bpandkd">
              {persondata?.place_of_birth && (
                <span className="pb">
                  Birth Place: {persondata?.place_of_birth}
                </span>
              )}
              {persondata?.known_for_department && (
                <span className="kd">
                  Known For: {persondata?.known_for_department}
                </span>
              )}
            </div>
          )}

          {/* <div className="ul"></div> */}
          {persondata?.also_known_as.length > 0 && (
            <div className="alsocon">
              <h3>Also Known As</h3>
              <div className="alsok">
                {persondata?.also_known_as?.map((element, i) => {
                  return (
                    <li key={i} className="akaitem">
                      {element}
                    </li>
                  );
                })}
              </div>
            </div>
          )}
          <div className="ul"></div>
          {persondata?.biography && (
            <div className="biography">
              <h1>Biography</h1>
              <p>{persondata?.biography}</p>
            </div>
          )}
          <div className="ul"></div>

          {cast?.length > 0 && (
            <div className="mcredits">
              <h3>Acting Credits</h3>
              <div className="mclist">
                {cast?.map((element, i) => {
                  return (
                    <div
                      key={i}
                      className="mcitem"
                      onClick={() => {
                        navigate("/moviedetails", {
                          state: {
                            movieid: element.id,
                            type: element.media_type,
                          },
                        });
                      }}
                    >
                      <div>
                        <img
                          src={
                            element?.poster_path
                              ? `https://image.tmdb.org/t/p/original${element?.poster_path}`
                              : noposter
                          }
                          className="propic"
                          alt="acted movies list"
                          width="200px"
                          height="50px"
                        />
                      </div>
                      <div className="pchar">
                        {element?.character || "Unknown"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="ul"></div>

          {crew?.length > 0 && (
            <div className="mcredits">
              <h3>Crew Credits</h3>
              <div className="mclist">
                {crew?.map((element, i) => {
                  return (
                    <div
                      key={i}
                      className="mcitem"
                      onClick={() => {
                        navigate("/moviedetails", {
                          state: {
                            movieid: element.id,
                            type: element.media_type,
                          },
                        });
                      }}
                    >
                      <div>
                        <img
                          src={
                            element?.poster_path
                              ? `https://image.tmdb.org/t/p/original${element?.poster_path}`
                              : noposter
                          }
                          className="propic"
                          alt="crew movies list"
                          width="200px"
                          height="50px"
                        />
                      </div>
                      <div className="pchar">{element?.job || "Unknown"}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* this is the end  */}
        </div>
      </div>
    </div>
  );
};

export default Persondetails;
