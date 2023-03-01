import logo from "./logo.svg";

import "./PopUp.css";
import { AiFillEye } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import listYears from "./years.json";
import Nav from "react-bootstrap/Nav";
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function App() {
  let offset = 0;

  const refreshWindow = () => window.location.reload(true);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/movies?limitQuery=${limit}&offset=${offset}`)
      .then(({ data }) => {


        const newMovies = [];
        data.forEach((data) => newMovies.push(data));

        setMovies((oldMovies) => [...oldMovies, ...newMovies]);
        //    console.log(data)
          console.log(newMovies);
          setIsLoading(false);
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
      <nav
        style={{
          backgroundSize: "0",
          backgroundColor: "#012433",
          height: "50px",
        }}
      ></nav>
      <div className="flex-container">
        <div className="box">
          <h1 className="title" >Movie ranking</h1>
          <div className="d-grid gap-3 d-md-block" style={{ marginTop: "40px", marginBottom: '30px', verticalAlign: "middle !important" }}>

            <button className="btnTop10" onClick={btnTop10Revenue}> Top 10 revenue</button>
            <button onClick={() => setOpen(!open)}
              defaultValue="default" className="btnTop10Y" > Top 10 revenue per Year  {open && open ? (
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
              ) : null}</button>
            {show && (
              <button className="btnRefresh" onClick={refreshWindow}>
                <BiRefresh />
              </button>
            )}
          </div>
          <div className="divTable">
            <table className="table">
              <thead>
                <tr style={{ border: '2px', borderColor: '#0B749B' }}>
                  <th className="thStyle" style={{ textAlign: 'center' }}>Ranking</th>
                  <th className="thStyle">Title</th>
                  <th className="thStyle">Year</th>
                  <th className="thStyle">Revenue</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!isLoading && movies.length > 0 && movies.map((item, index) => {
                  return (
                    <tr key={index} style={{ verticalAlign: "middle !important" }}>
                      <td className="tdStyle" style={{ textAlign: 'center' }}>{index + 1}</td>

                      <td className="tdStyle" style={{ width: '50%' }}>{item.title}</td>

                      <td className="tdStyle">{item.year}</td>

                      <td className="tdStyle">${item.revenue}</td>

                      <td className="tdStyle"><button className="btnDetail" onClick={() => fetchMoviesById(item.id)}> <AiFillEye /></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {popuptogle && (
              <div className="pop_up_container">
                <div className="pop_up_body">
                  <div class="container" style={{marginLeft:'40px'}}>
                    <div class="row">
                      <div class="col-sm">
                        <div className=" bg-primary text-start">{moviesById.actors}</div>
                      </div>
                      <div class="col-sm">
                        <div class=" bg-primary text-start">$42</div>
                      </div>
                    </div>

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
