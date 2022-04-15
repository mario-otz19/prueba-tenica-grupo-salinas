require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const dbConnection = require('./config/bd');
const product = require('./routes/product');
const term = require('./routes/term');

const server = async() => {
    try {
        // Conectar y sincronuizar con la bd
        
        dbConnection.sync()
            .then(() => console.log('¡Conectado a la base de datos! :v'))
            .catch((error) => console.log('Error: ', error));

        app.use(cors()); // Habilita el CORS (Intercambio de recursos de origen cruzado)
        app.use(express.json()); // Para parseo a JSON

        app.use(express.static('public'));

        // Rutas o endpoints
        app.use('/api/product', product);
        app.use('/api/term', term);

        // Escucha por el puerto que se configuró en variables de entorno
        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto: ${ process.env.PORT }`);
        });        
    } 
    
    catch (error) {
        console.log('Algo salió mal al arrancar el servidor, favor de contactar al admin. :(');    
        console.log(error);    
    }
}

module.exports = {
    server
}
