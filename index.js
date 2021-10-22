const mongoose = require('mongoose');
require('./config/db');

require('dotenv').config({ path : 'variables.env'});
const express = require('express');
const routes = require('./routes/web');
const bodyParser = require('body-parser');

const cors = require('cors');


const app = express();
app.use(cors());
// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar carpeta publica
app.use( express.static('uploads') );


app.use('/', routes() );


// Arrancar la app


// Puerto de la app
const port = process.env.PORT || 4000;

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})