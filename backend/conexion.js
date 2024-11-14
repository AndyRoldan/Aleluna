const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // Cambia por tu usuario
  host: "localhost",
  database: "Aleluna", // Nombre de tu base de datos
  password: "admin", // Cambia por tu contraseña
  port: 5433, // Puerto estándar para PostgreSQL
});

module.exports = { pool: pool };

pool
  .connect()
  .then(client => {
    console.log("Conexión exitosa a PostgreSQL");
    return client.query('SELECT NOW()');  // Consulta simple para verificar la conexión
  })
  .then(res => {
    console.log("Fecha y hora actual en la base de datos:", res.rows[0]);
      // Cierra la conexión después de la consulta

  })
  .catch(err => {
    console.error("Error de conexión:", err);
  });