const express = require('express');
const Usuario = require('../objetos/Usuario');
const Comida = require('../objetos/Comida');
const Respuesta = require('../objetos/Respuesta');
const LoginController = require('./LoginController');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
          cb(null, 'Backend/Comidas'); // Carpeta donde se guardarán las imágenes
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      });
const upload = multer({ storage });

//Cargar una nueva comida
router.post('/cargar',LoginController.verificarToken,async (req,res) => {
  let comida = new Comida();
  comida.setIdUsuario(LoginController.extrarId(req.headers.authorization));
  comida.setNombre(req.body.nombre);
  comida.setDescripcion(req.body.descripcion);
  comida.setPrecio(req.body.precio);
  let respuesta = await comida.registrarComida();
  if( respuesta == null){
    res.status(401);
    res.send("No se pudo registrar la comida")
  }else{
    res.status(201);
    res.send(respuesta);
  }; 
  
})

//Carga la imagen de una nueva comida - LA IMAGEN DEBE SER .JPEG
router.post("/imagen",LoginController.verificarToken, upload.single('image'),async (req,res) => {
  res.send('Imagen recibida y guardada');
})

//se debe recibir un json {"idComida" : "numeroIdComida"}
router.post("/image/descargar",async(req,res) => {
  let imagen = "Backend/Comidas/" + req.body.idComida +".jpeg";
  console.log(imagen);
  fs.readFile(imagen, (err, data) => {
    if (err) {
      console.error('Error al leer la imagen:', err);
      res.status(500).send('Error al cargar la imagen');
    } else {
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.end(data);
    }
  });
}); 

//



module.exports = router;