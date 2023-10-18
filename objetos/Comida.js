let Usuario = require('./Usuario');
let Respuesta = require('./Respuesta');
let ComidaModel = require('./../database/models/ComidaModel')

class Comida{
    #id_comida;
    #id_usuario;
    #precio_comida;
    #nombre_comida;
    #descripcion_comida;
    #promedio_estrellas;

    constructor(){};

    //-------Getters y Setters----------
    getIdComida() {
        return this.#id_comida;
    }

    getIdUsuario(){
        return this.#id_usuario;
    }


    getPrecio() {
        return this.#precio_comida;
    }

    getNombre() {
        return this.#nombre_comida;
    }

    getDescripcion() {
        return this.#descripcion_comida;
    }

    getPromedio() {
        return this.#promedio_estrellas;
    }

    setIdComida(id) {
        this.#id_comida = id;
    }

    setIdUsuario(usuario){
        this.#id_usuario = usuario;
    }


    setPrecio(precio) {
        this.#precio_comida = precio;
    }

    setNombre(nombre) {
        this.#nombre_comida = nombre;
    }

    setDescripcion(descripcion) {
        this.#descripcion_comida = descripcion;
    }

    setPromedio(promedio) {
        this.#promedio_estrellas = promedio;
    }

    //--------------------------------------------------
    async registrarComida() {
        let respuesta = await ComidaModel.cargarComida(this.#id_usuario,this.#precio_comida,this.#nombre_comida,this.#descripcion_comida);
        if( respuesta == null){
            return null;         
        }else{
            return respuesta;
        }
    }  
    
    
}

module.exports = Comida;