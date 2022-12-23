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
  <div className="container">
    <h1>Data Fetcher</h1>

    <div class="flex">
      <div>
        <button type="button" class="btn btn-dark" onClick={() => show(true, false, false, false)}>FETCH  PEOPLE</button><br></br>
        <button type="button" class="btn btn-dark" onClick={() => show(false, true, false, false)}>FETCH PLANETS</button><br></br>
        <button type="button" class="btn btn-dark" onClick={() => show(false, false, true, false)}>FETCH STARSHIPS</button><br></br>
        <input type="text" class="form-control" placeholder="Search person by name" onChange={handleChange} value={searchInput} /><br></br>
      </div>

      <div class="area">

        {showPeopleFound===false && showPeople===false && showStarships===false && showPlanets===false ? (
         <div>
            <br></br><br></br>
            <h3 class="sg-span-title">WELCOME TO DATA FETCHER APP!<br></br><br></br>
             PRESS BUTTONS ON THE LEFT...
            </h3>
         </div>
         ) : (<span></span>)
        }

        {/*search bar section*/} 
        {showPeopleFound===true ? (
         <div>
          <table className="table table-striped table-bordered">
				    <thead className="thead-dark">
					    <tr>
						    <th>Name</th>
						    <th>Height</th>
						    <th>Weight</th>
                <th>Birth Year</th>
                <th>Gender</th>
					    </tr>
				    </thead>
				    <tbody>
          {peopleFoundList.map((value) => {
            return (
              <tr>
						    <td>{value.name}</td>
						    <td>{value.height}</td>
						    <td>{value.mass}</td>
                <td>{value.birth_year}</td>
                <td>{value.gender}</td>
					    </tr>
            );     
          })}
            </tbody>
			    </table>
         </div>
         ) : (<span></span>)
        }
        
        {/*people list section*/}
        {showPeople===true ? (
         <div>
          <table className="table table-striped table-bordered">
				    <thead className="thead-dark">
					    <tr>
						    <th>Name</th>
						    <th>Height</th>
						    <th>Weight</th>
                <th>Birth Year</th>
                <th>Gender</th>
					    </tr>
				    </thead>
				    <tbody>
          {peopleList.map((value) => {
            return (
              <tr>
						    <td>{value.name}</td>
						    <td>{value.height}</td>
						    <td>{value.mass}</td>
                <td>{value.birth_year}</td>
                <td>{value.gender}</td>
					    </tr>
            );     
          })}
            </tbody>
			    </table>
         </div>
         ) : (<span></span>)
        }

        {/*starship list section*/}
        {showStarships===true ? (
         <div>
          <table className="table table-striped table-bordered">
				    <thead className="thead-dark">
					    <tr>
						    <th>Name</th>
                <th>Model</th>
						    <th>Length</th>
						    <th>Passengers</th>
                <th>Cargo Capacity</th>
					    </tr>
				    </thead>
				    <tbody>
          {starshipList.map((value) => {
            return (
              <tr>
						    <td>{value.name}</td>
                <td>{value.model}</td>
						    <td>{value.length}</td>
						    <td>{value.passengers}</td>
                <td>{value.cargo_capacity}</td>
					    </tr>
            );     
          })}
            </tbody>
			    </table>
         </div>
         ) : (<span></span>)
        }

        {/*planet list section*/}
        {showPlanets===true ? (
         <div>
          <table className="table table-striped table-bordered">
				    <thead className="thead-dark">
					    <tr>
						    <th>Name</th>
						    <th>Rotation Period</th>
						    <th>Diameter</th>
                <th>Gravity</th>
                <th>Terrain</th>
                <th>Population</th>
					    </tr>
				    </thead>
				    <tbody>
          {planetList.map((value) => {
            return (
              <tr>
						    <td>{value.name}</td>
						    <td>{value.rotation_period}</td>
						    <td>{value.diameter}</td>
                <td>{value.gravity}</td>
                <td>{value.terrain}</td>
                <td>{value.population}</td>
					    </tr>
            );     
          })}
            </tbody>
			    </table>
         </div>
         ) : (<span></span>)
        }

      </div>
    </div>
    
    

    

    
    
    

  </div>
  );
}

export default App;
