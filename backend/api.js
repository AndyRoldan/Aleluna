const express = require("express");
const { pool } = require("./conexion");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3077;

app.use(cors());
app.use(bodyParser.json());

//**************************************************************************************************************************************************************
//*******************************************************************PARA REGISTRAR USUARIO******************************************************************************************* */

// Ruta para registrar un nuevo usuario (sin encriptar la contraseña)
app.post("/api/register", async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si todos los campos están completos
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Verificar si el usuario ya existe en la base de datos
    const userExists = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    // Insertar el nuevo usuario en la base de datos
    const newUser = await pool.query(
      'INSERT INTO usuario (nombre, email, password) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, password]
    );

    res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser.rows[0] });
  } catch (err) {
    console.error('Error al registrar usuario:', err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

//**************************************************************************************************************************************************************
//*******************************************************************PARA LOGIN USUARIO******************************************************************************************* */

// Ruta para iniciar sesión
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
    
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const storedPassword = user.rows[0].password;
    const userId = user.rows[0].id;  // Aquí obtenemos el ID del usuario

    // Comparar la contraseña con la almacenada en la base de datos (sin encriptación)
    const validPassword = password === storedPassword;

    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Si todo es correcto, devolver el nombre del usuario
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      userId,  // Devolvemos el userId
      userName: user.rows[0].nombre  // Devolver el nombre del usuario en la respuesta
    });
  } catch (err) {
    console.error('Error en el inicio de sesión:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

//**************************************************************************************************************************************************************
//*******************************************************************OBTENER PAQUETES******************************************************************************************* */

// Ruta para obtener todos los paquetes de fotografía
app.get("/api/packages", async (req, res) => {
  try {
    // Consultar todos los paquetes desde la tabla "paquete_fotos"
    const result = await pool.query('SELECT nombre, precio FROM paquetesfotos');
    
    // Enviar los paquetes como respuesta
    res.status(200).json(result.rows)
  } catch (err) {
    console.error('Error al obtener paquetes:', err.message);
    res.status(500).json({ error: 'Error al obtener paquetes' });
  }
});

const PORT = 3077;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
