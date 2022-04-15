const { Op } = require("sequelize");
const { Product } = require('../models');
const { returnsResponseCode } = require('../helpers');

exports.addProduct = async (req, res) => {
    try {   
        const product = await Product.create(req.body);
        
        const responseData = {
            ok: true,
            msg: 'Se ha registrado un nuevo producto.',
            data: product
        } 

        returnsResponseCode(res, 200, responseData);
    }
    
    catch (error) {
        returnsResponseCode(res, 500, '');
    }
}

exports.deleteProduct = async (req, res) => {
    try {   
        const { sku } = req.params;
        const product = await Product.findOne({ where: { sku }});
        await product.destroy();

        const responseData = {
            ok: true, 
            msg: 'Se ha eliminado el producto.'
        } 

        returnsResponseCode(res, 200, responseData);
    }
    
    catch (error) {
        returnsResponseCode(res, 500, '');
    }
}

exports.getProduct = async (req, res) => {
    try { 
        const { search } = req.params;
        const product = await Product.findAll({
        where: {
            [Op.or]: [
                { sku: search },
                { name: {
                    [Op.startsWith]: `${search}`
                }}
            ]
        }
    });
    
        const responseData = {
            ok: true,
            msg: 'Detalles del producto.',
            data: product
        } 

        returnsResponseCode(res, 200, responseData);
    }
    
    catch (error) {
        returnsResponseCode(res, 500, '');
    }
}

exports.getProducts = async (req, res) => {
    try { 
        const products = await Product.findAll();
    
        const responseData = {
            ok: true,
            msg: 'Lista de productos.',
            data: products
        } 

        returnsResponseCode(res, 200, responseData);
    }
    
    catch (error) {
        returnsResponseCode(res, 500, '');
    }
}

exports.updateProduct = async (req, res) => {
    try {   
        const { description, name, price } = req.body;
        const { sku } = req.params;
        const product = await Product.findOne({ where: { sku }});

        product.description = description;       
        product.name = name;       
        product.price = price;       
        
        const updatedProduct = await product.save();

        const responseData = {
            ok: true,
            msg: 'Se ha actualizado producto correctamente.',
            data: updatedProduct
        } 

        returnsResponseCode(res, 200, responseData);
    }
    
    catch (error) {
        returnsResponseCode(res, 500, '');
    }
}