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
      return new Promise((resolve, reject) => {
        let db = new Database();
        let $query = 'DELETE FROM comida WHERE id_comida = ?';
        db.getConexion().query($query,id,function(err,rows,fields){
          if (err) {
            console.log(err);
            resolve(false); 
          }else{
            resolve(true);
          }
        });
      });
    };

}

module.exports = ComidaController;