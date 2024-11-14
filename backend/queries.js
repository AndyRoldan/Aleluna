// Consultas SQL
const OBTENER_USUARIOS_TODOS = `SELECT id, nombre, email, password FROM usuario`;

// Verificar si el usuario ya existe por email
const VERIFICAR_USUARIO_EXISTE = `SELECT * FROM usuario WHERE email = $1`;

// Insertar un nuevo usuario
const INSERTAR_USUARIO = `INSERT INTO usuario (nombre, email, password, id_idioma) 
                          VALUES ($1, $2, $3, $4) RETURNING *`;

// Obtener todos los idiomas
const OBTENER_IDIOMAS_TODOS = `SELECT * FROM idioma`;


// Consulta SQL para buscar una ruta existente
const BUSCAR_RUTA = `
  SELECT id FROM public.ruta
  WHERE origen = $1 AND destino = $2
`;

// Consulta SQL para insertar una nueva ruta si no existe
const INSERTAR_RUTA = `
  INSERT INTO public.ruta (origen, destino, duracion_estimada, distancia)
  VALUES ($1, $2, $3, $4)
  RETURNING id
`;

// Nueva consulta para agregar una ruta favorita
const AGREGAR_RUTA_FAVORITA = `
  INSERT INTO public.ruta_favorita (id_usuario, id_ruta)
  VALUES ($1, $2) RETURNING *`;

// Nueva consulta para obtener las rutas favoritas de un usuario
const OBTENER_RUTAS_FAVORITAS = 
  `SELECT r.origen, r.destino 
  FROM public.ruta_favorita rf
  JOIN public.ruta r ON rf.id_ruta = r.id
  WHERE rf.id_usuario = $1;`;

module.exports = {
  OBTENER_USUARIOS_TODOS,
  VERIFICAR_USUARIO_EXISTE,
  INSERTAR_USUARIO,
  OBTENER_IDIOMAS_TODOS,
  BUSCAR_RUTA,
  INSERTAR_RUTA,
  AGREGAR_RUTA_FAVORITA,
  OBTENER_RUTAS_FAVORITAS,
};
