const express = require('express');
const path = require('path');
require('dotenv').config(); //Lee las variables de entorno

const app = express();

//Carpeta pública
const publicPath = path.resolve( __dirname, 'public');
app.use( express.static( publicPath ));

app.listen( process.env.PORT, ( err ) => {

    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ process.env.PORT}`);

});
