const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8080;

// Configuración del middleware para parsear el body de las peticiones
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoint para listar los contactos
app.get('/contactos', async (req, res) => {
  try {
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error obteniendo los contactos');
  }
});

// Endpoint para almacenar un nuevo contacto
app.post('/contactos', async (req, res) => {
  const { nombre, telefono } = req.body;
  if (!nombre || !telefono) {
    res.status(400).send('El nombre y el teléfono son requeridos');
    return;
  }
  try {
    const response = await axios.post('http://www.raydelto.org/agenda.php', { nombre, telefono });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error almacenando el contacto');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});