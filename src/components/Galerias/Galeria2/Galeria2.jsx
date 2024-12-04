import React from "react";
import "./galeria2.css";

const Galeria2 = () => {
  const images = [
"https://i.ibb.co/ZSb6PW8/248A7334.jpg",
"https://i.ibb.co/8P29mGL/248A7357.jpg",
"https://i.ibb.co/G5MjhZF/Eplus-1.jpg",
"https://i.ibb.co/NC0Z2BX/Eplus-2.jpg",
"https://i.ibb.co/TW93kzM/Eplus-3.jpg",
"https://i.ibb.co/xjwXgPB/006A6443.jpg",
"https://i.ibb.co/Smfz7hQ/006A6461.jpg",
"https://i.ibb.co/PTDYDXK/006A6496.jpg",
"https://i.ibb.co/GdD72bf/006A6551.jpg",
"https://i.ibb.co/HVDPmzh/248A7054.jpg",
"https://i.ibb.co/6tqs7CS/248A7091.jpg",
"https://i.ibb.co/BGHZLVt/248A7145.jpg",
   
  ];

  return (
    <div className="gallery-container">
      {/* Sección de Introducción */}
      <section className="intro-section2">
        <h1>Monet Montero</h1>
        <p>“Date el lujo”</p>
      </section>

      {/* Galería de imágenes */}
      <h1 className="gallery-title">Galería</h1>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <div key={index} className="gallery-item">
            <img src={src} alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeria2;
