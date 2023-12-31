const ejecutarQuery = require('../ejecutarQuery')
const Database = require('../Database');



class ComidaController{
    static async cargarComida(idUsuario,precioComida,nombreComida,descripcion){
        return new Promise((resolve, reject) => {
            let db = new Database();
            let $query = 'INSERT INTO comida (id_usuario,precio_comida,nombre_comida,descripcion_comida, promedio_estrellas) VALUES (?,?,?,?,?)';
            db.getConexion().query($query,[idUsuario,precioComida,nombreComida,descripcion,0],function (err, rows, fields) {
                if(err){
                  console.log(err);
                  resolve(null);
                }else{
                  $query = 'SELECT id_comida from comida WHERE id_usuario = ? AND nombre_comida = ? AND descripcion_comida = ?'
                  db.getConexion().query($query,[idUsuario, nombreComida, descripcion], function(err,rows,fields){
                    if(err){
                      resolve (null);
                    }else{
                      resolve (rows[0]);
                    }
                  })
                }
              });
        });
    }

    static async leerComida(id){
      return new Promise((resolve, reject) => {
        let db = new Database();
        let $query = 'SELECT * FROM comida WHERE id_comida = ?';
        db.getConexion().query($query, id,function(err,rows,fields){
          if (err) {
            console.log(err);
            resolve(false); 
          }else{
            console.log(rows[0]);
            resolve(rows[0]);
          }
        });
      });
    }

    static async editarComida(id,nombre,precio,descripcion){
      return new Promise((resolve, reject) => {
        let db = new Database();
        let $query = 'UPDATE comida SET precio_comida=?,nombre_comida=?,descripcion_comida=? WHERE id_comida=?';
        db.getConexion().query($query, [precio,nombre,descripcion,id],function(err,rows,fields){
          if (err) {
            resolve(false); 
          }else{
            resolve(true);
          }
        });
      });
    }

    static async eliminarComida(id){
      const borrarValoraciones = 'DELETE FROM valoracion WHERE id_comida = ?'

      let borrarComida = 'DELETE FROM comida WHERE id_comida = ?';

      return ejecutarQuery(borrarValoraciones, id) 
      .then(resultado => ejecutarQuery(borrarComida, id))
      .then(resultado => true)
      .catch(err => {
        console.log(err)
        return false
      })
    };

    static async traerTodasComidas(){
      return new Promise((resolve, reject) => {
        let db = new Database();
        let $query = 'SELECT id_comida, comida.id_usuario as id_restaurante, nombre_comida,precio_comida,descripcion_comida,promedio_estrellas,nombre_resto FROM comida INNER JOIN restaurante ON restaurante.id_usuario = comida.id_usuario';
        db.getConexion().query($query,function(err,rows,fields){
          if (err) {
            console.log(err);
            resolve(false); 
          }else{
            resolve(rows);
          }
        });
      });
    }
}

module.exports = ComidaController;