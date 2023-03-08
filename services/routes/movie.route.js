const express = require("express");
const cors = require("cors");
const movie = express.Router();
movie.use(cors());
const Op = require('sequelize');
const Movie = require("../models/movie.model");
const { sequelize, Sequelize } = require("../database/db");
/*
movie.get("/byLimit", (req, res) => {
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
});*/
/*
movie.get("/", (req, res) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  var numRows = sequelize
  .query("SELECT count(*) as numRows FROM movie", {
    type: sequelize.QueryTypes.SELECT,
  })
  .then(function (results) {
    numRows = results[0].numRows;
    console.log(numRows)
  });
  Movie.findAll({ limit: size, offset: page * size })

  
  .then((data) => {
 
    var limite = size;
    console.log("1");
    console.log(size);
    console.log("2");
    console.log(numRows);
    var numPages;
    numPages = numRows / size;
    console.log(numRows / size);
    res.append("X-Total-Count", numRows);
    res.json(data);
  });
});
*/
/*
movie.get("/m", (req, res) => {
  const page = Number.parseInt(req.query.page);
  const size = Number.parseInt(req.query.size);
  let sort = req.query.sort;
  let orderby = req.query.orderby;
  Movie.findAll({limit: size, offset: page * size, sort: sort, orderby: orderby})


    .then((data) => {

      res.json(data);
    });
});*/
/*
movie.get("/allMovies", async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  const sort = req.query.sort;

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }
  let size = 10;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber;
  }

  const movies = await Movie.findAndCountAll({
    limit: size,
    offset: page * size
  });
  let totalPages = movies.count;
  res.append("Access-Control-Expose-Headers", "X-Total-Count");
  res.append("X-Total-Count", totalPages);

  Movie.findAll({
    limit: size,
    offset: page * size,
    order: sort
  })
    .then((data) => {
      res.json(data);
    })



});
*/

movie.get("/m", async (req, res) => {
  const page = Number.parseInt(req.query.page) ? Number.parseInt(req.query.page) : null;
  const size = Number.parseInt(req.query.size) ? Number.parseInt(req.query.size) : null;
  const year = Number.parseInt(req.query.year)
  const column = (req.query.column) ? req.query.column.split(',') : null;
  const where = year ? { year: year } : null
  const order = (column) ? ([[column]]) : null


  Movie.findAll({
    limit: size,
    offset: page * size,
    where,
    order
  })
    .then((data) => {
      res.json(data);
    });
  Movie.count().then(function (count) {
    console.log(count);
    const totalPages = count;
    console.log(totalPages);
  })

});



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


movie.get("/", (req, res) => {
  Movie.findAll()
    .then((data) => {
      res.json(data);

    })
    .catch((err) => {
      res.send(err);
      console.log("erro");
    });
});

module.exports = movie;
