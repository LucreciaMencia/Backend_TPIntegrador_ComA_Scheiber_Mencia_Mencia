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

  
  //borrar una valoracion.
    router.delete('/',async (req,res) => {

      let valoracion = new Valoracion();
      let respuesta = valoracion.borrar(req.query.id_valoracion);
      if(respuesta == false){
        res.status(404).send({"mensaje":"Error al borrar la valoración."});
      }else{
        res.status(201).send({"mensaje":"La valoración a sido eliminada exitosamente."});
      } 
  
        
      })


  module.exports = router;