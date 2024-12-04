// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./reserva.css";

// const Reserva = () => {
//   const [id_cliente, setIdCliente] = useState(null);
//   const [paquetes, setPaquetes] = useState([]);
//   const [selectedPaquete, setSelectedPaquete] = useState(null);
//   const [selectedPaqueteDetails, setSelectedPaqueteDetails] = useState(null);
//   const [limosinas, setLimosinas] = useState([]);
//   const [selectedLimosina, setSelectedLimosina] = useState(null);
//   const [selectedLimosinaDetails, setSelectedLimosinaDetails] = useState(null);
//   const [locales, setLocales] = useState([]);
//   const [selectedLocal, setSelectedLocal] = useState(null);
//   const [selectedLocalDetails, setSelectedLocalDetails] = useState(null);
//   const [fechaReserva, setFechaReserva] = useState("");
//   const [horaInicio, setHoraInicio] = useState("");
//   const [horaFin, setHoraFin] = useState("");
//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);
//   const [modalImage, setModalImage] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedIdCliente = localStorage.getItem("userId");
//     if (storedIdCliente) {
//       const parsedId = parseInt(storedIdCliente, 10);
//       if (!isNaN(parsedId)) {
//         setIdCliente(parsedId);
//       } else {
//         console.error("El ID del cliente en localStorage no es un número válido.");
//       }
//     } else {
//       console.error("ID del cliente no encontrado en localStorage.");
//     }
//   }, []);

//   useEffect(() => {
//     const fetchData = async (url, setData) => {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Error al cargar los datos.");
//         }
//         const data = await response.json();
//         setData(data);
//       } catch (err) {
//         console.error(`Error al cargar datos desde ${url}:`, err);
//         setError("No se pudieron cargar los datos.");
//       }
//     };

//     fetchData("http://localhost:3077/api/packages", setPaquetes);
//     fetchData("http://localhost:3077/api/limosinas", setLimosinas);
//     fetchData("http://localhost:3077/api/locales", setLocales);
//   }, []);

//   const handlePaqueteChange = (id) => {
//     setSelectedPaquete(id);
//     const paquete = paquetes.find((pkg) => pkg.id === id);
//     if (paquete) setSelectedPaqueteDetails(paquete);
//   };

//   const handleLimosinaChange = (id) => {
//     setSelectedLimosina(id);
//     const limosina = limosinas.find((limo) => limo.id_limosina === id);
//     if (limosina) setSelectedLimosinaDetails(limosina);
//   };

//   const handleLocalChange = (id) => {
//     setSelectedLocal(id);
//     const local = locales.find((loc) => loc.id === id);
//     if (local) setSelectedLocalDetails(local);
//   };

//   const handleImageClick = (url) => {
//     setModalImage(url);
//   };

//   const handleCloseModal = () => {
//     setModalImage(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     const fecha_reserva = fechaReserva
//       ? new Date(fechaReserva).toISOString().split("T")[0]
//       : null;

//     const body = {
//       id_cliente,
//       id_paquete: selectedPaquete,
//       id_local: selectedLocal,
//       id_limusina: selectedLimosina,
//       fecha_reserva,
//       hora_inicio: horaInicio,
//       hora_fin: horaFin,
//     };

//     try {
//       const response = await fetch("http://localhost:3077/api/reservas", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.error || "Error al crear la reserva.");
//       }

//       const data = await response.json();
//       setSuccess("Reserva creada exitosamente.");
//       // Enviar los detalles de la reserva al componente Pago
//       navigate("/pago", { state: { reserva: data } });
//     } catch (err) {
//       setError(err.message || "Ocurrió un error inesperado al crear la reserva.");
//     }
//   };

//   const getLimosinaImage = (id) => {
//     const images = {
//       1: "https://www.gladysocana.com/wp-content/uploads/limo-towncar-exterior-001.jpg",
//       2: "https://c4.wallpaperflare.com/wallpaper/981/727/663/white-street-hummer-hamer-wallpaper-preview.jpg",
//       3: "https://s0.smartresize.com/wallpaper/986/262/HD-wallpaper-2016-white-chrysler-300-10-passenger-limousine-car-chrysler-luxury-limousine-10-passenger-300.jpg",
//     };
//     return images[id] || "https://via.placeholder.com/150";
//   };

