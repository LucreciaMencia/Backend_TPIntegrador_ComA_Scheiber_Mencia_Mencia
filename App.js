const express = require('express');
const Database = require('./database/Database');
const LoginController = require('./controladoras/LoginController')
const RegistroController = require('./controladoras/RegistroController')
const FoodController = require('./controladoras/FoodController')
const RestoController = require('./controladoras/RestoController')
const ComesalesController = require('./controladoras/ComensalesController');
const ValoracionController = require('./controladoras/ValoracionController');
let app = express();
const db = new Database();
const cors = require('cors')
const corsOptions = {origin : 'http://localhost:3000'}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Aca direccionamos a las controladoras
app.use('/sesion',LoginController.router);
//para registrar
app.use('/usuario', RegistroController);
//Fue una prueba.
app.use('/tkn', LoginController.verificarToken);
//esto es para comidas
app.use('/comida', FoodController);
//esto es para restaurantes
app.use('/restaurante',RestoController);
//esto es para comensales 
app.use('/comensal', LoginController.verificarToken,ComesalesController)
//esto es para hacer una valoracion
app.use('/valoracion', ValoracionController);

app.listen(8080);