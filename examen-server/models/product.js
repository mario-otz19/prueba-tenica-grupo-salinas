const Sequelize = require('sequelize');
const bd = require('../config/bd');

const Product = bd.define('product', {
    sku: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        unique: {
            args: true,
            msg: 'Ese SKU ya se encuentra registrado'
        }
    },
    name: Sequelize.STRING(60),
    description: Sequelize.STRING(60),
    price: Sequelize.FLOAT,
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Product;