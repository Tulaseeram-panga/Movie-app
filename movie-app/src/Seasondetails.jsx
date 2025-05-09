import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import noposter from "./assets/no-poster.png";
import { FaPlay } from "react-icons/fa";
import avatar from "./assets/avatar.jpeg";
import "./seasondetails.css";
const Seasondetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { seasonid, seasonno, arrno } = location.state || {};
  const { dataa: seasondata } = useFetch(
    `https://api.themoviedb.org/3/tv/${seasonid}?language=en-US`
  );
  const { dataa: epdata } = useFetch(
    `https://api.themoviedb.org/3/tv/${seasonid}/season/${seasonno}?language=en-US`
  );
  const { dataa: castdata } = useFetch(
    `https://api.themoviedb.org/3/tv/${seasonid}/season/${seasonno}/credits?language=en-US`
  );

  const cast = castdata?.cast;
  // console.log(cast);
  const crew = castdata?.crew;
  const container = document.querySelector(".container");
  container.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${seasondata?.backdrop_path})`;
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.transition = "background-image 2s ease-out";

  const sdata = seasondata?.seasons[arrno];
  const genres = seasondata?.genres;
  const createdby = seasondata?.created_by;
  const pcomp = seasondata?.production_companies;
  const episodes = epdata?.episodes;
  //   console.log(episodes);
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
              sdata?.poster_path
                ? `https://image.tmdb.org/t/p/original${sdata?.poster_path}`
                : noposter
            }
            alt="poster"
            width="250px"
            className="iposter"
            height="375px"
          />
          {seasondata?.homepage && (
            <div
              className="pbtn"
              onClick={() => {
                window.open(seasondata?.homepage, "_blank");
              }}
            >
              <FaPlay className="picon" />
            </div>
          )}
        </div>

        <div className="details">
          <h1 className="dtitle">
            {seasondata?.name} - {sdata?.name}
          </h1>

          <div className="ra">
            <span className="rdate">Release Date: {sdata?.air_date}</span>
            <span className="vavg">
              Rating:{" "}
              {sdata?.vote_average === 0
                ? Math.floor(seasondata?.vote_average * 100) / 100
                : Math.floor(sdata?.vote_average * 100) / 100}
            </span>
          </div>

          {(sdata?.episode_count || genres?.length > 0) && (
            <div className="rg">
              {sdata?.episode_count && (
                <span className="runtime">
                  No of Episodes: {sdata.episode_count}
                </span>
              )}
              {genres?.length > 0 && (
                <span className="dgenre">
                  {genres?.map((element, i) => {
                    return <li key={i}>{element.name} </li>;
                  })}
                </span>
              )}
            </div>
          )}

          {createdby?.length > 0 && (
            <div className="cast">
              <h3 style={{ padding: "0px" }}>Created by</h3>
              <div className="castlist" style={{ height: "150px" }}>
                {createdby?.map((element, i) => {
                  return (
                    <div
                      key={i}
                      className="clitem"
                      onClick={() => {
                        navigate("/persondetails", {
                          state: { personid: element.id },
                        });
                      }}
                    >
                      <div>
                        <img
                          src={
                            element?.profile_path
                              ? `https://image.tmdb.org/t/p/original${element?.profile_path}`
                              : avatar
                          }
                          className="propic"
                          alt="production company logo"
                          width="200px"
                          height="50px"
                        />
                      </div>
                      <div className="castname">{element?.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="ul"></div>
          <div className="overview">{sdata?.overview}</div>
          {pcomp?.length > 0 && (
            <div className="pcomp">
              {pcomp?.map((element, i) => {
                return (
                  <div key={i} className="pelement">
                    <div>
                      {element?.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original${element?.logo_path}`}
                          className="plogo"
                          alt="production company logo"
                          width="200px"
                          height="50px"
                        />
                      ) : (
                        <span className="noel">{element.name}</span>
                      )}
                    </div>
                    {/* <div>{element.name}</div> */}
                  </div>
                );
              })}
            </div>
          )}

          <div className="ul"></div>

          {episodes?.length > 0 && (
            <div className="episodes">
              <h3>Episodes</h3>
              <div className="eplist">
                {episodes?.map((element, i) => {
                  return (
                    <div
                      key={i}
                      className="epitem"
                      onClick={() => {
                        navigate("/episodedetails", {
                          state: {
                            seasonid: seasondata?.id,
                            seasonno: element?.season_number,
                            arrno: i,
                            sname: seasondata?.name,
                            ebgimg: seasondata?.backdrop_path,
                          },
                        });
                      }}
                    >
                      <div>
                        <img
                          src={
                            element?.still_path
                              ? `https://image.tmdb.org/t/p/original${element?.still_path}`
                              : noposter
                          }
                          className="epipic"
                          alt="production company logo"
                          width="300px"
                          height="100px"
                        />
                      </div>
                      <div className="castname">
                        Episode {element?.episode_number}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="ul"></div>

          {cast?.length > 0 && (
            <div className="cast">
              <h3>Cast</h3>
              <div className="castlist">
                {cast?.map((element, i) => {
                  return (
                    <div
                      key={i}
                      className="clitem"
                      onClick={() => {
                        navigate("/persondetails", {
                          state: { personid: element.id },
                        });
                      }}
                    >
                      <div>
                        <img
                          src={
                            element?.profile_path
                              ? `https://image.tmdb.org/t/p/original${element?.profile_path}`
                              : avatar
                          }
                          className="propic"
                          alt="production company logo"
                          width="200px"
                          height="50px"
                        />
                      </div>
                      <div className="castname">{element?.character}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="ul"></div>
          {crew?.length > 0 && (
            <div className="crew">
              <h3>Crew</h3>
              <div className="crewlist">
                {crew?.map((element, i) => {
                  return (
                    <div
                      key={i}
                      className="clitem"
                      onClick={() => {
                        navigate("/persondetails", {
                          state: { personid: element.id },
                        });
                      }}
                    >
                      {/* className="ovcon"  */}
                      <div>
                        <img
                          src={
                            element?.profile_path
                              ? `https://image.tmdb.org/t/p/original${element?.profile_path}`
                              : avatar
                          }
                          className="propic"
                          alt="crew profile picture"
                          width="200px"
                          height="50px"
                        />
                        {/* <div className="ov">{element?.name}</div> */}
                      </div>
                      <div className="castname">
                        {element?.job || "Unknown"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* end of the details div */}
        </div>
      </div>
    </div>
  );
};

export default Seasondetails;
