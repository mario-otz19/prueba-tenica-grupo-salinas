const { Op } = require("sequelize");
const { Product, Term } = require('../models');

// Validar si el producto existe por SKU
const productExistsBySku = async (sku) => {
    const existProduct = await Product.findOne({ where: { sku }});
    
    if (existProduct) {
        throw new Error(`El producto ya se encuentra registrado, favor de revisar el SKU.`);     
    }
}

// Validar si el producto no existe por SKU / Nombre
const productDontExists = async (search) => {
    // const searchProduct = search.toLocaleLowerCase();

    const existProduct = await Product.findAll({
        where: {
            [Op.or]: [
                { sku: search },
                { name: {
                    [Op.startsWith]: `${search}`
                }}
            ]
        }
    });
    
    if (existProduct.length === 0) {
        throw new Error(`El producto no se encuentra registrado, favor de revisar el SKU o el nombre.`);     
    }
}

// Validar si el producto no existe por SKU
const productDontExistsBySku = async (sku) => {
    const existProduct = await Product.findOne({ where: { sku }});
    
    if (!existProduct) {
        throw new Error(`El producto no se encuentra registrado, favor de revisar el SKU.`);     
    }
}

// Valida precio del producto
const validPrice = async (amount = 0) => {
    if(amount < 1) {    
        throw new Error(`El precio que se la ha asignado al producto es incorrecto, por favor ingresa un nuevo precio.`);     
    }
}

// Valida semasnas
const validWeeks = async (week = 0) => {
    if(week < 1) {    
        throw new Error(`La semana que desea capturar es incorrecta, por favor verifique.`);     
    }
}

// Validar si el plazo no existe
const existTerm = async (id) => {
    const existTerm = await Term.findOne({ where: { id }});
    
    if (existTerm) {
        throw new Error(`El plazo ya se encuentra registrado.`);     
    }
}

// Validar si el plazo existe
const termDontExist = async (id) => {
    const existTerm = await Term.findOne({ where: { id }});
    
    if (!existTerm) {
        throw new Error(`El plazo no se encuentra registrado.`);     
    }
}

// Valida tasa
const validaRate = async (rate = 0) => {
    if(rate < 0) {    
        throw new Error(`La tasa que desea capturar es incorrecta, por favor verifique.`);     
    }
}

module.exports = {
    existTerm,
    productDontExists,
    productDontExistsBySku,
    productExistsBySku,
    termDontExist,
    validPrice,
    validWeeks,
    validaRate
}