const Database = require('../Database');

class ComensalController {
  static async registrarComensal(usuarioId, nombre, apellido) {
    return new Promise((resolve, reject) => {
      let db = new Database();
      let $query = 'INSERT INTO comensal (id_usuario,nombre_comensal,apellido_comensal,puntos_disp) VALUES (?,?,?,?)';
      db.getConexion().query($query, [usuarioId, nombre, apellido, '0'], function (err, rows, fields) {
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

  static async verInfo(id){
    return new Promise((resolve, reject) => {
      let db = new Database();
      let $query = 'SELECT nombre_comensal, apellido_comensal FROM comensal WHERE id_usuario=?';
      db.getConexion().query($query, id, function (err, rows, fields) {
        if (err) {
          console.log(err);
          resolve(null);
        } else {
          //True significa que el registro fue exitoso
          resolve(rows);
        }
      });
    });
  }

  static async modificar(id,nombre,apellido){
    return new Promise((resolve, reject) => {
      let db = new Database();
      let $query = 'UPDATE comensal SET nombre_comensal = ? , apellido_comensal = ? WHERE id_usuario = ?';
      db.getConexion().query($query, [nombre, apellido, id], function (err, rows, fields) {
        if (err) {
          //False significa un error en la conexion a la DB
          console.log(err);
          resolve(false);
        } else {
          //True significa que la modificacion fue exitosa 
          resolve(true);
        }
      });
    });
  }
}

module.exports = ComensalController;