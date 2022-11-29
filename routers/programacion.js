const express = require('express');

const programacion = require ('../datos/cursos').infocursos.programacion;

const routerProgramacion = express.Router();

// Middleware
routerProgramacion.use(express.json());

routerProgramacion.get('/',(req, res) => {
    res.send(JSON.stringify(programacion));
});

routerProgramacion.get('/:lenguaje',(req, res) => {
    const lenguaje = req.params.lenguaje; //Extraccion del lenguaje
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);

    if(resultados.length === 0){
        return res.status(404).send('No se encontraron cursos de ' + lenguaje);
    }

    if (req.query.ordenar === 'vistas'){ //ordenamiento mediante parametros query
       return res.send(JSON.stringify (resultados.sort((a, b) => b.vistas - a.vistas)));
    }

        res.send(JSON.stringify(resultados));

        console.log(req.query.ordenar);

    res.send(JSON.stringify(resultados));

});


routerProgramacion.post('/', (req, res) => {
    let cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion));
});

routerProgramacion.put('/:id', (req, res) => {
    const CursoActualizado = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0){
        programacion[indice] = CursoActualizado;
    }

    res.send(JSON.stringify(programacion));
});

routerProgramacion.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0){
        const cursoaModificar = programacion[indice];
        Object.assign(cursoaModificar, infoActualizada);
    }
    res.send(JSON.stringify(programacion));
});

module.exports = routerProgramacion;