
const express = require('express');
const Usuario = require('../objetos/Usuario');
const Respuesta = require('../objetos/Respuesta')
const jwt = require('jsonwebtoken');
const clave = "miMenu";
const router = express.Router();

// Maneja la ruta /login
router.get('/', (req, res) => {
  // Tu lógica de inicio de sesión aquí
  res.send('Página de inicio de sesión');
});

router.post('/', async function (req, res, next) {
  //nickname y password es porque en el json que envio estan esos parametros
  //{"nickname":"juan" , "password":"1234"}
  let usuario = new Usuario();
  usuario.setNickname(req.body.nickname);
  usuario.setPassword(req.body.password);
  usuario = await usuario.verificarUsuario();
  if (usuario != null) {
    res.status(200);
    let nombreRol
    if (usuario.rol == 1) {
      nombreRol = 'comensal'
    } else {
      nombreRol = 'restaurante'
    }
    const respuesta = {
      token: generarToken(usuario.idUsuario),
      rol: nombreRol,
      ok: true
    }
    res.json(respuesta);
  } else {
    res.status(404);
    res.json({ "message": "Contraseña o Usuario incorrecto" })
  }

})

router.post('/registro', async function (req, res, next) {
  //En este caso el json debe contener rol, nickname, email y password
  //{"nickname":"juan423" , "password":"1234", "rol" : {"id_rol": 1,"nombre_rol": "Comensal"}, "mail" : "juan@gmoail.com"}
  let usuario = new Usuario();
  usuario.getRol().setId_rol(req.body.rol.id_rol);
  usuario.setNickname(req.body.nickname);
  usuario.setPassword(req.body.password);
  usuario.setMail(req.body.mail);
  let respuesta = new Respuesta();
  respuesta = await usuario.crearUsuario();
  console.log(respuesta.status);
  res.send(respuesta.aclaracion);
})

function generarToken(id) {
  let User = new Usuario();
  User.setId_usuario(id);

  const options = {
    expiresIn: '24h', // Tiempo de expiración del token (por ejemplo, 1 hora)
  };

  return jwt.sign(User.toJSON(), clave, options);
}

function verificarToken(req, res, next) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  const token = bearerToken.split(' ')[1];

  jwt.verify(token, clave, (error, decoded) => {
    if (error) {
      return res.status(403).json({ mensaje: 'Token no válido' });
    }

    // Si el token es válido, puedes acceder a la información del usuario en decoded
    console.log(decoded);
    next();
  });
}

function extraerId(tkn) {
  const promise = new Promise((resolve, reject) => {
    const token = tkn.split(' ')[1];

    jwt.verify(token, clave, (error, decoded) => {
      if (decoded != undefined) {
        resolve(decoded.id_usuario);
      } else {
        reject(error);
      }
    });
  })

  return promise;
}


module.exports = {
  router: router,
  verificarToken: verificarToken,
  extrarId: extraerId,
};