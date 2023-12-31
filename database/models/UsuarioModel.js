
const Database = require('../Database');
const ejecutarQuery = require('../ejecutarQuery');


class UsuarioController{

    static async login(nickname, password) {
        return new Promise((resolve, reject) => {
          let db = new Database();
          let $query = 'SELECT * FROM usuario WHERE nickname = ? AND password = ?'
      
          db.getConexion().query($query, [nickname, password], function (err, rows, fields) {
            if (err) {
              console.log("An error ocurred performing the query.");
              reject(err); // Rechaza la promesa en caso de error
            } else if (rows.length === 0) {
              console.log("No existe");
              resolve(null); // Resuelve la promesa con null si no se encontraron registros
            } else {
              let usuario= {"idUsuario" :rows[0].id_usuario, "rol" : rows[0].id_rol}    
              console.log(usuario);         
              resolve(usuario); // Resuelve la promesa con true si se encontraron registros
            }
          });
        });
    }

    //Va a registrar al usuario solo si el mail y el usuario estan disponibles.
    static async registro(id_rol,nickname, mail, password){
        if(await this.existeMail(mail) == false){
          if(await this.existeNickname(nickname) == false){
            let db = new Database();
            let $query = 'INSERT INTO usuario (id_rol,nickname,mail,password) VALUES (?,?,?,?)';
            db.getConexion().query($query,[id_rol,nickname,mail,password],function (err, rows, fields) {
              if(err){
                //el error cero en la conexion de la base de datos
                return 0;
              }else{
                //3 signifca que la transaccion fue exitosa.
                return 3;
              }
            });
          }else{
            //el error uno es que el nickname ya existe
            return 1;
          }
        }else{
          //el error dos es de que el mail ya existe.
          return 2;
        }
    }

    //Si ya exite el mail devolvera verdadero sino devolvera falso.
    static async existeMail(mail){
      return new Promise((resolve, reject) => {
        let db = new Database();
        let $query = 'SELECT * from usuario WHERE mail = ?';
        db.getConexion().query($query,mail,function(err,rows,fields){
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

    //Si ya exite el nickname devolvera verdadero sino devolvera falso.
    static async existeNickname(nickname){
      return new Promise((resolve, reject) => {
        let db = new Database();
        let $query = 'SELECT * from usuario WHERE nickname = ?';
        db.getConexion().query($query,nickname,function(err,rows,fields){
          if (err) {
            console.log("An error ocurred performing the query.");
            reject(err); // Rechaza la promesa en caso de error
          } else if (rows.length === 0) {
            console.log(rows);
            resolve(false); // Resuelve la promesa con null si no se encontraron registros
          }else{
            console.log('ya exites nickname');
            resolve(true);
          }
        });

      });
    }
    //traer info del usuario 
    static async traerInfo(id){
      return new Promise((resolve, reject) => {
        let db = new Database();
        let $query = 'SELECT nickname, mail from usuario WHERE id_usuario = ?';
        db.getConexion().query($query,id,function(err,rows,fields){
          if (err) {
            console.log("An error ocurred performing the query.");
            reject(err); // Rechaza la promesa en caso de error
          } else if (rows.length === 0) {
            console.log(rows);
            resolve(false); // Resuelve la promesa con false si no se encontraron registros
          }else{
            console.log(rows);
            resolve(rows[0]);
          }
        });

      });
    }
    //modificar
    static async actualizar(id, nickname, mail, password){
      if (password) {
        // Si vino el password, actualizamos solo eso
        const actualizarSoloPass = 'UPDATE usuario SET password=? WHERE id_usuario=?';
        
        return ejecutarQuery(actualizarSoloPass, [password, id])
          .then(() => true)
          .catch((err) => {
            console.log(err);
            return false;
          });
      } else {
        // Si no vino el password, actualizamos solo nickname y mail
        // Cualquier otra combinacion no es valida
        const actualizarNick_y_Mail = 'UPDATE usuario SET nickname=?, mail=? WHERE id_usuario=?';

        return ejecutarQuery(actualizarNick_y_Mail, [nickname, mail, id])
          .then(() => true)
          .catch(() => false);
      }
    }
}

module.exports = UsuarioController;