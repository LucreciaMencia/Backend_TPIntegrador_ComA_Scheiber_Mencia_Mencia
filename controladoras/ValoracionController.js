const express = require('express');
const LoginController = require('./LoginController');
const Valoracion = require('../objetos/Valoracion')
const router = express.Router();


//cargar Nueva valoracion -Falta Probar-
router.post('/',LoginController.verificarToken,async (req,res) => {
  /*{
    "idComida":"",
    "estrellas":"",
    }
  */
    let valoracion = new Valoracion();
    valoracion.setIdUsuario(await LoginController.extrarId(req.headers.authorization));
    valoracion.setIdComida(req.body.idComida);
    valoracion.setPuntaje(req.body.estrellas); 
    let respuesta = await valoracion.cargarValoracion();
    if(respuesta == 200){
      res.status(respuesta);
      res.json({"mensaje":"Valoracion cargada"})
    }else{
      res.status(respuesta);
      res.json({"mensaje":"Upss! algo salio mal :("})
    }
    
    
  })

  module.exports = router;