import './App.css';
import {useState} from "react";
import Axios from 'axios';

function App() {
  const [name,setName] = useState("");
  const [type,setType] = useState("");
  const [date,setDate] = useState("");
  const [review,setReview] = useState("");

  //const [newDate, setNewDate] = useState("");

  const [movieList, setMovieList] = useState([]);

  const addMovie = () => {
    Axios.post('http://localhost:3001/create', {
      name: name, 
      type: type,
      date: date, 
      review: review,
    }).then(()=>{
      /*setMovieList([
        ...movieList,
        {
          name: name,
          type: type,
          date: date,
          review: review,
        },
      ])*/
    });
  }

  const getMovies = () => {
    Axios.get ('http://localhost:3001/movies').then((response)=>{
      setMovieList(response.data);
    });
  }

{/*const updateMovieDate = (id) => {
    Axios.put ('http://localhost:3001/update', {
      date: newDate,
      id: id,
    }).then((response)=>{
      setMovieList(movieList.map((val)=> {
        return val.id === id ? {
          id: val.id,
          name: val.name,
          type: val.type,
          date: newDate,
          review: val.review,
        } : val
      }))
    });
  }*/} 

  const deleteMovie = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setMovieList(
        movieList.filter((val)=> {
          return val.id !== id;
        })
      );
    });
  }

  return (
    <div className="App">
      <div className="information">
        <h1>MY MOVIES</h1>
        <input id = "name"
          type = "text" 
          placeholder="name"
          onChange ={(event) => {
            setName(event.target.value);
          }}
        />
        <input id = "type"
          type = "text" 
          placeholder="type"
          onChange ={(event) => {
            setType(event.target.value);
          }}
        />
        <input id = "date"
          type ="text"
          placeholder="date finished"
          onChange ={(event) => {
            setDate(event.target.value);
          }}
        />
        <input id = "review"
          type ="text"
          placeholder="enter your review"
          onChange ={(event) => {
            setReview(event.target.value);
          }}
        />
        <button onClick = {addMovie}>Add Movie Review</button>
      </div>
      <hr />
      <div className="movies">
        <button onClick = {getMovies}>Show Past Movies / Refresh</button>   

        {movieList.map((val, key) => {
          return (
          <div className = "movie">
            <div>
              <h4>Name: {val.name}</h4>
              <h4>Type: {val.type}</h4>
              <h4>Date: {val.date}</h4>
              <h4>Review: {val.review}</h4>
            </div>
            
              {/*<input 
                type = "text"
                placeholder = "date finished"
                onChange ={(event) => {
                  setNewDate(event.target.value);
                }}
              />
              <button onClick = {()=>updateMovieDate(val.id)} id = "update">update</button>*/}

            <div>
              <button onClick = {()=>deleteMovie(val.id)} id = "delete">delete</button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
