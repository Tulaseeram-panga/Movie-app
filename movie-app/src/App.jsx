import "./App.css";
import { useState, createContext, useEffect } from "react";
import Movie from "./Movie";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Moviedetails from "./Moviedetails";
import Persondetails from "./Persondetails";
import Seasondetails from "./Seasondetails";
import Episodedetails from "./Episodedetails";
import List from "./List";
import Trending from "./Trending";
import Tvshow from "./Tvshow";
export const cdata = createContext();

function App() {
  const [data, setData] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);
  const [Load, SetLoad] = useState(true);
  const location = useLocation();
  const ishome = location.pathname === "/";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "API_KEY",
    },
  };

  useEffect(() => {
    if (!ishome) return;

    const url = "https://api.themoviedb.org/3/trending/all/week";
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        SetLoad(false);
      })
      .catch((err) => {
        console.error(err);
        setData(false);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const sid = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 7000);

    return () => clearInterval(sid);
  }, [data]);

  if (Load) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const backgroundStyle =
    ishome && data[bgIndex]?.backdrop_path
      ? {
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data[bgIndex].backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }
      : {};
  return (
    <div className="container" style={backgroundStyle}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home index={bgIndex} data={data} sindex={setBgIndex} />}
        />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tvshows" element={<Tvshow />} />
        <Route path="/moviedetails" element={<Moviedetails />} />
        <Route path="/persondetails" element={<Persondetails />} />
        <Route path="/seasondetails" element={<Seasondetails />} />
        <Route path="/episodedetails" element={<Episodedetails />} />
        <Route path="/list" element={<List />} />
        {/* <Route path="/"  /> */}
      </Routes>
    </div>
  );
}

export default App;
