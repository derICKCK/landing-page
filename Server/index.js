const express = require("express");
const app = express();
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const conexion = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "prueba",
  port: 3308
});

// ---------- CONEXIÓN BD ----------
conexion.on("error", err => {
  console.error("Error MySQL:", err.code);
});

conexion.query("SELECT 1", err => {
  if (err) console.error("MySQL no responde");
  else console.log("MySQL conectado correctamente");
});

// ---------- CONFIG ----------
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------- VISTAS ----------
app.get("/", (req, res) => res.render("index"));
app.get("/contacto", (req, res) => res.render("contacto"));
app.get("/productos", (req, res) => res.render("productos"));
app.get("/sobremi", (req, res) => res.render("sobremi"));
app.get("/politicas", (req, res) => res.render("politicas"));
app.get("/terminos", (req, res) => res.render("ter_condiciones"));
app.get("/aviso_legal", (req, res) => res.render("aviso_legal"));

// ---------- API CONTACTOS ----------
app.get("/api/contactos", (req, res) => {
  const sql = "SELECT nombre, email, mensaje FROM contactos";

  conexion.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener contactos" });
    }
    res.json(results);
  });
});

// ---------- API SERVICIOS ----------
app.get("/api/servicios", (req, res) => {
  const sql = "SELECT id, nombre, descripcion, precio FROM servicios";

  conexion.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Error al obtener servicios" });
    }

    // 🔹 Guardar JSON automático
    const filePath = path.join(__dirname, "public/data/servicios.json");
    fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

    res.json(results);
  });
});

// ---------- EXPORT CONTACTOS A JSON ----------
app.get("/export/contactos", (req, res) => {
  const sql = "SELECT nombre, email, mensaje FROM contactos";

  conexion.query(sql, (error, results) => {
    if (error) {
      return res.status(500).send("Error al exportar contactos");
    }

    const filePath = path.join(__dirname, "public/data/contactos.json");
    fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

    res.send("Archivo contactos.json generado correctamente");
  });
});

// ---------- EMAIL ----------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "derickmaker12@gmail.com",
    pass: "raxsgruajfszxpdn"
  }
});

// ---------- FORM CONTACTO ----------
app.post("/contacto", (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).send("Datos incompletos");
  }

  const sql = `
    INSERT INTO contactos (nombre, email, mensaje)
    VALUES (?, ?, ?)
  `;

  conexion.query(sql, [nombre, email, mensaje], error => {
    if (error) {
      return res.status(500).send("Error al guardar mensaje");
    }

    transporter.sendMail({
      from: `"Derick Filmmaking" <derickmaker12@gmail.com>`,
      to: email,
      subject: "Mensaje recibido 🎬",
      html: `
        <h2>Gracias por contactar</h2>
        <p>Hola <b>${nombre}</b>,</p>
        <p>He recibido tu mensaje y me pondré en contacto contigo pronto.</p>
      `
    });

    res.send("Mensaje enviado correctamente");
  });
});

// ---------- SERVER ----------
app.listen(3008, () => {
  console.log("Servidor iniciado en http://localhost:3008");
});
