const express = require('express');
const LoginController = require('./LoginController');
const Valoracion = require('../objetos/Valoracion')
const router = express.Router();


//cargar Nueva valoracion -Falta Probar-
router.post('/cargar',LoginController.verificarToken,async (req,res) => {
  /*{
    "idComida":"",
    "puntaje":"",
    "comentario":""
    }
  */
    let valoracion = new Valoracion();
    valoracion.setIdUsuario(LoginController.extrarId(req.headers.authorization));
    valoracion.setIdComida(req.body.idComida);
    valoracion.setPuntaje(req.body.puntaje); 
    valoracion.cargarValoracion(req.body.comentario);
    let respuesta = await valoracion.cargarValoracion();
    if(respuesta == 200){
      res.status(respuesta);
      res.json({"message":"Valoracion cargada"})
    }else{
      res.status(respuesta);
      res.json({"message":"Upss! algo salio mal :("})
    }
    
    
  })