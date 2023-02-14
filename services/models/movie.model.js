var Sequelize = require('sequelize');
const db = require("../database/db");


module.exports = db.sequelize.define('movie', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    title:{
        type:Sequelize.STRING,
        allowNull: false
    },
    year:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    rank:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    revenue:{
        type:Sequelize.DOUBLE,
        allowNull: false
    },
    genre:{
        type:Sequelize.STRING,
        allowNull: false
    },
    description:{
        type:Sequelize.STRING,
        allowNull: false
    },
    director:{
        type:Sequelize.STRING,
        allowNull: false
    },
    actors:{
        type:Sequelize.STRING,
        allowNull: false
    },
    runtime:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    rating:{
        type:Sequelize.DOUBLE,
        allowNull: false
    },
    votes:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    metascore:{
        type:Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'movie'
})