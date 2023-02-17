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
    }, 

    )
    
})


movie.get('/:id', (req, res)=>{
    Movie.findOne({
        where: {id: req.params.id}
    }).then(
        movie => {
            res.json(movie)
            console.log('ok')
        }
    ).catch(err => {
        res.send(err);
        console.log('erro')
    })
})



module.exports = movie