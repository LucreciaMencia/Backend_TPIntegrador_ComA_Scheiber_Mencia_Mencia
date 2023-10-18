const Database = require('../Database');

class ValoracionModel{
    static async cargarValoracion(idUsuario,idComida,puntaje,comentario){
        return new Promise((resolve, reject) => {
            let db = new Database();
            let $query = 'INSERT INTO valoracion (id_usuario,id_comida,puntaje,comentario) VALUES (?,?,?,?)';
            db.getConexion().query($query, [idUsuario, idComida,puntaje,comentario], function (err, rows, fields) {
              if (err) {
                //False significa un error en la conexion a la DB
                console.log(err);
                resolve(false);
              } else {
                //True significa que el registro fue exitoso
                resolve(true);
              }
            });
          });
    }
}
module.exports = ValoracionModel;