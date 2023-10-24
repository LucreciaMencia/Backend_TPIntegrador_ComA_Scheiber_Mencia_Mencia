
const UsuarioModel = require('../database/models/UsuarioModel')
const Rol = require('./Roll');
const Respuesta = require('./Respuesta');

class Usuario{
    #id_usuario
    #rol = new Rol();
    #nickname
    #mail
    #password

    //----------------------------------
    constructor(){}
    //-------Getters y Setters----------
    getId_usuario() {
        return this.#id_usuario;
    }

    getNickname() {
        return this.#nickname;
    }

    getPassword() {
        return this.#password;
    }

    getRol() {
        return this.#rol;
    }
    
    setId_usuario(id){
        this.#id_usuario = id;
    }

    //Para que funcione correctamente se debe pasar el parametro 1 o 2.
    setRol(id){
        this.#rol.setId_rol(id);
    }

    setNickname(nickname){
        this.#nickname = nickname;
    }

    setMail(mail){
        this.#mail = mail;
    }

    setPassword(password){
        this.#password = password;
    }


    async verificarUsuario(){
        let retorno = await UsuarioModel.login(this.#nickname, this.#password);
        if(retorno == null){
            return null;
        }else{
            return retorno;
        }       
    }

    //necesita del usuario id_rol, nickname, password, mail
    async crearUsuario(){
        let retorno = await UsuarioModel.registro(this.#rol.getId_rol(),this.#nickname, this.#mail,this.#password);
        let respuesta = new Respuesta();
        switch(retorno){
            case 0:
                respuesta.status = 404;
                respuesta.aclaracion = {"message" : "Error al  conectarse con la db"};
                return respuesta;
            case 1:
                respuesta.status = 404;
                respuesta.aclaracion = {"message" : "El nickname ya esta en uso"};
                return respuesta;
            case 2:
                respuesta.status = 404;
                respuesta.aclaracion = {"message" : "El mail ya esta en uso."};
                return respuesta;    
            default:
                respuesta.status = 200;
                respuesta.aclaracion = {"ok" : true};
                return respuesta                              
        }
    }
    //---------Traer datos del usuario------------
    async traerUsuario(){
        let respuesta = await UsuarioModel.traerInfo(this.#id_usuario);
        if(respuesta == false){
            return {"mensaje":"no se encontro registro"}
        }else{
            return respuesta
        }
    }
    //-----------Actualizar usuario---------------
    async actualizarUsuario(){
        let respuesta = await UsuarioModel.actualizar(this.#id_usuario,this.#nickname,this.#mail,this.#password);
        if(respuesta == true){
            return {"mensaje":"Exito al actualizar."}
        }else{
            return {"mensaje":"Error al actualizar."}
        }

    }

   toJSON(){
        let usuario = {
            'id_usuario' : this.#id_usuario, 
            'id_rol' : this.#rol.getId_rol(),
        }
        return usuario;
    }

}

module.exports = Usuario;