import React from "react";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function upper(str) {
  return str.toUpperCase();
}
const Home = ({ index, data, sindex }) => {
  // console.log(data);
  const navigate = useNavigate();
  const nrd = "coming soon";
  // const type = data?.[index]?.media_type;
  return (
    <div className="content home">
      <div className="side">
        <h1 className="title">
          {/* {type && upper(type)} SHOW -{" "} */}
          {(data?.[index]?.title && upper(data?.[index]?.title)) ||
            (data?.[index]?.name && upper(data?.[index]?.name))}
        </h1>
        <h3>Release Date: {data?.[index]?.release_date || nrd} </h3>
        <p>{data?.[index]?.overview}</p>
        <h3>
          Rating : {Math.floor(data?.[index]?.vote_average * 100) / 100 || nrd}{" "}
          | Votes : {data?.[index]?.vote_count}{" "}
        </h3>
      </div>
      <ul className="slider">
        {data?.map((element, i) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const itemRef = useRef(null);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            if (i === index && itemRef.current) {
              itemRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }
          }, [index]);
          return (
            <li
              key={i}
              className={`item ${index === i ? "high" : ""}`}
              onClick={() => {
                sindex(i);
              }}
              onDoubleClick={() => {
                navigate("/moviedetails", {
                  state: { movieid: data[i].id, type: data[i].media_type },
                });
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${element?.poster_path}`}
                alt="img"
                ref={itemRef}
                width="100px"
                height="160px"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
