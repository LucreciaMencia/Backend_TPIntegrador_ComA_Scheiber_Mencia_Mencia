const express = require('express');
const Usuario = require('../objetos/Usuario')
const router = express.Router();

// MM - 31
router.get('/:id', async function(req,res,next){
    let usuario = new Usuario();
    usuario.setId_usuario(req.params.id);
    let respuesta = await usuario.traerUsuario();
    if (respuesta.mensaje == null){
        res.status(201).send(respuesta);
    }else{
        res.status(404).send(respuesta);
    }
})

//MM - 32 
router.put('/:id',async function(req,res,next){
    let usuario = new Usuario();
    usuario.setId_usuario(req.params.id);
    usuario.setNickname(req.body.nickname);
    usuario.setMail(req.body.mail);
    usuario.setPassword(req.body.password);
    let respuesta = await usuario.actualizarUsuario();
    if (respuesta.mensaje == null){
        res.status(201).send(respuesta);
    }else{
        res.status(404).send(respuesta);
    }
})

module.exports = router;