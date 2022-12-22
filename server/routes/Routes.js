const express = require("express");
const router = express.Router();
const BASE_URL = "https://swapi.dev/api/";
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//Get all people from all pages
router.get("/people", async (req, res) => {
    try{
        const peopleList = [];
        let url = `${BASE_URL}people/`;  
        do {
          let res = await fetch(url);
          let data = await res.json();
          url = data.next;
          peopleList.push(...data.results);
        } while(url != null);
        res.json(peopleList);
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
});

//Get all planets from all pages
router.get("/planets", async (req, res) => {
    try{
        const planetList = [];
        let url = `${BASE_URL}planets/`;  
        do {
          let res = await fetch(url);
          let data = await res.json();
          url = data.next;
          planetList.push(...data.results);
        } while(url != null);
        res.json(planetList);
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
});

//Get all starships from all pages
router.get("/starships", async (req, res) => {
    try{
        const starshipList = [];
        let url = `${BASE_URL}starships/`;  
        do {
          let res = await fetch(url);
          let data = await res.json();
          url = data.next;
          starshipList.push(...data.results);
        } while(url != null);
        res.json(starshipList);
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
});

//Get people by search (result could be more than one match and more than one page)
router.get("/people/:str", async (req, res) => {
    try{
        const peopleList = [];
        const str = req.params.str;
        let url = `${BASE_URL}people/?search=${str}`;  
        do {
          let res = await fetch(url);
          let data = await res.json();
          url = data.next;
          peopleList.push(...data.results);
        } while(url != null);
        res.json(peopleList);
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;
