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

//traer info de un restaurante
router.get('/:id', async function (req,res,next){
    let restaurante = new Restaurante();
    let respuesta = await restaurante.infoRestaurante(req.params.id);
    if(respuesta == null){
        res.status(404).send("Error al intentar recibir la informacion del restaurante");
    }else{
        res.status(201).json(respuesta);
    }
})

//editar al restaurante (se debe probar)
router.post("/editar",LoginController.verificarToken, async function(req,res,next){
    let restaurante = new Restaurante()
    let id = await LoginController.extrarId(req.headers.authorization);
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

//traer comidas de un restaurante
router.get("/menu",async function(req,res,next){
    let restaurante = new Restaurante();
    restaurante.getUsuario().setId_usuario(req.query.id_restaurante);
    let respuesta = await restaurante.mostrarMenu();
    if(respuesta.message == null){
        res.status(201).send(respuesta);
    }else{
        res.status(404).json(respuesta);
    }
    
})

module.exports = router;