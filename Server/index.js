const express = require("express"); //importar librería
const app = express(); //objeto para llamar a los métodos
const mysql = require('mysql2');
const conexion = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '', // mejor poner contraseña
database: 'prueba',
port: 3304
});



/*
app.use(express.static("public"));
app.use(express.static("views"));


*/
app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",function(req,res){
  res.render("registros")
});

app.post("/validar",function(req,res){
  const datos = req.body;
  console.log(datos);

  let nombre = datos.nombre;
  let email=datos.email;
   let edad=datos.edad;

let registrar = "INSERT INTO columnas (nombre,email,edad) VALUES ('"+nombre+"','"+email+"','"+edad+"')";
  conexion.query(registrar,function(error){
    if(error){

    }else{
      console.log("Todo correcto");
    }
  })   

});





app.listen(3008, function () {
  console.log("Servidor iniciado en http://localhost:3008");
});