//   const getLocalImage = (id) => {
//     const images = {
//       1: "https://cdn0.bodas.com.mx/vendor/2431/3_2/960/jpg/boda-de-laura-matthew-2_5_132431.jpeg",
//       2: "https://cdn0.matrimonio.com.co/vendor/4187/3_2/960/jpg/boda-381_10_94187-158154487439557.jpeg",
//       3: "https://image-tc.galaxy.tf/wijpeg-dnpu6z3r973dy2v3309fl289n/img-20210630-wa0018.jpg?width=1920",
//     };
//     return images[id] || "https://via.placeholder.com/150";
//   };

//   return (
//     <div className="reserva-container">
//       {modalImage && (
//         <div className="modal" onClick={handleCloseModal}>
//           <img src={modalImage} alt="Vista ampliada" className="modal-image" />
//         </div>
//       )}
//       {id_cliente ? (
//         <div className="reserva-box">
//           <h1>Crear Reserva</h1>

//           {/* Paquetes */}
//           <fieldset>
//             <legend>Paquetes de Fotos</legend>
//             {paquetes.map((paquete) => (
//               <div key={paquete.id}>
//                 <label>
//                   <input
//                     type="radio"
//                     name="paquete"
//                     value={paquete.id}
//                     onChange={() => handlePaqueteChange(paquete.id)}
//                   />
//                   {paquete.nombre} - ${paquete.precio}
//                 </label>
//               </div>
//             ))}
//             {selectedPaqueteDetails && (
//               <table className="details-table">
//                 <thead>
//                   <tr>
//                     <th>Nombre</th>
//                     <th>Descripción</th>
//                     <th>Precio</th>
//                     <th>Duración</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{selectedPaqueteDetails.nombre}</td>
//                     <td>{selectedPaqueteDetails.descripcion}</td>
//                     <td>${selectedPaqueteDetails.precio}</td>
//                     <td>{selectedPaqueteDetails.hora_servicio} horas</td>
//                   </tr>
//                 </tbody>
//               </table>
//             )}
//           </fieldset>

//           {/* Limosinas */}
//           <fieldset>
//             <legend>Limosinas</legend>
//             {limosinas.map((limosina) => (
//               <div key={limosina.id_limosina}>
//                 <label>
//                   <input
//                     type="radio"
//                     name="limosina"
//                     value={limosina.id_limosina}
//                     onChange={() => handleLimosinaChange(limosina.id_limosina)}
//                   />
//                   <img
//                     src={getLimosinaImage(limosina.id_limosina)}
//                     alt={limosina.modelo}
//                     className="option-image"
//                     onClick={() =>
//                       handleImageClick(getLimosinaImage(limosina.id_limosina))
//                     }
//                   />
//                   {limosina.modelo}
//                 </label>
//               </div>
//             ))}
//             {selectedLimosinaDetails && (
//               <table className="details-table">
//                 <thead>
//                   <tr>
//                     <th>Modelo</th>
//                     <th>Capacidad</th>
//                     <th>Precio por Hora</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{selectedLimosinaDetails.modelo}</td>
//                     <td>{selectedLimosinaDetails.capacidad} personas</td>
//                     <td>${selectedLimosinaDetails.precio_por_hora}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             )}
//           </fieldset>

//           {/* Locales */}
//           <fieldset>
//             <legend>Locales</legend>
//             {locales.map((local) => (
//               <div key={local.id}>
//                 <label>
//                   <input
//                     type="radio"
//                     name="local"
//                     value={local.id}
//                     onChange={() => handleLocalChange(local.id)}
//                   />
//                   <img
//                     src={getLocalImage(local.id)}
//                     alt={local.nombre_local}
//                     className="option-image"
//                     onClick={() => handleImageClick(getLocalImage(local.id))}
//                   />
//                   {local.nombre_local}
//                 </label>
//               </div>
//             ))}
//             {selectedLocalDetails && (
//               <table className="details-table">
//                 <thead>
//                   <tr>
//                     <th>Nombre</th>
//                     <th>Dirección</th>
//                     <th>Precio</th>
//                     <th>Capacidad</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{selectedLocalDetails.nombre_local}</td>
//                     <td>{selectedLocalDetails.direccion}</td>
//                     <td>${selectedLocalDetails.precio_por_hora}</td>
//                     <td>{selectedLocalDetails.capacidad} personas</td>
//                   </tr>
//                 </tbody>
//               </table>
//             )}
//           </fieldset>

