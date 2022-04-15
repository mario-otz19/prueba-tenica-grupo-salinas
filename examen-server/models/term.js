const Sequelize = require('sequelize');
const bd = require('../config/bd');

const Term = bd.define('term', {
    id: {
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    weeks: Sequelize.FLOAT,
    normal_rate: Sequelize.FLOAT,
    punctual_rate: Sequelize.FLOAT
});

module.exports = Term;