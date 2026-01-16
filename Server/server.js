const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json());

// API de prueba
app.get('/', (req, res) => {
  res.json([
    {
      titulo: "Grabación de cámara",
      descripcion: "Grabación de vídeos para redes",
      imagen: "../imagen/icono-camara.svg"
    },
    {
      titulo: "Edición",
      descripcion: "Edición dinámica y visual",
      imagen: "../imagen/icono-edicion.svg"
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Servidor API funcionando en http://localhost:${PORT}`);
});

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "proyecto"
});

db.connect(err => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL");
});
