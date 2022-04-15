const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { updateProduct, addProduct, deleteProduct, getProduct, getProducts } = require('../controllers');
const { productExistsBySku, productDontExistsBySku, validPrice, productDontExists } = require('../helpers');

// Obtener productos 
router.get('/', getProducts);

// Obtener producto por SKU / nombre 
router.get('/:search', [
    check('search').custom( productDontExists ),
    fieldsValidator
], getProduct);

// Agregar producto
router.post('/', [
    check('sku', 'El SKU del producto es obligatorio').not().isEmpty(),
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('description', 'La descripción del producto es obligatoria').not().isEmpty(),
    check('price', 'El nombre es obligatorio, debe escribir un precio.').not().isEmpty(),
    check('price', 'El precio del producto no es válido.').isNumeric(),
    check('price').custom( validPrice ), 
    check('sku').custom( productExistsBySku ),
    fieldsValidator
], addProduct);

// Editar producto
router.put('/:sku', [
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('description', 'La descripción del producto es obligatoria').not().isEmpty(),
    check('price', 'El nombre es obligatorio, debe escribir un precio.').not().isEmpty(),
    check('price', 'El precio del producto no es válido.').isNumeric(),
    check('sku').custom( productDontExistsBySku ),
    check('price').custom( validPrice ), 
    fieldsValidator
], updateProduct);

// Eliminar producto
router.delete('/:sku', [
    check('sku').custom( productDontExistsBySku ), 
    fieldsValidator
], deleteProduct);

module.exports = router;