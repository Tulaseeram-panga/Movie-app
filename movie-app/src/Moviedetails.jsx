import "./moviedetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import noposter from "./assets/no-poster.png";
import avatar from "./assets/avatar.jpeg";
import { FaPlay } from "react-icons/fa";
import useFetch from "./useFetch";
import bg from "./assets/personback.jpg";

const Moviedetails = () => {
  const location = useLocation();
  const { movieid, type } = location.state || {};
  const navigate = useNavigate();
  const url = `https://api.themoviedb.org/3/${type}/${movieid}?language=en-US`;

  const { dataa: data } = useFetch(url);

  const { dataa: castdata } = useFetch(
    `https://api.themoviedb.org/3/${type}/${movieid}/credits?language=en-US`
  );
  const { dataa: reviewdata } = useFetch(
    `https://api.themoviedb.org/3/${type}/${movieid}/reviews?language=en-US&page=1`
  );
  const { dataa: similardata } = useFetch(
    `https://api.themoviedb.org/3/${type}/${movieid}/similar?language=en-US&page=1`
  );

  const cast = castdata?.cast;
  // console.log(cast);
  const crew = castdata?.crew;
  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "Not Available";
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const container = document.querySelector(".container");
  container.style.backgroundImage = data?.backdrop_path
    ? `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`
    : `url(${bg})`;

  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.transition = "background-image 2s ease";
  const genres = data?.genres;
  const pcomp = data?.production_companies;
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
              data?.poster_path
                ? `https://image.tmdb.org/t/p/original${data?.poster_path}`
                : noposter
            }
            alt="poster"
            width="250px"
            className="iposter"
            height="375px"
          />
          {data?.homepage && (
            <div
              className="pbtn"
              onClick={() => {
                window.open(data?.homepage, "_blank");
              }}
            >
              <FaPlay className="picon" />
            </div>
          )}
        </div>
        <div className="details">
          <h1 className="dtitle">{data?.title || data?.name}</h1>
          {(data?.runtime || genres?.length > 0) && (
            <div className="rg">
              {data?.runtime > 0 && (
                <span className="runtime">Runtime: {data.runtime} min</span>
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
          <div className="ra">
            <span className="rdate">
              Release Date: {data?.release_date || data?.first_air_date}
            </span>
            <span className="vavg">
              Rating: {Math.floor(data?.vote_average * 100) / 100}
            </span>
          </div>

          {(data?.budget > 0 || data?.revenue > 0) && (
            <div className="br">
              {data?.budget > 0 && (
                <span className="budget">
                  Budget: {formatCurrency(data.budget)}
                </span>
              )}
              {data?.revenue > 0 && (
                <span className="revenue">
                  Revenue: {formatCurrency(data.revenue)}
                </span>
              )}
            </div>
          )}

          {(data?.status || data?.type) && (
            <div className="br">
              {data?.status && (
                <span className="budget">Show Status: {data?.status}</span>
              )}
              {data?.type && (
                <span className="revenue">Show Type: {data?.type}</span>
              )}
            </div>
          )}

          <div className="ul"></div>
          <div className="overview">{data?.overview}</div>
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
          {data?.seasons?.length > 0 && (
            <div className="seasons">
              <h3>Seasons</h3>
              <div className="selist">
                {data?.seasons?.map((element, i) => {
                  return (
                    <div
                      key={i}
                      className="sitem"
                      onClick={() => {
                        navigate("/seasondetails", {
                          state: {
                            seasonid: data?.id,
                            seasonno: element?.season_number,
                            arrno: i,
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
          <div className="ul"></div>
          {reviewdata?.results.length > 0 && (
            <div className="review">
              <h3>Reviews</h3>
              <div className="reviewlist">
                {reviewdata?.results?.map((element, i) => {
                  return (
                    <div key={i} className="rlitem">
                      <div className="author">Author: {element.author}</div>
                      <div className="rcontent">{element.content}</div>
                      <div className="vmore">
                        {/* {element.created_at} */}
                        <a href={element.url} target="_blank">
                          View More ...
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="ul"></div>
          {similardata?.results && similardata?.results?.length > 0 && (
            <div className="similar">
              <h3>{`similar ${type === "movie" ? "movies" : "tv shows"}`}</h3>
              <div className="similarlist">
                {similardata?.results?.map((element, i) => {
                  return (
                    <div
                      key={i}
                      className="slitem"
                      onClick={() => {
                        navigate("/moviedetails", {
                          state: {
                            movieid: element.id,
                            type: type,
                          },
                        });
                        // console.log(element.id, type);
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
                          alt="similr movie posters"
                          width="200px"
                          height="50px"
                        />
                      </div>
                      <div className="similarname">{element?.title}</div>
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

export default Moviedetails;
