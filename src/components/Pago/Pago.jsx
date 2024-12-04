import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./pago.css";

const Pago = () => {
  const location = useLocation();
  const [reserva, setReserva] = useState(null);
  const [monto, setMonto] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [estadoReserva, setEstadoReserva] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Cargar detalles de la reserva desde la navegación
  useEffect(() => {
    if (location.state && location.state.reserva) {
      console.log("Reserva recibida en Pago:", location.state.reserva); // Verifica que 'id_reserva' está presente
      setReserva(location.state.reserva);
    } else {
      console.error("No se recibió una reserva válida.");
    }
  }, [location.state]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const body = {
      monto,
      metodo_pago: metodoPago,
      fecha_pago: fechaPago,
      id_reserva: reserva?.id_reserva, // Usar el ID de la reserva
      id_estado: estadoReserva,
    };

    console.log("Datos enviados al backend:", body);

    try {
      const response = await fetch("http://localhost:3077/a-pi/pagos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al procesar el pago.");
      }

      const data = await response.json();
      setSuccess("Pago registrado exitosamente.");
      console.log("Respuesta del backend:", data);
    } catch (err) {
      setError(err.message || "Ocurrió un error al registrar el pago.");
    }
  };

  return (
    <div className="pago-container">
      <h1>Realizar Pago</h1>

      {reserva ? (
        <>
          <div className="reserva-detalles">
            <h2>Detalles de la Reserva</h2>
            <p><strong>ID de Reserva:</strong> {reserva.id_reserva}</p>
            <p><strong>Cliente:</strong> {reserva.id_cliente}</p>
            <p><strong>Fecha de Reserva:</strong> {reserva.fecha_reserva}</p>
            <p><strong>Paquete:</strong> {reserva.id_paquete}</p>
            <p><strong>Local:</strong> {reserva.id_local || "N/A"}</p>
            <p><strong>Limosina:</strong> {reserva.id_limusina || "N/A"}</p>
          </div>

          <form onSubmit={handleSubmit} className="pago-form">
            <h2>Detalles del Pago</h2>

            <div className="form-group">
              <label htmlFor="monto">Monto:</label>
              <input
                type="number"
                id="monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="metodoPago">Método de Pago:</label>
              <select
                id="metodoPago"
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
                required
              >
                <option value="">Seleccione un método</option>
                <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                <option value="Efectivo">Efectivo</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fechaPago">Fecha del Pago:</label>
              <input
                type="date"
                id="fechaPago"
                value={fechaPago}
                onChange={(e) => setFechaPago(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="estadoReserva">Estado de la Reserva:</label>
              <select
                id="estadoReserva"
                value={estadoReserva}
                onChange={(e) => setEstadoReserva(e.target.value)}
                required
              >
                <option value="">Seleccione un estado</option>
                <option value="1">Pendiente</option>
                <option value="2">Pagado</option>
                <option value="3">Cancelado</option>
              </select>
            </div>

            <button type="submit">Registrar Pago</button>
          </form>
        </>
      ) : (
        <p>Cargando detalles de la reserva...</p>
      )}

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Pago;
