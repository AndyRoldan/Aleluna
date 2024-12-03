import React, { useState, useEffect } from "react";
import "./reserva.css";

const Reserva = () => {
  const [id_cliente, setIdCliente] = useState(null);
  const [paquetes, setPaquetes] = useState([]);
  const [selectedPaquete, setSelectedPaquete] = useState(null);
  const [selectedPaqueteDetails, setSelectedPaqueteDetails] = useState(null);
  const [limosinas, setLimosinas] = useState([]);
  const [locales, setLocales] = useState([]);
  const [selectedLimosina, setSelectedLimosina] = useState(null);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [selectedLocalDetails, setSelectedLocalDetails] = useState(null);
  const [fechaReserva, setFechaReserva] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Recuperar el ID del cliente desde localStorage y convertirlo en un entero
  useEffect(() => {
    const storedIdCliente = localStorage.getItem("userId");
    if (storedIdCliente) {
      const parsedId = parseInt(storedIdCliente, 10);
      if (!isNaN(parsedId)) {
        setIdCliente(parsedId);
        console.log("ID del cliente establecido:", parsedId);
      } else {
        console.error("El ID del cliente en localStorage no es un número válido.");
      }
    } else {
      console.error("ID del cliente no encontrado en localStorage.");
    }
  }, []);

  // Cargar datos desde la API
  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al cargar los datos.");
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error(`Error al cargar datos desde ${url}:`, err);
        setError("No se pudieron cargar los datos.");
      }
    };

    fetchData("http://localhost:3077/api/packages", setPaquetes);
    fetchData("http://localhost:3077/api/limosinas", setLimosinas);
    fetchData("http://localhost:3077/api/locales", setLocales);
  }, []);

  // Seleccionar paquete y obtener detalles
  const handlePaqueteChange = (id) => {
    setSelectedPaquete(id);
    const paquete = paquetes.find((pkg) => pkg.id === id);
    if (paquete) setSelectedPaqueteDetails(paquete);
  };

  // Seleccionar local y obtener detalles
  const handleLocalChange = (id) => {
    setSelectedLocal(id);
    const local = locales.find((loc) => loc.id === id);
    if (local) setSelectedLocalDetails(local);
  };

  // Seleccionar limosina
  const handleLimosinaChange = (id) => {
    setSelectedLimosina(id);
  };

  // Enviar la reserva al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const fecha_reserva = fechaReserva
      ? new Date(fechaReserva).toISOString().split("T")[0]
      : null;

    const body = {
      id_cliente,
      id_paquete: selectedPaquete,
      id_local: selectedLocal,
      id_limusina: selectedLimosina,
      fecha_reserva,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
    };

    console.log("Datos enviados al backend:", body);

    try {
      const response = await fetch("http://localhost:3077/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al crear la reserva.");
      }

      const data = await response.json();
      console.log("Reserva creada:", data);
      setSuccess("Reserva creada exitosamente.");
    } catch (err) {
      setError(err.message || "Ocurrió un error inesperado al crear la reserva.");
    }
  };

  return (
    <div className="reserva-container">
      {id_cliente ? (
        <div className="reserva-box">
          <h1>Crear Reserva</h1>

          {/* Paquetes */}
          <fieldset>
            <legend>Paquetes de Fotos</legend>
            {paquetes.map((paquete) => (
              <div key={paquete.id}>
                <label>
                  <input
                    type="radio"
                    name="paquete"
                    value={paquete.id}
                    onChange={() => handlePaqueteChange(paquete.id)}
                  />
                  {paquete.nombre} - ${paquete.precio}
                </label>
              </div>
            ))}
            {selectedPaqueteDetails && (
              <table className="details-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedPaqueteDetails.nombre}</td>
                    <td>{selectedPaqueteDetails.descripcion}</td>
                    <td>${selectedPaqueteDetails.precio}</td>
                    <td>{selectedPaqueteDetails.hora_servicio} horas</td>
                  </tr>
                </tbody>
              </table>
            )}
          </fieldset>

          {/* Limosinas */}
          <fieldset>
            <legend>Limosinas</legend>
            {limosinas.map((limosina) => (
              <div key={limosina.id_limosina}>
                <label>
                  <input
                    type="radio"
                    name="limosina"
                    value={limosina.id_limosina}
                    onChange={() => handleLimosinaChange(limosina.id_limosina)}
                  />
                  {limosina.modelo} - Capacidad: {limosina.capacidad} - $
                  {limosina.precio_por_hora}
                </label>
              </div>
            ))}
          </fieldset>

          {/* Locales */}
          <fieldset>
            <legend>Locales</legend>
            {locales.map((local) => (
              <div key={local.id}>
                <label>
                  <input
                    type="radio"
                    name="local"
                    value={local.id}
                    onChange={() => handleLocalChange(local.id)}
                  />
                  {local.nombre_local} - {local.direccion} - $
                  {local.precio_por_hora}
                </label>
              </div>
            ))}
            {selectedLocalDetails && (
              <table className="details-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Precio</th>
                    <th>Capacidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedLocalDetails.nombre_local}</td>
                    <td>{selectedLocalDetails.direccion}</td>
                    <td>${selectedLocalDetails.precio_por_hora}</td>
                    <td>{selectedLocalDetails.capacidad} personas</td>
                  </tr>
                </tbody>
              </table>
            )}
          </fieldset>

          {/* Fecha y Hora */}
          <fieldset>
            <legend>Detalles de la Reserva</legend>
            <div>
              <label>
                Fecha de Reserva:
                <input
                  type="date"
                  value={fechaReserva}
                  onChange={(e) => setFechaReserva(e.target.value)}
                />
              </label>
              <label>
                Hora de Inicio:
                <input
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                />
              </label>
              <label>
                Hora de Fin:
                <input
                  type="time"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                />
              </label>
            </div>
          </fieldset>

          {/* Botón de Enviar */}
          <button onClick={handleSubmit}>Reservar</button>

          {/* Mensajes */}
          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-text">{error}</p>}
        </div>
      ) : (
        <p>Cargando datos del cliente...</p>
      )}
    </div>
  );
};

export default Reserva;
