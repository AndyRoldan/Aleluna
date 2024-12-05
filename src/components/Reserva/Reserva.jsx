import React, { useState, useEffect } from "react";
import "./reserva.css";

const Reserva = () => {
  const [id_cliente, setIdCliente] = useState(null);
  const [paquetes, setPaquetes] = useState([]);
  const [selectedPaquete, setSelectedPaquete] = useState(null);
  const [selectedPaqueteDetails, setSelectedPaqueteDetails] = useState(null);
  const [limosinas, setLimosinas] = useState([]);
  const [selectedLimosina, setSelectedLimosina] = useState(null);
  const [selectedLimosinaDetails, setSelectedLimosinaDetails] = useState(null);
  const [locales, setLocales] = useState([]);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [selectedLocalDetails, setSelectedLocalDetails] = useState(null);
  const [fechaReserva, setFechaReserva] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [idReserva, setIdReserva] = useState(null);
  const [monto, setMonto] = useState(0);
  const [metodoPago, setMetodoPago] = useState("");
  const [estadoPago, setEstadoPago] = useState("");

  useEffect(() => {
    const storedIdCliente = localStorage.getItem("userId");
    if (storedIdCliente) {
      const parsedId = parseInt(storedIdCliente, 10);
      if (!isNaN(parsedId)) {
        setIdCliente(parsedId);
      } else {
        console.error("El ID del cliente en localStorage no es un número válido.");
      }
    } else {
      console.error("ID del cliente no encontrado en localStorage.");
    }
  }, []);

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

  useEffect(() => {
    const total =
      (parseFloat(selectedPaqueteDetails?.precio) || 0) +
      (parseFloat(selectedLimosinaDetails?.precio_por_hora) || 0) +
      (parseFloat(selectedLocalDetails?.precio_por_hora) || 0);

    setMonto(total);
  }, [selectedPaqueteDetails, selectedLimosinaDetails, selectedLocalDetails]);

  const getLimosinaImage = (id) => {
    const images = {
      1: "https://www.gladysocana.com/wp-content/uploads/limo-towncar-exterior-001.jpg",
      2: "https://c4.wallpaperflare.com/wallpaper/981/727/663/white-street-hummer-hamer-wallpaper-preview.jpg",
      3: "https://s0.smartresize.com/wallpaper/986/262/HD-wallpaper-2016-white-chrysler-300-10-passenger-limousine-car-chrysler-luxury-limousine-10-passenger-300.jpg",
    };
    return images[id] || "https://via.placeholder.com/150?text=Limosina";
  };

  const getLocalImage = (id) => {
    const images = {
      1: "https://cdn0.bodas.com.mx/vendor/2431/3_2/960/jpg/boda-de-laura-matthew-2_5_132431.jpeg",
      2: "https://cdn0.matrimonio.com.co/vendor/4187/3_2/960/jpg/boda-381_10_94187-158154487439557.jpeg",
      3: "https://image-tc.galaxy.tf/wijpeg-dnpu6z3r973dy2v3309fl289n/img-20210630-wa0018.jpg?width=1920",
    };
    return images[id] || "https://via.placeholder.com/150?text=Local";
  };

  const handlePaqueteChange = (id) => {
    setSelectedPaquete(id);
    const paquete = paquetes.find((pkg) => pkg.id === id);
    if (paquete) setSelectedPaqueteDetails(paquete);
  };

  const handleLimosinaChange = (id) => {
    setSelectedLimosina(id);
    const limosina = limosinas.find((limo) => limo.id_limosina === id);
    if (limosina) setSelectedLimosinaDetails(limosina);
  };

  const handleLocalChange = (id) => {
    setSelectedLocal(id);
    const local = locales.find((loc) => loc.id === id);
    if (local) setSelectedLocalDetails(local);
  };

  const handleSubmitReserva = async (e) => {
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
      setSuccess("Reserva creada exitosamente.");
      setIdReserva(data.reserva.id_reserva);
    } catch (err) {
      setError(err.message || "Ocurrió un error inesperado al crear la reserva.");
    }
  };

  const handleSubmitPago = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const body = {
      monto,
      metodoPago,
      fechaPago: new Date().toISOString().split("T")[0],
      idReserva,
      idEstado: estadoPago,
    };

    try {
      const response = await fetch("http://localhost:3077/api/pagos", {
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
    } catch (err) {
      setError(err.message || "Ocurrió un error al procesar el pago.");
    }
  };

  return (
    <div className="reserva-container">
      <h1>Crear Reserva</h1>

      <form onSubmit={handleSubmitReserva}>
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
        </fieldset>

        <fieldset>
          <legend>Limosinas</legend>
          {limosinas.map((limosina) => (
            <div key={limosina.id_limosina} className="option-container">
              <label>
                <input
                  type="radio"
                  name="limosina"
                  value={limosina.id_limosina}
                  onChange={() => handleLimosinaChange(limosina.id_limosina)}
                />
                {limosina.modelo} - ${limosina.precio_por_hora}/hora
              </label>
              <img
                src={getLimosinaImage(limosina.id_limosina)}
                alt={`Limosina ${limosina.modelo}`}
                className="option-image"
              />
            </div>
          ))}
        </fieldset>

        <fieldset>
          <legend>Locales</legend>
          {locales.map((local) => (
            <div key={local.id} className="option-container">
              <label>
                <input
                  type="radio"
                  name="local"
                  value={local.id}
                  onChange={() => handleLocalChange(local.id)}
                />
                {local.nombre_local} - ${local.precio_por_hora}/hora
              </label>
              <img
                src={getLocalImage(local.id)}
                alt={`Local ${local.nombre_local}`}
                className="option-image"
              />
            </div>
          ))}
        </fieldset>

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

        <button type="submit">Reservar</button>
      </form>

      {idReserva && (
        <form onSubmit={handleSubmitPago}>
          <h2>Realizar Pago</h2>
          <label>
            Monto Total:
            <input type="number" value={monto} readOnly />
          </label>
          <label>
            Método de Pago:
            <select
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
            >
              <option value="">Seleccione un método</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta</option>
            </select>
          </label>
          <label>
            Estado del Pago:
            <select
              value={estadoPago}
              onChange={(e) => setEstadoPago(e.target.value)}
            >
              <option value="">Seleccione un estado</option>
              <option value="1">Pendiente</option>
              <option value="2">Pagado</option>
              <option value="3">Cancelado</option>
            </select>
          </label>
          <button type="submit">Registrar Pago</button>
        </form>
      )}

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Reserva;
