let Usuario = require('./Usuario');
let Respuesta = require('./Respuesta');
let ComensalModel = require('../database/models/ComensalModel')

class Comensal{
    
    #usuario = new Usuario();
    #nombre_comensal;
    #apellido_comensal;
    #puntos_disp;

    constructor(){}
    //-------Getters y Setters----------
    setUsuario(usuario) {
        this.#usuario = usuario;
    }

    setNombre(nombre) {
        this.#nombre_comensal = nombre;
    }

    setApellido(apellido) {
        this.#apellido_comensal = apellido;
    }

    setPuntosDips(puntos){
        this.#puntos_disp = puntos;
    }
    getUsuario() {
        return this.#usuario;
    }

    getNombre() {
        return this.#nombre_comensal;
    }

    getApellido() {
        return this.#apellido_comensal;
    }

    getPuntosDips(){
        return this.#puntos_disp;
    }
//-----------Registrar comensal---------
    async registrarComensal(){
        let respuesta = new Respuesta()
        respuesta = await this.#usuario.crearUsuario();
        if(respuesta.getStatus() == 404){
            return respuesta;
        }else{
            let id = await this.#usuario.verificarUsuario(this.#usuario.getNickname(),this.#usuario.getPassword());
            let estadoDeAlta = await ComensalModel.registrarComensal(id.idUsuario,this.#nombre_comensal,this.#apellido_comensal);
            if(estadoDeAlta === true){
                respuesta.status = 200;
                respuesta.aclaracion = {"ok" : true};
                return respuesta   
            }else{
                respuesta.status = 404;
                respuesta.aclaracion = "error al registrar al comensal"
            }
            return respuesta;
        }
    }
//----Ver informacion del comensal------
    async infoComensal(id){
        let respuesta = ComensalModel.verInfo(id);
        if(respuesta == null){
            return null
        }else{
            return respuesta;
        }
    }
//----Editar comensal------
    async editarComensal(id){
        let respuesta = await ComensalModel.modificar(id,this.#nombre_comensal,this.#apellido_comensal);
        return respuesta;
    }

}
module.exports = Comensal;