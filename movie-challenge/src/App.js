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
  const [hasMore, setHashMore] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [moviesPage, setMoviesPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  ;
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

  //--------------------------------------------Scroll----------------------------------------------------//
  useEffect(() => {
    fetchAllMoviesByPage();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading])

  function handleScroll() {
    if (page == totalPage || loading) {
      console.log('ola')

      return;
    }

    else if (window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight) {

      setPage((prev) => prev + 1);
    }
  }
  function fetchAllMoviesByPage() {
    setLoading(true);
    fetch(`http://localhost:4000/movies/?page=${page}&size=${moviesPage}`, {
      method: "GET"
    })
      .then(response => {
        setTotalPage(Math.round((response.headers.get("X-Total-Count") / moviesPage) - 0.6));
        console.log(totalPage);
        return response.json();
      })
      .then(data => {
        setMovies([...movies, ...data]);
        setLoading(false);
        //  console.log(movies);
      });
  }
  //------------------------------------------Buttons--------------------------------------------------------//
  const [allMovies, setAllMovies] = useState();

  /*function fetchAllMovies() {
    return axios.get("http://localhost:4000/movies/?size=10&column=revenue,desc").then(function (response) {
      setMovies(response.data);

    });
  }
  useEffect(() => {
    fetchAllMovies();
  },[]);*/
  const btnTop10Revenue = () => {

    return axios
      .get("http://localhost:4000/movies/?size=10&column=revenue,desc")
      .then(function (response) {
        setMovies(response.data)
      })
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
  //--------------------------------------------------Detail-----------------------------------------------------//
  const fetchMoviesById = (id) => {
    let idMovie = id;

    return axios
      .get("http://localhost:4000/movies/" + idMovie)
      .then(function (response) {
        setMoviesById(response.data);
        setpopuptogle(!popuptogle);
      });
  };
  //------------------------------------------------------------------------------------------------------//
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
          <h1 className="title">Movie ranking</h1>
          <div
            className="d-grid gap-3 d-md-block"
            style={{
              marginTop: "40px",
              marginBottom: "30px",
              verticalAlign: "middle !important",
            }}
          >
            <button className="btnTop10" onClick={btnTop10Revenue}>
              {" "}
              Top 10 revenue
            </button>
            <button
              onClick={() => setOpen(!open)}
              defaultValue="default"
              className="btnTop10Y"
            >
              {" "}
              Top 10 revenue per Year{" "}
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
              <button className="btnRefresh" onClick={refreshWindow}>
                <BiRefresh />
              </button>
            )}
          </div>
          <div className="divTable">
            <table className="table">


              <thead>
                <tr style={{ border: "1px", borderColor: "#0B749B", opacity: "0.6" }}>
                  <th className="thStyle" style={{ textAlign: "center" }}>
                    Ranking
                  </th>
                  <th className="thStyle">Title</th>
                  <th className="thStyle">Year</th>
                  <th className="thStyle">Revenue</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      style={{ verticalAlign: "middle !important" }}
                    >
                      <td className="tdStyle" style={{ textAlign: "center" }}>
                        {index + 1}
                      </td>

                      <td className="tdStyle" style={{ width: "50%" }}>
                        {item.title}
                      </td>

                      <td className="tdStyle">{item.year}</td>

                      <td className="tdStyle">${item.revenue}</td>

                      <td className="tdStyle">
                        <button
                          className="btnDetail"
                          onClick={() => fetchMoviesById(item.id)}
                        >
                          {" "}
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
                  <Container>
                    <Row>
                      <Col md={9} className="colTitle" style={{ paddingLeft: '10%', marginTop: '30px' }}>{moviesById.title}</Col>
                      <Col md={{ span: 1, offset: 1 }} style={{ color: '#000', paddingLeft: '10%', textAlign: 'center', fontSize: '10px', marginTop: '30px', border: 'none' }} onClick={fetchMoviesById}><button style={{ background: '#ffffff 0% 0% no-repeat padding-box', color: '#718FA2', border: 'none', marginLeft: '6px' }}>X</button>
                        <p style={{ color: '#718FA2', font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) 8px/16px Roboto', font: 'normal normal normal 8px/16px Roboto', opacity: '1', letterSpacing: '0.64px' }}>CLOSE</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={1} style={{ paddingLeft: '10%', marginTop: '10px' }}><div style={{ width: '52px', border: '2px solid var(--unnamed-color-21b3cf)', background: 'transparent 0% 0% no-repeat padding-box', border: '2px solid #21B3CF', opacity: '1' }}></div></Col>
                    </Row>
                    <Row>
                      <Col sm className="colName" style={{ paddingLeft: '10%', marginTop: '20px' }}>Year</Col>
                    </Row>
                    <Row>
                      <Col sm className="colReturned" style={{ paddingLeft: '10%' }}>{moviesById.year}</Col>
                    </Row>
                    <Row>
                      <Col sm className="colName" style={{ paddingLeft: '10%', marginTop: '10px' }}>Genre</Col>
                    </Row>
                    <Row>
                      <Col sm className="colReturned" style={{ paddingLeft: '10%' }}>{moviesById.genre}</Col>
                    </Row>
                    <Row>
                      <Col sm className="colName" style={{ paddingLeft: '10%', marginTop: '10px' }}>Description</Col>
                    </Row>
                    <Row>
                      <Col sm className="colReturned" style={{ paddingLeft: '10%', paddingRight: '10%' }}>{moviesById.description}</Col>
                    </Row>
                    <Row>
                      <Col md={4} className="colName" style={{ paddingLeft: '10%', marginTop: '10px' }}>Director </Col>
                      <Col md={8} className="colName" style={{ marginTop: '10px' }}>Actors</Col>
                    </Row>
                    <Row>
                      <Col md={4} className="colReturned" style={{ paddingLeft: '10%', color: '#00BAFF' }}>{moviesById.director} </Col>
                      <Col md={8} className="colReturned" style={{ paddingRight: '10%', color: '#00BAFF' }}>{moviesById.actors}</Col>
                    </Row>
                    <Row>
                      <Col sm className="colName" style={{ paddingLeft: '10%', marginTop: '10px' }}>Runtime</Col>
                    </Row>
                    <Row>
                      <Col sm className="colReturned" style={{ paddingLeft: '10%' }}>{moviesById.runtime} min</Col>
                    </Row>
                    <Row>
                      <Col sm className="colName" style={{ paddingLeft: '10%', marginTop: '10px' }}>Rating</Col>
                    </Row>
                    <Row>
                      <Col sm className="colReturned" style={{ paddingLeft: '10%' }}>{moviesById.rating}</Col>
                    </Row>
                    <Row>
                      <Col sm className="colName" style={{ paddingLeft: '10%', marginTop: '10px' }}>Votes</Col>
                    </Row>
                    <Row>
                      <Col sm className="colReturned" style={{ paddingLeft: '10%' }}>{moviesById.votes}</Col>
                    </Row>
                    <Row>
                      <Col sm className="colName" style={{ paddingLeft: '10%', marginTop: '10px' }}>Revenue</Col>
                    </Row>
                    <Row>
                      <Col sm className="colReturned" style={{ paddingLeft: '10%' }}>${moviesById.revenue}</Col>
                    </Row>
                    <Row>
                      <Col sm className="colName" style={{ paddingLeft: '10%', marginTop: '10px' }}>Metascore</Col>
                    </Row>
                    <Row>
                      <Col sm className="colReturned" style={{ paddingLeft: '10%', paddingBottom: '20px' }}>{moviesById.metascore}</Col>
                    </Row>
                  </Container>
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
