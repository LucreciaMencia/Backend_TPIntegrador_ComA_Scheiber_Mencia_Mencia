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
        let $query = 'SELECT comida.id_comida, nombre_comida, precio_comida, descripcion_comida, promedio_estrellas, nombre_resto FROM comida INNER JOIN restaurante ON restaurante.id_usuario=comida.id_usuario INNER JOIN valoracion ON valoracion.id_comida=comida.id_comida INNER JOIN comensal ON comensal.id_usuario=valoracion.id_usuario AND comensal.id_usuario=?';
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