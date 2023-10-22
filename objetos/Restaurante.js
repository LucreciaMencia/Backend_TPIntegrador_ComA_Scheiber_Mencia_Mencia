let Usuario = require('./Usuario');
let Respuesta = require('./Respuesta');
let RestauranteModel = require('../database/models/RestauranteModel')
class Restaurante{
    #usuario = new Usuario();
    #nombre_resto;
    #descripcion_resto;
    #horario;
    #contacto;
    #ubicacion;
    #valoracion_resto;

    constructor(){};

  //-------Getters y Setters----------
  setUsuario(usuario){
    this.#usuario = usuario;
  }

  getUsuario(){
    return this.#usuario;
  }

  setNombreResto(nombre){
    this.#nombre_resto = nombre;
  }

  getNombre(){
    return this.#nombre_resto;
  }

  setDescripcion(descripcion) {
    this.#descripcion_resto = descripcion;
  }

  getDescripcion() {
    return this.#descripcion_resto;
  }

  setHorario(horario) {
    this.#horario = horario;
  }

  getContacto() {
    return this.#contacto;
  }

  setContacto(contacto) {
    this.#contacto = contacto;
  }

  setUbicacion(ubicacion){
    this.#ubicacion = ubicacion;
  }

  getUbicacion(){
    return this.#ubicacion;
  }

  setValoracion(valoracion){
    this.#valoracion_resto = valoracion;
  }

  getValoracion(){
    return this.#valoracion_resto;
  }

//-----------Registrar restaurante---------
async registrarRestaurante(){
    let respuesta = new Respuesta();
    respuesta = await this.#usuario.crearUsuario();
    if(respuesta.getStatus() == 404){
        return respuesta;
    }else{
        let id = await this.#usuario.verificarUsuario(this.#usuario.getNickname(),this.#usuario.getPassword());
        this.#usuario.setId_usuario(id.idUsuario)
        let estadoDeAlta = await RestauranteModel.registrarRestaurante(this.#usuario.getId_usuario(),this.#nombre_resto,this.#descripcion_resto,this.#horario,this.#contacto,this.#ubicacion)
        if(estadoDeAlta === true){
            respuesta.status = 200;
            respuesta.aclaracion = {"ok" : true}
        }else{
            respuesta.status = 404;
            respuesta.aclaracion = {"message" : "Error al registrar el restaurante"}
        }
        return respuesta;
    }
}
//-Traer la informacion del restaurante----
async infoRestaurante(id){
 let respuesta = await RestauranteModel.traerRestaurante(id);
 if(respuesta == null){
  return respuesta;
 }else{
  return respuesta;
 }
}

//---------Traer todos los restaurantes----
async traerRestaurantes(){
  let respuesta = await RestauranteModel.traerTodosRestaurantes();
  if(respuesta == null){
    return null; 
  }else{
    return respuesta;
  }
}
//---------Traer menu del restaurante-------------
async mostrarMenu(){
  let respuesta = await RestauranteModel.traerMenu(this.#usuario.getId_usuario());
  if(respuesta == false){
    return {"message":"El restaurante no tiene comidas cargadas."};
  }else {
    return respuesta;
  }
}
//--------Editar restaurante (falta terminar)--------------
async editarRestaurante(id){
  return await RestauranteModel.modificar(id, this.#nombre_resto, this.#descripcion_resto, this.#horario, this.#contacto, this.#ubicacion);
}
}

module.exports = Restaurante;