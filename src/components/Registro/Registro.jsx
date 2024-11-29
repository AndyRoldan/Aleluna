import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './registro.css'; // Asegúrate de importar tu CSS

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!nombre || !email || !password) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3077/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Usuario registrado con éxito');
        setNombre('');
        setEmail('');
        setPassword('');

        // Mostrar mensaje de éxito por 3 segundos y luego redirigir
        setTimeout(() => {
          navigate('/'); // Redirigir a la pantalla principal después del registro exitoso
        }, 3000);
      } else {
        setError(data.error || 'Error en el registro');
      }
    } catch (err) {
      setError('Error al conectarse con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="logo">
        <img src="https://i.ibb.co/6Ncyyz4/Logo-Aleluna.png" alt="Logo-Aleluna" border="0"></img>
        </div>
        <h2>Registro de Usuario</h2>
        <h4>Completa los campos para crear tu cuenta</h4>
        <form onSubmit={handleRegister}>
          <div className="tooltip-container">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={error && !nombre ? "input-error" : ""}
              required
            />
            {error && !nombre && <div className="tooltip">El nombre es obligatorio</div>}
          </div>
          <div className="tooltip-container">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error && !email ? "input-error" : ""}
              required
            />
            {error && !email && <div className="tooltip">El correo es obligatorio</div>}
          </div>
          <div className="tooltip-container">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error && !password ? "input-error" : ""}
              required
            />
            {error && !password && <div className="tooltip">La contraseña es obligatoria</div>}
          </div>
          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
        <p className="login-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;
