const express = require("express");
const router = express.Router();
const BASE_URL = "https://swapi.dev/api/";
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


//Get all people
router.get("/people", async (req, res) => {
    try {
        const response = await fetch(BASE_URL+"people/");
        res.json(await response.json());
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
});

//Get all planets
router.get("/planets", async (req, res) => {
    try {
        const response = await fetch(BASE_URL+"planets/");
        res.json(await response.json());
    }catch (err) {
        res.status(500).send('Something went wrong');
    }
});

//Get all starships
router.get("/starships", async (req, res) => {
    try {
        const response = await fetch(BASE_URL+"starships/");
        res.json(await response.json());
    }catch (err) {
        res.status(500).send('Something went wrong');
    }
});

//Get person by search
router.get("/people/:str", async (req, res) => {
    try {
        const str = req.params.str;
        const response = await fetch(BASE_URL + `people/?search=${str}`);
        res.json(await response.json());
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;
