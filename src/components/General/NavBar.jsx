import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const NavBar = ({ isAuthenticated, handleLogout, userName }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/">
          <img src="https://i.ibb.co/6Ncyyz4/Logo-Aleluna.png" alt="Logo-Aleluna" />
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Sobre Nosotros</Link></li>
        {isAuthenticated && (
          <li><Link to="/reserva">Reservar Ahora</Link></li>
        )}
      </ul>

      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            <img 
              src="https://i.ibb.co/ZJ15Xh2/6.png" 
              alt="Profile" 
              className="profile-pic" 
            />
            <span className="user-name">{userName}</span>
            <button className="nav-button_logout" onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="nav-button">Iniciar Sesión</button>
            </Link>
            <Link to="/registro">
              <button className="nav-button">Registrarse</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
