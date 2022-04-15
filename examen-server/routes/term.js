const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { addTerm, deleteTerm, getTerm, getTerms, updateTerm } = require('../controllers');
const { termDontExist, existTerm, validaRate, validWeeks } = require('../helpers');

// Agregar plazo
router.post('/', [
    check(['weeks', 'normal_rate', 'punctual_rate'], 'Todos los campos son obligatorios').not().isEmpty(),
    check('weeks', 'El valor de las semanas no es válido.').isNumeric(),
    check('normal_rate', 'El valor de la tasa normal no es válido.').isNumeric(),
    check('punctual_rate', 'El valor de la tasa puntual no es válido.').isNumeric(),
    check('weeks').custom( validWeeks ),
    check('weeks').custom( existTerm ),
    check('normal_rate').custom( validaRate ), 
    check('punctual_rate').custom( validaRate ), 
    fieldsValidator
], addTerm);

// Eliminar plazo
router.delete('/:id', [
    check('id', 'El id del plazo no es válido.').isNumeric(),
    check('id').custom( termDontExist ), 
    fieldsValidator
], deleteTerm);

// Obtener plazo por ID 
router.get('/:id', [
    check('id', 'El id del plazo no es válido.').isNumeric(),
    check('id').custom( termDontExist ),
    fieldsValidator
], getTerm);

// Obtener plazos 
router.get('/', getTerms);

// Editar plazo
router.put('/:id', [
    check('id', 'El id del plazo no es válido.').isNumeric(),
    check(['normal_rate', 'punctual_rate'], 'Todos los campos son obligatorios').not().isEmpty(),
    check('normal_rate', 'El valor de la tasa normal no es válido.').isNumeric(),
    check('punctual_rate', 'El valor de la tasa puntual no es válido.').isNumeric(),
    check('id').custom( termDontExist ),
    check('normal_rate').custom( validaRate ), 
    check('punctual_rate').custom( validaRate ),
    fieldsValidator
], updateTerm);

module.exports = router;