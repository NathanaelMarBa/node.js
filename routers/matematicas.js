const express = require('express');

const matematicas = require ('../datos/cursos').infocursos.Matematicas;

const routerMatematicas = express.Router();

routerMatematicas.get('/',(req, res) => {
    res.send(JSON.stringify(matematicas));
});

routerMatematicas.get('/:nivel',(req, res) => {
    const nivel = req.params.nivel; //Extraccion del nivel
    const resultados = matematicas.filter(curso => curso.nivel === nivel);

    if(resultados.length === 0){
        return res.status(404).send('No se encontraron cursos de ' + nivel);
    }
    res.send(JSON.stringify(resultados));

});

module.exports = routerMatematicas;