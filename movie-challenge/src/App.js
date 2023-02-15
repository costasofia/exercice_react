import logo from './logo.svg';
import './App.css';
import { AiFillEye } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:4000/movies')
        .then(response => response.json())
        .then(json => {
          setData(json)
        })
    }
    fetchData();
  }, [])

  return (
    <>
    <div className='retangulo'>

    </div>
      <div className='all'>
        <h1 className='title'>Movie ranking</h1>
        <div >
          <button className='btop10'>Top 10 revenue</button>
          <button className='btop10Y'> Top 10 revenue per Year</button>
          <button className='refresh'><BiRefresh /></button>
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
            {data.map(item => {
              return (
                <tr key={item.id}>
                  <td className='rank'>1</td>
                  <td className='title' >{item.title}</td>
                  <td className='year'>{item.year}</td>
                  <td className='revenue'>{item.revenue}</td>
                  <td><button className='eye'><AiFillEye /></button></td>
                </tr>
              )
            })}
          </tbody>

        </table>

      </div>
    </>
  );
}

export default App;
