var mysql = require('mysql');
require('dotenv').config() // se necesita este import en cada archivo donde necesite leer algo del archivo .env


class Database{
// Agregue las credenciales para acceder a su base de datos
    connection;
    static instance;
    /*Aqui deben colocar los datos para ingresar a SU base de datos, 
    que solo podria llegar a diferir su user y su password*/
    constructor() {
        if (!Database.instance) {
            this.connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password:process.env.DB_PASS,
                database:process.env.DB_NAME
            });

            this.connection.connect(function(err) {
                if (err) {
                    console.log(err.code);
                    console.log(err.fatal);
                } else {
                    console.log("Conectados a la base.");
                }
            });

            Database.instance = this;
        } else {
            console.log("ya estamos conectados");
            return Database.instance;
        }
    }

    cerrarConexion() {
        this.connection.end();
        console.log('Conexión cerrada.');
    }

    getConexion() {
        return this.connection;
    }
}

module.exports = Database;