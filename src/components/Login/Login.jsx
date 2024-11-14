import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3077/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Inicio de sesión exitoso');
        setEmail('');
        setPassword('');

        const { userId, userName } = data;
        console.log('Login exitoso, ID del usuario:', userId);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
        onLogin(userId, userName);
        navigate('/');
      } else {
        setError(data.error || 'Error en el inicio de sesión');
      }
    } catch (err) {
      setError('Error al conectarse con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
        <img src="https://i.ibb.co/6Ncyyz4/Logo-Aleluna.png" alt="Logo-Aleluna" border="0"></img>
        </div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
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
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
        </form>
        <p className="register-link">
          ¿No posees cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;