//           {/* Fecha y Hora */}
//           <fieldset>
//             <legend>Detalles de la Reserva</legend>
//             <div>
//               <label>
//                 Fecha de Reserva:
//                 <input
//                   type="date"
//                   value={fechaReserva}
//                   onChange={(e) => setFechaReserva(e.target.value)}
//                 />
//               </label>
//               <label>
//                 Hora de Inicio:
//                 <input
//                   type="time"
//                   value={horaInicio}
//                   onChange={(e) => setHoraInicio(e.target.value)}
//                 />
//               </label>
//               <label>
//                 Hora de Fin:
//                 <input
//                   type="time"
//                   value={horaFin}
//                   onChange={(e) => setHoraFin(e.target.value)}
//                 />
//               </label>
//             </div>
//           </fieldset>

//           <button onClick={handleSubmit}>Reservar</button>
//           {success && <p className="success-message">{success}</p>}
//           {error && <p className="error-text">{error}</p>}
//         </div>
//       ) : (
//         <p>Cargando datos del cliente...</p>
//       )}
//     </div>
//   );
// };

// export default Reserva;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [monto, setMonto] = useState(0);
  const [metodoPago, setMetodoPago] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [tarjetaInfo, setTarjetaInfo] = useState({
    numero: "",
    nombre: "",
    vencimiento: "",
    cvv: "",
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const navigate = useNavigate();

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
    const paquetePrecio = selectedPaqueteDetails?.precio || 0;
    const limosinaPrecio = selectedLimosinaDetails?.precio_por_hora || 0;
    const localPrecio = selectedLocalDetails?.precio_por_hora || 0;

    setMonto(paquetePrecio + limosinaPrecio + localPrecio);
  }, [selectedPaqueteDetails, selectedLimosinaDetails, selectedLocalDetails]);

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

  const handleImageClick = (url) => {
    setModalImage(url);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const fecha_reserva = fechaReserva
      ? new Date(fechaReserva).toISOString().split("T")[0]
      : null;

    const reservaBody = {
      id_cliente,
      id_paquete: selectedPaquete,
      id_local: selectedLocal,
      id_limusina: selectedLimosina,
      fecha_reserva,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
    };

    try {
      const reservaResponse = await fetch("http://localhost:3077/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservaBody),
      });

      if (!reservaResponse.ok) {
        const data = await reservaResponse.json();
        throw new Error(data.error || "Error al crear la reserva.");
      }

      const reservaData = await reservaResponse.json();

      const pagoBody = {
        monto,
        metodo_pago: metodoPago,
        fecha_pago: fechaPago || new Date().toISOString().split("T")[0],
        id_reserva: reservaData.reserva.id_reserva,
        id_estado: metodoPago === "Efectivo" ? 2 : 1,
      };

      const pagoResponse = await fetch("http://localhost:3077/api/pagos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pagoBody),
      });

      if (!pagoResponse.ok) {
        const data = await pagoResponse.json();
        throw new Error(data.error || "Error al procesar el pago.");
      }

      setSuccess("Reserva y pago realizados exitosamente.");
      console.log("Reserva y Pago completados");
    } catch (err) {
      setError(err.message || "Ocurrió un error inesperado.");
    }
  };

  const getLimosinaImage = (id) => {
    const images = {
      1: "https://www.gladysocana.com/wp-content/uploads/limo-towncar-exterior-001.jpg",
      2: "https://c4.wallpaperflare.com/wallpaper/981/727/663/white-street-hummer-hamer-wallpaper-preview.jpg",
      3: "https://s0.smartresize.com/wallpaper/986/262/HD-wallpaper-2016-white-chrysler-300-10-passenger-limousine-car-chrysler-luxury-limousine-10-passenger-300.jpg",
    };
    return images[id] || "https://via.placeholder.com/150";
  };

  const getLocalImage = (id) => {
    const images = {
      1: "https://cdn0.bodas.com.mx/vendor/2431/3_2/960/jpg/boda-de-laura-matthew-2_5_132431.jpeg",
      2: "https://cdn0.matrimonio.com.co/vendor/4187/3_2/960/jpg/boda-381_10_94187-158154487439557.jpeg",
      3: "https://image-tc.galaxy.tf/wijpeg-dnpu6z3r973dy2v3309fl289n/img-20210630-wa0018.jpg?width=1920",
    };
    return images[id] || "https://via.placeholder.com/150";
  };

  return (
    <div className="reserva-container">
      {modalImage && (
        <div className="modal" onClick={handleCloseModal}>
          <img src={modalImage} alt="Vista ampliada" className="modal-image" />
        </div>
      )}

      <div className="reserva-box">
        <h1>Crear Reserva</h1>
        {/* Aquí la sección existente de reserva */}
        {/* Agrega la lógica del pago como un formulario separado */}
        {/* ... */}
      </div>
    </div>
  );
};

export default Reserva;
