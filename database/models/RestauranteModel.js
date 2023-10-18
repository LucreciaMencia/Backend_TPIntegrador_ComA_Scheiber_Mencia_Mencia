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
      let $query = "SELECT * FROM restaurante WHERE  id_usuario = ?"
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
}

module.exports = RestauranteController;