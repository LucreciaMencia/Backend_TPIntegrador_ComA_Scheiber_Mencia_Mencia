const ValoracionModel = require('./../database/models/ValoracionModel')
class Valoracion{
    #id_usuario
    #id_comida
    #puntaje
    #comentario
//---------------------------------
constructor(){}
//------Getters y setters----------
getIdUsuario() {
    return this.#id_usuario;
}

getIdComida() {
    return this.#id_comida;
}

getPuntaje() {
    return this.#puntaje;
}

getComentario() {
    return this.#comentario;
}

setIdUsuario(id) {
    this.#id_usuario = id;
}

setIdComida(id) {
    this.#id_comida = id;
}

setPuntaje(puntaje){
    this.#puntaje = puntaje; 
}

setComentario(comentario){
    this.#comentario = comentario;
}

//--Cargar valoracion--
async cargarValoracion(){
    let respuesta = await ValoracionModel.CargarValoracion(this.#id_usuario,this.#id_comida,this.#puntaje,this.#comentario)
    if(respuesta){
        return 200;
    }else{
        return 404;
    }    
}


}

module.exports = Valoracion;