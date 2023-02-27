import logo from "./logo.svg";
import "./App.css";
import "./PopUp.css";
import { AiFillEye } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import listYears from "./years.json";
import Reload from "./Reload";
import React from "react";

function App() {
  let offset = 0;

  const refreshWindow = () => window.location.reload(true);
  const [show, setShow] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesById, setMoviesById] = useState({
    title: "",
    year: "",
    ranking: "",
    revenue: "",
    genre: "",
    description: "",
    director: "",
    actors: "",
    runtime: "",
    rating: "",
    votes: "",
    metascore: "",
  });

  //fechar e abrir o popup
  const [popuptogle, setpopuptogle] = useState(false);

  //Botao dropdown
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  let limit = 10;
  const fetchAllMovies = () => {
    axios
      .get(`http://localhost:4000/movies?limitQuery=${limit}&offset=${offset}`)
      .then(({ data }) => {
        //setMovies(data)

        const newMovies = [];
        data.forEach((data) => newMovies.push(data));

        setMovies((oldMovies) => [...oldMovies, ...newMovies]);
        //    console.log(data)
        console.log(newMovies);
      });

    offset += 10;
  };

  //  console.log(movies);

  const handleScroll = (e) => {
    // console.log('ola')
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      fetchAllMovies();
    }
  };
  useEffect(() => {
    fetchAllMovies();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const btnTop10Revenue = () => {
    console.log(movies);
    let allMovies = movies.map((element) => element);
    console.log(allMovies);
    let moviesTop10ByRevenue = allMovies
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);
    setMovies(moviesTop10ByRevenue);
  };

  const btnTop10RevenueYear = (e) => {
    let ano = e.target.value;

    //console.log(ano);

    let moviesByYear = movies.filter((element) => element.year === ano);
    //console.log(moviesByYear);

    let moviesByRevenue = moviesByYear.sort((a, b) => b.revenue - a.revenue);
    //console.log(moviesByRevenue);

    let moviesTop10ByRevenueYear = moviesByRevenue.slice(0, 10);

    setMovies(moviesTop10ByRevenueYear);
    setShow(!show);
  };

  const fetchMoviesById = (id) => {
    let idMovie = id;

    return axios
      .get("http://localhost:4000/movies/" + idMovie)
      .then(function (response) {
        setMoviesById(response.data);
        setpopuptogle(!popuptogle);
      });
  };

  return (
    <>
      <div className="retangulo"></div>
      <div className="container">
        <div className="box">
          <h1 className="title">Movie ranking</h1>
          <div className="divButtons">
            <button className="btop10" value="top10" onClick={btnTop10Revenue}>
              Top 10 revenue
            </button>

            <button
              className="btop10Y"
              onClick={() => setOpen(!open)}
              defaultValue="default"
            >
              Top 10 revenue per Year
              {open && open ? (
                <ul className="menu">
                  <p className="messageSelect">Select a year</p>

                  {listYears.map((optionYear, index) => (
                    <li
                      key={optionYear.year}
                      className="menu-item"
                      value={optionYear.year}
                      onClick={btnTop10RevenueYear}
                    >
                      {optionYear.year}
                    </li>
                  ))}
                </ul>
              ) : null}
            </button>

            {show && (
              <button className="refresh" value="clean" onClick={refreshWindow}>
                <BiRefresh />
              </button>
            )}
          </div>
          <div className="divTable">
            <table className="table">
              <thead>
                <tr>
                  <th className="thrank">Ranking</th>
                  <th className="thtitle">Title</th>
                  <th className="thyear">Year</th>
                  <th className="threvenue">Revenue</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="tdRank">{index + 1}</td>

                      <td className="tdTitle">{item.title}</td>

                      <td className="tdYear">{item.year}</td>

                      <td className="tdRevenue">${item.revenue}</td>

                      <td>
                        <button
                          className="eye"
                          onClick={() => fetchMoviesById(item.id)}
                        >
                          <AiFillEye />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {popuptogle && (
              <div className="pop_up_container">
                <div className="pop_up_body">
                  <div className="linha">
                    <h1 className="popTitle">{moviesById.title}</h1>
                  </div>
                  <div className="linha">
                    <button className="bclose" onClick={fetchMoviesById}>
                      X{" "}
                    </button>

                    <p className="pClose">CLOSE</p>
                  </div>
                  <div className="pop_up_content">
                    <div className="espaco"> </div>
                    <p className="popYear">Year</p>
                    <p className="popRYear">{moviesById.year}</p>
                    <p className="popGenre">Genre</p>
                    <p className="popRGenre">{moviesById.genre}</p>
                    <p className="popDescription">Description</p>
                    <p className="popRDescription">{moviesById.description}</p>
                    <div className="linha">
                      <p className="popDirector">Director</p>
                    </div>
                    <div className="linha">
                      <p className="popActors">Actors</p>
                    </div>
                    <br />
                    <div className="linha">
                      <p className="popRDirector">{moviesById.director}</p>
                    </div>
                    <div className="linha">
                      <p className="popRActors">{moviesById.actors}</p>
                    </div>
                    <p className="popRutime">Runtime</p>
                    <p className="popRRuntime">{moviesById.runtime} mins</p>
                    <p className="popRating">Rating</p>
                    <p className="popRRating">{moviesById.rating}</p>
                    <p className="popVotes">Votes</p>
                    <p className="popRVotes">{moviesById.votes}</p>
                    <p className="popRevenue">Revenue</p>
                    <p className="popRRevenue">${moviesById.revenue}</p>
                    <p className="popMetascore">Metascore</p>
                    <p className="popRMetascore">{moviesById.metascore}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
