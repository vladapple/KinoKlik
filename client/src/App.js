import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [peopleList, setPeopleList] = useState([]);
  const [planetList, setPlanetList] = useState([]);
  const [starshipList, setStarshipList] = useState([]);
  const [peopleFoundList, setPeopleFoundList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showPeople, setShowPeople] = useState(false);
  const [showPeopleFound, setShowPeopleFound] = useState(false);
  const [showPlanets, setShowPlanets] = useState(false);
  const [showStarships, setShowStarships] = useState(false);
  const BASE_URL = "http://localhost:3001/api/"; 

  //Fetching the lists of people, planets, starships
  useEffect(() => { 
    axios.get(`${BASE_URL}people`).then((response) => {
        setPeopleList(response.data);   
    }); 
    axios.get(`${BASE_URL}planets`).then((response) => {
        setPlanetList(response.data);   
    });
    axios.get(`${BASE_URL}starships`).then((response) => {
        setStarshipList(response.data);   
    });
  }, []);

  //onChange event handler (if there any change in input)
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    show(false, false, false, true);
    //checks if input is not empty
    if (searchInput.length > 0) {
      axios.get(`${BASE_URL}people/${searchInput}`).then((response) => {
        setPeopleFoundList(response.data);
      });
    }
  };

  //function that controls show / hide sections
  const show = (people, planets, starships, personFound) => {
    setShowPeople(people);
    setShowPlanets(planets);
    setShowStarships(starships);
    setShowPeopleFound(personFound);
  }

  return (
  <div className="App">
    <button onClick={() => show(true, false, false, false)}>fetch people</button>
    <button onClick={() => show(false, true, false, false)}>fetch planets</button>
    <button onClick={() => show(false, false, true, false)}>fetch starships</button>
    <input type="search" placeholder="Search here" onChange={handleChange} value={searchInput} />

    {/*search bar section*/} 
    <div className="left">
      {showPeopleFound===true && peopleFoundList.map((value) => {
          return (
            <h6>{value.name}</h6>
          );     
      })}</div>

    {/*people list section*/}
    <div className="left">
      {showPeople===true && peopleList.map((value) => {
          return (
            <h6>{value.name}</h6>
          );     
      })}</div>

    {/*starship list section*/}
    <div className="right">
      {showStarships===true && starshipList.map((value) => {
          return (
            <h6>{value.name}</h6>
          );     
      })}
    </div>
    
    {/*planet list section*/}
    <div className="App">
      {showPlanets===true && planetList.map((value) => {
          return (
            <h6>{value.name}</h6>
          );   
      })}
    </div>

  </div>
  );
}

export default App;
