import logo from './logo.svg';
import './App.css';
import { AiFillEye } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

import Select from 'react-select';


function App() {
  const [movies, setMovies] = useState([]);
  const [mobieById, setMobieById] = useState([]);
  //Botao dropdown
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };


/*
  function fetchMovieById(id) {
    console.log(id);
    return axios.get(`http://localhost:4000/movies/${id}`)
      .then(function (response) {
        setMobieById(response.data)
        console.log(response.data)
      });
  };
*/

const fetchMovieById = (year)=>{
    let idMovie = year;
    console.log(idMovie);
}

  function fetchAllMovies() {
    return axios.get(`http://localhost:4000/movies`)
      .then(function (response) {
        setMovies(response.data);
      });

  };



  /*
    const fetchData =()=>{
      const ENDPOINT = 'http://localhost:4000/movies';
     const URL_CONFIGURED = `${ENDPOINT}?_page=1&limit=1`;
      fetch(URL_CONFIGURED )
        .then((response)=> response.json())
       .then((newMovies)=> setMovie((prevMovies)=> [...prevMovies, ...newMovies]))
       // .then((newMovies)=> setMovie([ ...newMovies]))
    }
  */
  /*const handleScroll = (e) => {
    // console.log('hi');
    // console.log(e.target.documentElement.scrollTop);
    // console.log(e.target.documentElement.scrollHeight);
    if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
      fetchData();
    }
  }*/
  useEffect(() => {
    fetchAllMovies();
    fetchMovieById();
    //  window.addEventListener('scroll', handleScroll);
  }, []);


  const handleBtn = (e) => {
    let word = e.target.value;

    if (word === "top10") {
      let topDados = movies.map(({ revenue }) => revenue)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10)

      //console.log(topDados)


      let top10 = movies.filter(({ revenue }) => topDados.includes(revenue)).sort((a, b) => b.revenue - a.revenue);

      //console.log(top10);
      setMovies(top10);

    } else if (word === "clean") {
      //  console.log('clean')
      fetchAllMovies();
    }
  }

  const handleBtn2 = (e) => {
    let ano = e.target.value;

    //  console.log(ano);

    let moviesByYear = movies.filter((element) => element.year === ano);
    // console.log(moviesByYear);

    let moviesByRevenue = moviesByYear.sort((a, b) => b.revenue - a.revenue)
    console.log(moviesByRevenue);

    let moviesTop10ByRevenue = moviesByRevenue.slice(0, 10);

    setMovies(moviesTop10ByRevenue);
  }

  //fechar e abrir o popup
  const [popuptogle, setpopuptogle] = useState(false);

  const [popupcontent, setpopupcontent] = useState([]);
  const changecontent = (item) => {
    setpopupcontent([item]);
    setpopuptogle(!popuptogle);
  };

  //remover a duplicação de anos
  /*has retorna um valor booleano indicando se um elemento com o valor especifico 
  existe num objeto set ou não*/

  const setYear = new Set();
  const filterYear = movies.filter((year) => {
    const duplicatedYear = setYear.has(year.year);
    setYear.add(year.year);

    //console.log(duplicatedYear);
    return !duplicatedYear;
  })

  return (
    <>

      <div>
        <div className='retangulo'>

        </div>
        <div className='all'>
          <h1 className='title'>Movie ranking</h1>
          <div >
            <button className='btop10' value="top10" onClick={handleBtn}>Top 10 revenue</button>

            <button className='btop10Y' onClick={handleOpen}>Top 10 revenue per Year
              {open ? (
                <ul className="menu">
                  {filterYear.map((menuItem, index) => (


                    <li key={index} className="menu-item" value={menuItem.year} onClick={handleBtn2}>{menuItem.year}</li>
                  ))}
                </ul>
              ) : null}
            </button>

            <button className='refresh' value="clean" onClick={handleBtn}><BiRefresh /></button>
          </div>

          <table className="table">



            <thead>
              <tr>
                <th className='thrank'>Ranking</th>
                <th className='thtitle'>Title</th>
                <th className='thyear'>Year</th>
                <th className='threvenue'>Revenue</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {movies.map((item, index) => {

                return (
                  <tr key={index}>
                    <td className='rank'>{index + 1}</td>

                    <td className='title' >{item.title}</td>

                    <td className='year'>{item.year}</td>

                    <td className='revenue'>{item.revenue}</td>

                    <td><button className='eye' onClick={() => fetchAllMovies(item.year)}><AiFillEye /></button></td>
                  </tr>
                )

              })}
            </tbody>


          </table>


        </div>
        {popuptogle && <div className='pop_up_container'>
          <div className='pop_up_body'>
            <div className='pop_up_header'>
              <button className='bclose' onClick={changecontent}>X</button>
            </div>
            <div className='pop_up_content'>
              {popupcontent.map((pop, index) => {
                return (
                  <div key={index}>
                    <h1 className='popTitle'>{pop.title}</h1>
                    <div className='espaco'>
                    </div>
                    <p className='popYear'>Year</p>
                    <p className='popRYear'>{pop.year}</p>
                    <p className='popGenre'>Genre</p>
                    <p className='popRGenre'>{pop.genre}</p>
                    <p className='popDescription'>Description</p>
                    <p className='popRDescription'>{pop.description}</p>
                    <div className='linha'>
                      <p className='popDirector'>Director</p>

                    </div>
                    <div className='linha'>
                      <p className='popActors'>Actors</p>
                    </div>
                    <br />
                    <div className='linha'>
                      <p className='popRDirector'>{pop.director}</p>
                    </div>
                    <div className='linha'>
                      <p className='popRActors'>{pop.actors}</p>
                    </div>
                    <p className='popRutime'>Runtime</p>
                    <p className='popRRuntime'>{pop.runtime}</p>
                    <p className='popRating'>Rating</p>
                    <p className='popRRating'>{pop.rating}</p>
                    <p className='popVotes'>Votes</p>
                    <p className='popRVotes'>{pop.votes}</p>
                    <p className='popRevenue'>Revenue</p>
                    <p className='popRRevenue'>{pop.revenue}</p>
                    <p className='popMetascore'>Metascore</p>
                    <p className='popRMetascore'>{pop.metascore}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        }
      </div>

    </>
  );
}


export default App