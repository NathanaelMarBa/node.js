const express = require('express');
const app = express();

const {infocursos} = require('./datos/cursos.js');

//Routers

const routerProgramacion = require('./routers/programacion.js')
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas',routerMatematicas);

// Routing

app.get('/', (req, res) => {
    res.send('Mi primer servidor de cursos con express');
});
//Rutas
app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infocursos));
});

const PUERTO = process.env.PORT /*Encuentra el puerto asignado en un servidor*/ || 3000;

app.listen(PUERTO, () => {
    console.log('El servidor esta escuchando en el puerto' + PUERTO + ' ...');
});
