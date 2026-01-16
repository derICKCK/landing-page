const mysql = require('mysql2');
const conexion = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '', // mejor poner contraseña
database: 'prueba'
});
conexion.connect(err => {
if (err) {
console.error('Error conexión:', err.message);
process.exit(1);
}
console.log('Conexión OK con mysql2');
});
/*conexion.end();
*/

const usuario = "SELECT * FROM appweb";
conexion.query(usuario,function(error,rows){
if(error){
throw error;
}else{
console.log(rows)
}
});
/*
conexion.end();
*/

const nuevoreg = "INSERT INTO appweb (id, nombre, email) VALUES ('3','Sergi','sergin@gmail.com')";
conexion.query(nuevoreg, function(error,rows){
if(error){
throw error;
}else{
console.log('Datos registrados')
}
});
conexion.end();