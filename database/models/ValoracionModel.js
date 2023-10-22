const Database = require('../Database');

class ValoracionModel{
    static async cargarValoracion(idUsuario,idComida,puntaje){
        return new Promise((resolve, reject) => {
            let db = new Database();
            let $query = 'INSERT INTO valoracion (id_usuario, id_comida, puntaje) VALUES (?, ?, ?)';
            db.getConexion().query($query, [idUsuario, idComida,puntaje], function (err, rows, fields) {
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

    static async valoracionesComensal(idComensal){
      return new Promise((resolve, reject) => {
        let db = new Database();
        let $query = 'SELECT * FROM valoracion WHERE id_usuario = ? ';
        db.getConexion().query($query, idComensal, function (err, rows, fields) {
          if (err) {
            //False significa un error en la conexion a la DB
            console.log(err);
            console.log(idComensal);
            resolve(false);
          } else {
            resolve(rows);
          }
        });
      });
    }

    static async borrar(idComensal){
      return new Promise((resolve, reject) => {
        let db = new Database();
        let $query = ' DELETE FROM valoracion WHERE id_valoracion = ? ';
        db.getConexion().query($query, idComensal, function (err, rows, fields) {
          if (err) {
            //False significa un error en la conexion a la DB
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    }
}
module.exports = ValoracionModel;