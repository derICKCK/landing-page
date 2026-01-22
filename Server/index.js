const express = require("express"); //importar librería
const app = express(); //objeto para llamar a los métodos
const mysql = require('mysql2');
const nodemailer = require("nodemailer");
const conexion = mysql.createConnection({
host: '127.0.0.1',
user: 'root',
password: '', // mejor poner contraseña
database: 'prueba',
port: 3308
});


conexion.on("error", err => {
  console.error("Error MySQL:", err.code);
});

conexion.query("SELECT 1", err => {
  if (err) console.error("MySQL no responde");
  else console.log("MySQL conectado correctamente");
});


app.set("view engine","ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contacto", (req, res) => {
  res.render("contacto");
});

app.get("/productos", (req, res) => {
  res.render("productos");
});

app.get("/sobremi", (req, res) => {
  res.render("sobremi");
});

app.get("/politicas", (req, res) => {
  res.render("politicas");
});

app.get("/terminos", (req, res) => {
  res.render("ter_condiciones");
});

app.get("/aviso_legal", (req, res) => {
  res.render("aviso_legal");
});
//Api reset
app.get("/api/contactos", (req, res) => {
  const sql = "SELECT nombre, email, mensaje FROM contactos";

  conexion.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener contactos" });
    }

    return res.json(results);
  });
});

const fs = require("fs");

// Exportar contactos a archivo JSON (solo para la entrega)
app.get("/export/contactos", (req, res) => {
  const sql = "SELECT nombre, email, mensaje FROM contactos";

  conexion.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al exportar contactos");
    }
    //  api servicios   
  app.get("/api/servicios", (req, res) => {
  const sql = "SELECT id, nombre, descripcion, precio FROM servicios";

  conexion.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener servicios" });
    }
    res.json(results);
  });
});


    fs.writeFileSync(
      "./data/contactos.json",
      JSON.stringify(results, null, 2)
    );

    return res.send("Archivo contactos.json generado correctamente");
  });
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "derickmaker12@gmail.com",
        pass: "raxsgruajfszxpdn"
    }
});

app.post("/contacto", (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).send("Datos incompletos");
  }

  const sql = `
    INSERT INTO contactos (nombre, email, mensaje)
    VALUES (?, ?, ?)
  `;

  conexion.query(sql, [nombre, email, mensaje], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al guardar mensaje");
    }

    // 1️⃣ Preparar email
    const mailOptions = {
      from: `"Derick Filmmaking" <derickmaker12@gmail.com>`,
      to: email,
      subject: "Mensaje recibido 🎬",
      html: `
        <h2>Gracias por contactar</h2>
        <p>Hola <b>${nombre}</b>,</p>
        <p>He recibido tu mensaje y me pondré en contacto contigo pronto.</p>
        <br>
        <p>🎬 Derick</p>
      `
    };

    // 2️⃣ Enviar email (NO responde al cliente)
    transporter.sendMail(mailOptions, (err) => {
      if (err) console.error("Error enviando correo:", err);
    });

    // 3️⃣ UNA ÚNICA respuesta
    return res.send("Mensaje enviado correctamente");
  });
});



app.listen(3008, function () {
  console.log("Servidor iniciado en http://localhost:3008");
});
