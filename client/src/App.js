import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [peopleList, setPeopleList] = useState([]);
  const [planetList, setPlanetList] = useState([]);
  const [starshipList, setStarshipList] = useState([]);
  const [personList, setPersonList] = useState([]);

  useEffect(() => { 
    axios.get("http://localhost:3001/api/people").then((response) => {
        setPeopleList(response.data);   
    }); 
    axios.get("http://localhost:3001/api/planets").then((response) => {
        setPlanetList(response.data);   
    });
    axios.get("http://localhost:3001/api/starships").then((response) => {
        setStarshipList(response.data);   
    });
  }, []);

  return (
  <div className="App">
    <button onClick={()=>{
      
    }}>fetch people</button>

    <button>fetch planets</button>
    <button>fetch starships</button><br/>

    <div className="left">
      {peopleList.map((value) => {
          return (
            <h6>{value.name}</h6>
          );     
      })}</div>
      
    <div className="App">
      {planetList.map((value) => {
          return (
            <h6>{value.name}</h6>
          );   
      })}
    </div>

    <div className="right">
      {starshipList.map((value) => {
          return (
            <h6>{value.name}</h6>
          );     
      })}
    </div>

  </div>
  );
}

export default App;
