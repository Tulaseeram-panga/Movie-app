import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./episodedetails.css";
import useFetch from "./useFetch";
import noposter from "./assets/no-poster.png";
import avatar from "./assets/avatar.jpeg";
const Episodedetails = () => {
  const location = useLocation();
  const { seasonid, seasonno, arrno, sname, ebgimg } = location.state || {};
  const navigate = useNavigate();
  const { dataa: epdata } = useFetch(
    `https://api.themoviedb.org/3/tv/${seasonid}/season/${seasonno}?language=en-US`
  );
  const episode = epdata?.episodes[arrno];
  const { dataa: castdata } = useFetch(
    `https://api.themoviedb.org/3/tv/${seasonid}/season/${seasonno}/episode/${episode?.episode_number}/credits?language=en-US`
  );
  const cast = castdata?.cast;
  const gueststars = castdata?.guest_stars;
  const crew = castdata?.crew;
  const container = document.querySelector(".container");
  container.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${ebgimg})`;
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.transition = "background-image 2s ease-out";
  //   console.log(castdata);
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
              episode?.still_path
                ? `https://image.tmdb.org/t/p/original${episode?.still_path}`
                : noposter
            }
            alt="poster"
            width="320px"
            className="iposter"
            height="180px"
          />
        </div>
        <div className="details">
          <h3 className="dtitle">
            {sname} - {epdata?.name}
          </h3>
          <h3 className="etitle">Episode name: {episode?.name}</h3>

          <div className="ra">
            <span className="rdate">Release Date: {episode?.air_date}</span>
            <span className="vavg">
              Rating:{" "}
              {episode?.vote_average === 0
                ? Math.floor(epdata?.vote_average * 100) / 100
                : Math.floor(episode?.vote_average * 100) / 100}
            </span>
          </div>

          {(episode?.runtime || episode?.episode_type) && (
            <div className="br">
              {episode?.runtime && (
                <span className="budget">Runtime: {episode?.runtime} Min</span>
              )}
              {episode?.episode_type && (
                <span className="revenue">
                  Episode Type: {episode?.episode_type}
                </span>
              )}
            </div>
          )}

          {(episode?.episode_number || episode?.season_number) && (
            <div className="br">
              {episode?.season_number && (
                <span className="budget">
                  Season No: {episode?.season_number}
                </span>
              )}
              {episode?.episode_number && (
                <span className="revenue">
                  Episode No: {episode?.episode_number}
                </span>
              )}
            </div>
          )}
          {/* <div className="ul"></div> */}

          <div className="overview">{episode?.overview}</div>

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
          {gueststars?.length > 0 && (
            <div className="cast">
              <h3>guest stars</h3>
              <div className="castlist">
                {gueststars?.map((element, i) => {
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
          {/* end of details div  */}
        </div>
      </div>
    </div>
  );
};

export default Episodedetails;
