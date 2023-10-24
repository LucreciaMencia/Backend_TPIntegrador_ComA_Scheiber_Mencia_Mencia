const Database = require('../Database');

class RestauranteController {
  static async registrarRestaurante(usuarioId, nombre, descripcion, horario, contacto, ubicacion) {
    return new Promise((resolve, reject) => {
      let db = new Database();
      let $query = 'INSERT INTO restaurante (id_usuario, nombre_resto, descripcion_resto, horario, contacto, ubicacion, valoracion_resto) VALUES (?,?,?,?,?,?,?)';
      db.getConexion().query($query, [usuarioId, nombre, descripcion, horario, contacto, ubicacion, 0], function (err, rows, fields) {
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

  static async traerRestaurante(restauranteId){
    return new Promise((resolve,reject)=>{
      let db = new Database();
      let $query = "SELECT * FROM restaurante WHERE id_usuario=?;"
      db.getConexion().query($query, restauranteId, function(err, rows, fields){
        if(err){
          resolve (null) 
        }else{
          resolve (rows)
        }
      })

    })
  }

  static async traerTodosRestaurantes(){
    return new Promise((resolve,reject)=>{
      let db = new Database();
      let $query = "SELECT * FROM restaurante"
      db.getConexion().query($query, function(err, rows, fields){
        if(err){
          resolve(null);
        }else{
          resolve(rows);
        }
      })

    })
  }
  //Si ya exite el nombre del restaurante devolvera verdadero sino devolvera falso.
  static async existeNombreResto(nombre){
    return new Promise((resolve, reject) => {
      let db = new Database();
      let $query = 'SELECT * from restaurante WHERE nombre_resto = ?';
      db.getConexion().query($query, nombre,function(err,rows,fields){
        if (err) {
          console.log("An error ocurred performing the query.");
          reject(err); // Rechaza la promesa en caso de error
        } else if (rows.length === 0) {
          resolve(false); // Resuelve la promesa con null si no se encontraron registros
        }else{
          console.log('ya exite mail');
          resolve(true);
        }
      });
    });
  }

  //modificar resto
  static async modificar(id, nombre, descripcion, horario, contacto, ubicacion){
    return new Promise((resolve, reject) => {
      let db = new Database();
      let $query = 'UPDATE restaurante SET nombre_resto = ?, descripcion_resto = ?, horario = ?, contacto = ?, ubicacion = ? WHERE id_usuario = ?';
      db.getConexion().query($query, [nombre, descripcion, horario, contacto, ubicacion, id], function (err, rows, fields) {
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
  //traer el menu del restaurante
  static async traerMenu(id){
    return new Promise((resolve, reject) => {
      let db = new Database();
      let $query = 'SELECT id_comida, nombre_comida, precio_comida, descripcion_comida, promedio_estrellas, nombre_resto FROM comida INNER JOIN restaurante ON restaurante.id_usuario=comida.id_usuario AND restaurante.id_usuario=?';
      db.getConexion().query($query, id,function(err,rows,fields){
        if (err) {
          console.log("An error ocurred performing the query.");
          reject(err); // Rechaza la promesa en caso de error
        } else if (rows.length === 0) {
          resolve(false); 
        }else{
          resolve(rows);
        }
      });
    });
  }
  //eliminar el restaurante
  static async eliminar(id){
    return new Promise((resolve, reject) => {
      let db = new Database();
      let $query = 'DELETE FROM valoracion WHERE id_comida IN (SELECT id_comida FROM comida WHERE id_usuario=?); DELETE FROM comida WHERE id_usuario=?; DELETE FROM restaurante WHERE id_usuario = ? ; DELETE FROM usuario WHERE id_usuario=?';
      db.getConexion().query($query, [id,id,id,id], function (err, rows, fields) {
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

module.exports = RestauranteController;