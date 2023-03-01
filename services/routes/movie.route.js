const express = require("express");
const cors = require("cors");
const movie = express.Router();
movie.use(cors());

const Movie = require("../models/movie.model");
const { sequelize } = require("../database/db");
/*
movie.get("/", (req, res) => {
   // let page = parseInt(req.query.page);
    let limitQuery = parseInt(req.query.limitQuery);
    let offset = parseInt(req.query.offset)
 

    Movie.findAll({  limit: limitQuery, offset:offset})
        .then((data) => {
            res.json(data)
            console.log('data returned with success')
        }).catch(err => {
            res.send(err);
        })
});
*/

movie.get("/",async (req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    const movies = await Movie.findAndCountAll({
       limit:size, 
       offset:page*size
    });
    res.send(movies);
})

movie.get("/:id", (req, res) => {
    Movie.findOne({
        where: { id: req.params.id },
    })
        .then((movie) => {
            res.json(movie);
            console.log("ok");
        })
        .catch((err) => {
            res.send(err);
            console.log("erro");
        });
});

module.exports = movie;
