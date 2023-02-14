const express = require('express')
const cors = require("cors")
const movie = express.Router()
movie.use(cors());

const Movie = require('../models/movie.model');
const {sequelize} = require('../database/db')

movie.get('/', (req, res) => {
    Movie.findAll()
    .then((data)=> {
        res.json(data)
        console.log('data returned with success')
    }).catch(err => {
        res.send(err);
    })
})


movie.get('/:id', function (req, res) {
    const id = req.params.id;
    sequelize.query(' SELECT * FROM MOVIE WHERE id='+id+'',   { 
        type: sequelize.QueryTypes.SELECT 
      })
        .then(results=> {
            res.json(results)
           
        }).catch(err => {
            res.send(err);
        })
})

module.exports = movie