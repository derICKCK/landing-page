const express = require("express"); //importar librería
const app = express(); //objeto para llamar a los métodos
const mysql = require('mysql2');
const nodemailer = require("nodemailer");
const conexion = mysql.createConnection({
host: '127.0.0.1',
user: 'root',
password: '', // mejor poner contraseña
database: 'prueba',
port: 3008
});


conexion.on("error", err => {
  console.error("Error MySQL:", err.code);
});

conexion.query("SELECT 1", err => {
  if (err) console.error("MySQL no responde");
  else console.log("MySQL conectado correctamente");
});


app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",function(req,res){
  res.render("registros")
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "derickmaker12@gmail.com",
        pass: "raxsgruajfszxpdn"
    }
});


app.post("/validar", (req, res) => {
    const { nombre, email, edad } = req.body;

    if (!nombre || !email || !edad) {
        return res.status(400).send("Datos incompletos");
    }

    const sql = `
        INSERT INTO alumnos (nombre, email, edad)
        VALUES (?, ?, ?)
    `;

    conexion.query(sql, [nombre, email, edad], (error) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error al registrar");
        }

        const mailOptions = {
           from: `"Derick Filmmaking" <derickmaker12@gmail.com>`,
            to: email,
            subject: "Bienvenido a Derick Filmmaking 🎬",
            html: `
                <h2>Bienvenido a Derick Filmmaking</h2>
                <p>Hola <b>${nombre}</b>,</p>
                <p>Tu registro se ha completado correctamente.</p>
                <p>Gracias por confiar en mi trabajo.</p>
                <br>
                <p>🎬 Derick</p>
            `
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) console.error("Error enviando correo:", error);
        });

        res.send("Usuario registrado y correo enviado");
    });
});


app.listen(3008, function () {
  console.log("Servidor iniciado en http://localhost:3008");
});
