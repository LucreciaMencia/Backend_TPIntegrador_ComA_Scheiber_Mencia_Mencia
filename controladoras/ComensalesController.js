const express = require('express');
const LoginController = require('./LoginController');
const Comensal = require('../objetos/Comensal');
const Usuario = require('../objetos/Usuario')
const router = express.Router();

//ver info del comensal
router.get('/:id', async function (req, res, next){
    let comensal = new Comensal();
    let respuesta = await comensal.infoComensal(req.params.id);
    if(respuesta == null){
        res.status(401);
        res.send('Error en lectura de informacion del comensal.')
    }else{
        res.status(201);
        res.json(respuesta);
    }
})

//editar informacion comensal (Falta probar.)
router.put("/:id", async function(req,res,next){
    let comensal = new Comensal();
    let id = req.params.id;
    comensal.setNombre(req.body.nombre);
    comensal.setApellido(req.body.apellido);
    let respuesta = await comensal.editarComensal(id);
    if(respuesta == true){
        res.status(201).send("Cambios aplicados.");
    }else{
        res.status(404).send("Error al aplicar los cambios")
    }
})
module.exports = router;