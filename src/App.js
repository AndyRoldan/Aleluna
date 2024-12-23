import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/General/NavBar";
import Reserva from "./components/Reserva/Reserva";
import Portafolio from "./components/Portafolio/Portafolio";
import Login from './components/Login/Login';
import Registro from './components/Registro/Registro';
import Galeria1 from './components/Galerias/Galeria1/Galeria1';
import Galeria2 from './components/Galerias/Galeria2/Galeria2';
//import Galeria3 from './components/Galerias/Galeria1/Galeria1';
//import Galeria4 from './components/Galerias/Galeria1/Galeria1';
import Pago from './components/Pago/Pago';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState('');
  const [selectedRuta, setSelectedRuta] = useState(null);

  // Al cargar la aplicación, verifica si el usuario está autenticado
  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');

    if (storedIsAuthenticated && storedUserId && storedUserName) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setUserName(storedUserName);
    }
  }, []);

  // Manejar la selección de una ruta favorita
  const handleSelectRuta = (ruta) => {
    console.log('Ruta seleccionada:', ruta);
    setSelectedRuta(ruta);
  };

  // Función para manejar el inicio de sesión
  const handleLogin = (id, name) => {
    setIsAuthenticated(true);
    setUserId(id);
    setUserName(name);
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('userId', id);
    localStorage.setItem('userName', name);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    setUserId(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  };

  return (
    <Router>
      <NavBar 
        isAuthenticated={isAuthenticated} 
        handleLogout={handleLogout} 
        userName={userName} 
        userId={userId} 
        onSelectRuta={handleSelectRuta}
      />
      <Routes>
        <Route path="/" element={<Portafolio isAuthenticated={isAuthenticated} userId={userId} selectedRuta={selectedRuta}/>} />
        <Route path="/reserva" element={<Reserva isAuthenticated={isAuthenticated} userId={userId} selectedRuta={selectedRuta}/>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/galeria1" element={<Galeria1 />} />
        <Route path="/galeria2" element={<Galeria2 />} />
        <Route path="/pago" element={<Pago />} />

      </Routes>
    </Router>
  );
}

export default App;
