const express = require('express');
const Usuario = require('../objetos/Usuario');
const Comensal = require('../objetos/Comensal');
const Restaurante = require('../objetos/Restaurante');
const Respuesta = require('../objetos/Respuesta');
const router = express.Router();

//la consulta esta en el postman. Carpeta registro => crear usuario
router.post('/', async function(req,res,next){
  let usuario = new Usuario();
  usuario.setNickname(req.body.nickname);
  usuario.setMail(req.body.mail);
  usuario.setPassword(req.body.password);
  usuario.setRol(req.body.rol);
  let respuesta = await usuario.crearUsuario();
  res.status(respuesta.status).send(respuesta.aclaracion);
})

//Esto es para registrar un comensal
router.post('/comensal', async function(req,res,next){   
/*{ 
  "nickname": "juampi1f0",
  "mail": "menciajp_27@gmail.com",
  "password": "12356",
  "nombre": "Juan",
  "apellido":"mencia"
}*/
    let usuario = new Usuario();
    let comensal = new Comensal();
    usuario.setNickname(req.body.nickname);
    usuario.setMail(req.body.mail);
    usuario.setPassword(req.body.password);
    usuario.setRol(1);
    comensal.setNombre(req.body.nombre);
    comensal.setApellido(req.body.apellido);
    comensal.setUsuario(usuario);
    let respuesta = new Respuesta();
    respuesta = await comensal.registrarComensal();
    res.status(respuesta.status);
    res.send(respuesta.aclaracion);


})

//Esto es para registrar un restaurante
router.post('/restaurante', async function(req, res, next){
/*{ 
"nickname": "Pizzerio",
"mail": "menciajp_27@gmail.com",
"password": "12356",
"nombreResto":"pizzas pizzas",
"descripcion":"las mejores pizzas"
"horario":"de 8 a 20"
"contacto":"37648554458"
"ubicacion":"marconi 3329"
}*/
    let usuario = new Usuario();
    let restaurante = new Restaurante();
    usuario.setNickname(req.body.nickname);
    usuario.setMail(req.body.mail);
    usuario.setPassword(req.body.password);
    usuario.setRol(2);
    restaurante.setNombreResto(req.body.nombre);
    restaurante.setDescripcion(req.body.descripcion);
    restaurante.setHorario(req.body.horario);
    restaurante.setContacto(req.body.contacto);
    restaurante.setUbicacion(req.body.ubicacion);
    restaurante.setUsuario(usuario);
    let respuesta = new Respuesta();
    respuesta = await restaurante.registrarRestaurante();
    res.status(respuesta.status);
    res.send(respuesta.aclaracion);
    
})

module.exports = router;