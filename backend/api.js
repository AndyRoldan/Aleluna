const express = require("express");
const { pool } = require("./conexion");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3077;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});


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
  const {id_cliente, email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
    
    // Log para verificar el contenido de 'user'
    console.log("Resultado de la consulta a la base de datos:", user.rows);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const storedPassword = user.rows[0].password;
    const id_cliente = user.rows[0].id_cliente; // Verifica el nombre del campo aquí
    const userName = user.rows[0].nombre;

    // Comparar la contraseña con la almacenada en la base de datos
    const validPassword = password === storedPassword; // Reemplazar con bcrypt.compare si usas hashing

    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    console.log("Inicio de sesión exitoso para el usuario:", { id_cliente, userName });


    // Devolver el ID y el nombre del usuario
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      id_cliente,
      userName,
    });
  } catch (err) {
    console.error('Error en el inicio de sesión:', err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

//**************************************************************************************************************************************************************
//*******************************************************************OBTENER PAQUETES******************************************************************************************* */
app.get("/api/packages", async (req, res) => {
  try {
    const query = `
     SELECT 
        id_paquete AS id,
        nombre,
        descripcion,
        precio,
        hora_servicio,
        modo_entrega,
        tipo_album,
        pre_sesion,
        foto_impresa,
        slideShow,
        transmision,
        pantalla_digital,
        cabina_fotos,
        galeria_fotos
      FROM 
        paquetesfotos;
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows); // Devuelve los datos de los paquetes
  } catch (err) {
    console.error("Error al obtener paquetes:", err.message);
    res.status(500).json({ error: "Error al obtener paquetes" });
  }
});

// Obtener limosinas disponibles
app.get("/api/limosinas", async (req, res) => {
  try {
    const query = `
     SELECT 
    l.id_limosina,
    l.modelo,
    l.capacidad,
    l.precio_por_hora,
    e.nombre AS estado
FROM 
    limosinas l
JOIN 
    Estado e
ON 
    l.id_estado = e.id_estado;
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error al obtener limosinas:", err.message);
    res.status(500).json({ error: "Error al obtener limosinas" });
  }
});

//**************************************************************************************************************************************************************
//*******************************************************************LOCALES******************************************************************************************* */

// Obtener locales disponibles
app.get("/api/locales", async (req, res) => {
  try {
    const query = `
      SELECT 
        l.id_local AS id,
        l.nombre_local,
        l.direccion,
        l.precio_por_hora,
        l.capacidad,
        e.nombre AS estado
      FROM 
        locales l
      JOIN 
        Estado e
      ON 
        l.id_estado = e.id_estado
      WHERE 
        e.nombre = 'Disponible';
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error al obtener locales:", err.message);
    res.status(500).json({ error: "Error al obtener locales" });
  }
});
//**************************************************************************************************************************************************************
//*******************************************************************RESERVAS******************************************************************************************* */
// Crear reserva
app.post("/api/reservas", async (req, res) => {
  const {
    id_cliente,
    id_paquete,
    fecha_reserva,
    hora_inicio,
    hora_fin,
    id_estado, // Esto es opcional, por defecto se usará el estado 'Pendiente' si no se pasa
    id_local,
    id_limusina,
  } = req.body;

  // Log para verificar los datos recibidos del frontend
  console.log("Datos recibidos del frontend:", req.body);

  try {
    // Validar que los campos obligatorios estén presentes
    if (!id_cliente || !id_paquete || !fecha_reserva || !hora_inicio || !hora_fin) {
      const missingFields = [];
      if (!id_cliente) missingFields.push("id_cliente");
      if (!id_paquete) missingFields.push("id_paquete");
      if (!fecha_reserva) missingFields.push("fecha_reserva");
      if (!hora_inicio) missingFields.push("hora_inicio");
      if (!hora_fin) missingFields.push("hora_fin");

      console.error("Campos faltantes:", missingFields);
      return res.status(400).json({
        error: "Faltan datos obligatorios para la reserva",
        missingFields,
      });
    }

    // Log antes de ejecutar la consulta
    console.log("Insertando datos en la base de datos:", {
      id_cliente,
      id_paquete,
      fecha_reserva,
      hora_inicio,
      hora_fin,
      id_estado: id_estado || "Predeterminado: Pendiente",
      id_local,
      id_limusina,
    });

    // Insertar la reserva en la base de datos
    const query = `
      INSERT INTO public.reservas (
        id_cliente,
        id_paquete,
        fecha_reserva,
        hora_inicio,
        hora_fin,
        id_estado,
        id_local,
        id_limusina
      ) VALUES (
        $1, $2, $3, $4, $5,
        COALESCE($6, (SELECT id_estado FROM estado WHERE nombre = 'Pendiente')),
        $7, $8
      ) RETURNING *;
    `;

    const values = [
      id_cliente,
      id_paquete,
      fecha_reserva,
      hora_inicio,
      hora_fin,
      id_estado || null,
      id_local || null,
      id_limusina || null,
    ];

    const result = await pool.query(query, values);

    // Log de la respuesta de la base de datos
    console.log("Datos insertados en la base de datos:", result.rows[0]);

    // Responder al frontend
    res.status(201).json({
      message: "Reserva creada exitosamente",
      reserva: result.rows[0],
    });
  } catch (err) {
    console.error("Error al crear la reserva:", err.message);
    res.status(500).json({ error: "Error al crear la reserva" });
  }
});
