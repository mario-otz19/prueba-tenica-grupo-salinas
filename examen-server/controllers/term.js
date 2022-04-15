const { Term } = require('../models');
const { returnsResponseCode } = require('../helpers');

exports.addTerm = async (req, res) => {
    try {   
        const term = await Term.create({ id: req.body.weeks, ...req.body });
        
        const responseData = {
            msg: 'Se ha registrado un nuevo plazo.',
            data: term
        } 

        returnsResponseCode(res, 200, responseData);
    }
    
    catch (error) {
        returnsResponseCode(res, 500, '');
    }
}

exports.deleteTerm = async (req, res) => {
    try {   
        const { id } = req.params;
        const term = await Term.findOne({ where: { id }});
        await term.destroy();

        const responseData = { 
            msg: 'Se ha eliminado el plazo.'
        } 

        returnsResponseCode(res, 200, responseData);
    }
    
    catch (error) {
        returnsResponseCode(res, 500, '');
    }
}

exports.getTerm = async (req, res) => {
    try { 
        const { id } = req.params;
        const term = await Term.findOne({ where: { id }});
    
        const responseData = {
            msg: 'Detalles del plazo.',
            data: term
        } 

        returnsResponseCode(res, 200, responseData);
    }
    
    catch (error) {
        returnsResponseCode(res, 500, '');
    }
}

exports.getTerms = async (req, res) => {
    try { 
        const terms = await Term.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
    
        const responseData = {
            msg: 'Lista de plazos.',
            data: terms
        } 

        returnsResponseCode(res, 200, responseData);
    }
    
    catch (error) {
        returnsResponseCode(res, 500, '');
    }
}

exports.updateTerm = async (req, res) => {
    try {   
        const { weeks, normal_rate, punctual_rate } = req.body;
        const { id } = req.params;
        const term = await Term.findOne({ where: { id }});

        term.weeks = weeks;       
        term.normal_rate = normal_rate;       
        term.punctual_rate = punctual_rate;       
        
        const updatedTerm = await term.save();

        const responseData = {
            msg: 'Se ha actualizado plazo correctamente.',
            data: updatedTerm
        } 

        returnsResponseCode(res, 200, responseData);
    }
    
    catch (error) {
        returnsResponseCode(res, 500, '');
    }
}