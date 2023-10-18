const express = require('express');
const LoginController = require('./LoginController');
const Restaurante = require('../objetos/Restaurante')
const router = express.Router();

//traer todos los restaurantes.
router.get('/', async function (req, res, next){
    let restaurante = new Restaurante();
    let respuesta = await restaurante.traerRestaurantes();
    if(respuesta == null){
        res.status(404).send("Error al traer los restaurantes");
    }else{
        res.status(201).json(respuesta);
    }
})

//traer info de un restaurante JSON {"idRestaurante":"24"}
router.post('/info', async function (req,res,next){
    let restaurante = new Restaurante();
    let respuesta = await restaurante.infoRestaurante(req.body.idRestaurante);
    if(respuesta == null){
        res.status(404).send("Error al intentar recibir la informacion del restaurante");
    }else{
        res.status(201).json(respuesta);
    }
})

//editar al restaurante (se debe probar)
router.post("/editar",LoginController.verificarToken, async function(req,res,next){
    let restaurante = new Restaurante()
    let id = LoginController.extrarId(req.headers.authorization);
    restaurante.setNombreResto(req.body.nombreResto);
    restaurante.setDescripcion(req.body.descripcion);
    restaurante.setContacto(req.body.contacto);
    restaurante.setHorario(req.body.horario);
    restaurante.setUbicacion(req.body.ubicacion);
    let respuesta = await comensal.editarComensal(id);
    if(respuesta == true){
        res.status(201).send("Cambios aplicados.");
    }else{
        res.status(404).send("Error al aplicar los cambios")
    }
})

module.exports = router;