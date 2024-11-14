import React, { useState, useEffect } from 'react';
import './reserva.css';

const Reserva = ({ isAuthenticated, userId }) => {
  const [packages, setPackages] = useState([]); // Estado para almacenar los paquetes
  const [selectedPackage, setSelectedPackage] = useState(''); // Paquete seleccionado
  const [price, setPrice] = useState(0); // Precio basado en el paquete seleccionado
  const [additionalServices, setAdditionalServices] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Obtener los paquetes desde la API al montar el componente
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:3077/api/packages');
        if (!response.ok) throw new Error('Error al obtener paquetes');
        const data = await response.json();
        setPackages(data); // Guardar los paquetes en el estado
      } catch (err) {
        console.error('Error al cargar paquetes:', err);
        setError('Error al cargar los paquetes');
      }
    };

    fetchPackages();
  }, []);

  // Manejar el cambio de selección de paquete
  const handlePackageChange = (e) => {
    const packageId = e.target.value;
    const selected = packages.find(pkg => pkg.id === packageId);
    setSelectedPackage(packageId);
    setPrice(selected ? selected.precio : 0); // Establecer el precio según el paquete seleccionado
  };

  // Enviar la reserva al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Debes iniciar sesión para reservar.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:3077/api/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          package: selectedPackage,
          additionalServices,
          price
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Reserva realizada con éxito');
      } else {
        setError(data.error || 'Error al realizar la reserva');
      }
    } catch (err) {
      setError('Error al conectarse con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reserva-page">
      <h1>Reserva tu Paquete</h1>
      <div className="reserva-container">
        
        {/* Selección de Paquete */}
        <div className="package-selection">
          <label htmlFor="package">Selecciona un Paquete</label>
          <select id="package" value={selectedPackage} onChange={handlePackageChange} required>
            <option value="">Selecciona un paquete</option>
            {packages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.nombre} - ${pkg.precio}
              </option>
            ))}
          </select>
        </div>

        {/* Resumen del precio */}
        <div className="summary">
          <h2>Precio Total: ${price}</h2>
        </div>

        {/* Botón de confirmación */}
        <button type="submit" className="primary-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Reservando...' : 'Confirmar Reserva'}
        </button>

        {/* Mensajes de éxito o error */}
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default Reserva;
