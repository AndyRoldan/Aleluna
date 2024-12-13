import React from "react";
import "./galeria1.css";

const Galeria1 = () => {
  const images = [
    "https://i.ibb.co/1nQcb0Y/Jaymi-8.jpg",
    "https://i.ibb.co/p14BJgG/Jaymi-9.jpg",
    "https://i.ibb.co/yBRDSNR/Jaymi-10.jpg",
    "https://i.ibb.co/bdzZ7KX/Jaymi-11.jpg",
    "https://i.ibb.co/m0WV2gY/Jaymi-12.jpg",
    "https://i.ibb.co/wSCTMjr/Jaymi-13.jpg",
    "https://i.ibb.co/7NN43Wz/Jaymi-14.jpg",
    "https://i.ibb.co/D1zzMMZ/Jaymi-15.jpg",
    "https://i.ibb.co/PwjQsWn/Jaymi-16.jpg",
    "https://i.ibb.co/bQNHGBB/Jaymi-17.jpg",
    "https://i.ibb.co/hfk7xZK/Jaymi-18.jpg",
    "https://i.ibb.co/JBm57wc/Jaymi-19.jpg",
    "https://i.ibb.co/Qc49sMR/Jaymi-20.jpg",
    "https://i.ibb.co/60rW4N0/Jaymi-21.jpg",
    "https://i.ibb.co/LCcgNf2/Jaymi-22.jpg",
    "https://i.ibb.co/DQGCrWx/Jaymi-23.jpg",
    "https://i.ibb.co/gy9hGgk/Jaymi-24.jpg",
    "https://i.ibb.co/xGKVf36/Jaymi-25.jpg",
    "https://i.ibb.co/nrz1x2y/Jaymi-26.jpg",
    "https://i.ibb.co/hYGPzR9/Jaymi-27.jpg",
    "https://i.ibb.co/SNkgQmF/Jaymi-28.jpg",
    "https://i.ibb.co/drPjS7g/Jaymi-29.jpg",
    "https://i.ibb.co/RykrDwn/Jaymi-30.jpg",
    "https://i.ibb.co/ZWhHGMF/Jaymi-31.jpg",
    "https://i.ibb.co/WkDwNyq/Jaymi-32.jpg",
    "https://i.ibb.co/M2qfQ1k/Jaymi-33.jpg",
    "https://i.ibb.co/3sKZSzR/Jaymi-34.jpg",
    "https://i.ibb.co/JqFVgJh/Jaymi-35.jpg",
    "https://i.ibb.co/RSdcMCs/Jaymi-36.jpg",
    "https://i.ibb.co/yNmJS0t/Jaymi-37.jpg",
    "https://i.ibb.co/syGVgtz/Jaymi-38.jpg",
    "https://i.ibb.co/mbjsXWf/Jaymi-39.jpg",
    "https://i.ibb.co/X5v4M8r/Jaymi-40.jpg",
    "https://i.ibb.co/cCnntFY/Jaymi-41.jpg",
    "https://i.ibb.co/zRSskHP/Jaymi-42.jpg",
    "https://i.ibb.co/tz89BXN/Jaymi-43.jpg",
    "https://i.ibb.co/6vM6jQL/Jaymi-44.jpg",
    "https://i.ibb.co/brWPbxb/Jaymi-45.jpg",
    "https://i.ibb.co/Fbzg20Z/Jaymi-46.jpg",
    "https://i.ibb.co/Cb3W36C/Jaymi-47.jpg",
   
  ];

  return (
    <div className="gallery-container">
      {/* Sección de Introducción */}
      <section className="intro-section1">
        <h1>Jaymi Quintanilla</h1>
        <p>“La magia existe si tú decides que así sea”</p>
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

export default Galeria1;
