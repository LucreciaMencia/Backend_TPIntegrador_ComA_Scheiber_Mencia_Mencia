class Roll {
    #id_rol
    #nombre_rol

    constructor(){}
    //-------Getters y Setters----------
    getId_rol() {
        return this.#id_rol;
    }

    setId_rol(id) {
        this.#id_rol = id;
        if(id = 1){
            this.#nombre_rol = 'Comensal'
        }else{
            this.#nombre_rol = 'Restaurante'
        }
    }


    
}

module.exports = Roll;