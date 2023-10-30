const Database = require("./Database");

function ejecutarQuery(sql, parametros) {
    const db = new Database();
    return new Promise((resolve, reject) => {
        db.getConexion().query(sql, parametros, function (err, rows, fields) {
            if (err) {
                reject(err);
            }else {
                resolve(rows);
            }
        })
    })
}
module.exports = ejecutarQuery;