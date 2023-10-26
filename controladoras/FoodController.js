const express = require('express');
const Usuario = require('../objetos/Usuario');
const Comida = require('../objetos/Comida');
const Respuesta = require('../objetos/Respuesta');
const LoginController = require('./LoginController');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const multer = require('multer');
require('dotenv').config() // se necesita este import en cada archivo donde necesite leer algo del archivo .env

//MM-65
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
          cb(null, process.env.RUTA_IMAGENES_CARGADAS); // Carpeta donde se guardarán las imágenes
        },
        filename: (req, file, cb) => {
          cb(null, req.params.id + ".jpeg");
        },
      });
const upload = multer({ storage });

//Cargar una nueva comida
router.post('/cargar',LoginController.verificarToken,async (req,res) => {
  let comida = new Comida();
  comida.setIdUsuario(await LoginController.extrarId(req.headers.authorization));
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
router.post("/imagen/:id", LoginController.verificarToken, upload.single('image'), async (req,res) => {
  res.send('Imagen recibida y guardada');
})

//MM-33
router.get("/imagen/:id",async(req,res) => {
  let imagen = process.env.RUTA_IMAGENES_CARGADAS+"/"+req.params.id +".jpeg";
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

//--Traer datos de una comida MM-37
router.get("/",async(req,res) => {
  let comida = new Comida();
  let respuesta = await comida.mostrar(req.query.id_comida);
  if(respuesta.mensaje == null){
    res.status(201).send(respuesta);
  }else{
    res.status(404).send(respuesta);
  }
}); 

//--Editar los datos de una comida MM-38
router.put("/:id_comida",async(req,res) => {
  let comida = new Comida();
  comida.setNombre(req.body.nombre);
  comida.setPrecio(req.body.precio);
  comida.setDescripcion(req.body.descripcion)
  comida.setIdComida(req.params.id_comida)
  let respuesta =await comida.editar();
  if(respuesta == true){
    res.status(201).send({"mensaje":"La edición se ejecuto correctamente."});
  }else{
    res.status(404).send({"mensaje":"Error al editar."});
  }
}); 

//--Eliminar comida 
router.delete("/:id",async(req,res) => {
  let comida = new Comida();
  let respuesta = await comida.eliminar(req.params.id);
  if(respuesta == true){
    res.status(201).send({"mensaje":"La comida se elimino correctamente"});
  }else{
    res.status(404).send({"mensaje":"Error al eliminar."});
  }
}); 

//--MM-57
router.get("/all",async(req,res)=>{
  let comida = new Comida();
  let respuesta = await comida.traerTodas();
  if(respuesta == false){
    res.status(404).send({"mensaje":"Error."});
  }else{
    res.status(201).send(respuesta);
  }
})


module.exports = router;