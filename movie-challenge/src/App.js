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
    <div >
      <h1>Movie ranking</h1>
      <div>
        <button className='btop10'>Top 10 revenue</button>
        <button className='btop10Y'> Top 10 revenue per Year</button>
        <button className='refresh'><BiRefresh /></button>
      </div>
      <table className="table">

        <th>Ranking</th>
        <th>Title</th>
        <th>Year</th>
        <th>Revenue</th>
        <th></th>
        {data.map(item => {
          return (
            <tr>
              <td>1</td>
              <td>{item.title}</td>
              <td>{item.year}</td>
              <td>{item.revenue}</td>
              <td><button><AiFillEye /></button></td>
            </tr>
          )
        })}





      </table>

    </div>
  );
}

export default App;
