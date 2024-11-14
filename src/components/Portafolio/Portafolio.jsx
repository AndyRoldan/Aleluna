import React from 'react';
import { Link } from 'react-router-dom';
import './portafolio.css';

const Portafolio = () => {
  return (
    <div className="portfolio-container">
      
      {/* Sección de Introducción */}
      <section className="intro-section">
        <h1>AleLuna</h1>
        <p>Capturamos los momentos más importantes de tu vida con la mejor calidad y profesionalismo.</p>
      </section>
      {/* Galería de Fotos */}
      <section className="gallery-section">
        <h2>Galería de Eventos</h2>
        <div className="gallery-grid">
          <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5" alt="Evento 1" />
          <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5" alt="Evento 2" />
          <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5" alt="Evento 3" />
          <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5" alt="Evento 4" />
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="services-section">
        <h2>Nuestros Servicios</h2>
        <div className="services-list">
          <div className="service-item full-width" style={{"height":"200px"}}>
            <img src="https://i.ibb.co/9NPLQTv/248A7145.jpg" alt="Fotografía Profesional" className="service-image" />
            <h2>Fotografía Profesional</h2>
            <p>Sesiones de fotos para bodas, quinceañeras, y eventos especiales.</p>
          </div>
        </div>
      </section>

      {/* Sección de Servicios Extras */}
      <section className="services-section-extra">
        <h2>Extras para Tu Evento</h2>
        <div className="services-list extras-horizontal">
          <div className="service-item half-width">
            <img src="https://i.ibb.co/L6hp5CW/248A8041.jpg" alt="Alquiler de Limosinas" className="service-image" />
            <h3>Limosinas</h3>
            <p>Haz que tu evento sea inolvidable con nuestras elegantes limosinas.</p>
          </div>
          <div className="service-item half-width">
            <img src="https://i.ibb.co/8dQw4wk/006A7177.jpg" alt="Alquiler de Locales" className="service-image" />
            <h3>Salón de Eventos</h3>
            <p>Espacios amplios y elegantes para celebrar tus eventos.</p>
          </div>
        </div>
      </section>

  {/* Llamada a la Acción con información de contacto */}
  <section className="cta-section">
        <div className="cta-content">
          
          <div className="cta-icons">
            <a href="https://www.tiktok.com/@alelunastudiollc?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer"><img src="https://i.ibb.co/4Zccyc3/tik-tok-logo-icon-147226.png" alt="TikTok" /></a>
            <a href="https://wa.me/15712520595" target="_blank" rel="noopener noreferrer"><img src="https://i.ibb.co/84ydRqX/whatsapp-icon-icons-com-62756.png" alt="WhatsApp" /></a>
            <a href="https://www.facebook.com/AleLunaStudioLLC" target="_blank" rel="noopener noreferrer"><img src="https://i.ibb.co/bdrjDSy/facebook-logo-icon-147291.png" alt="Facebook" /></a>
            <a href="https://www.instagram.com/aleluna_studio/" target="_blank" rel="noopener noreferrer"><img src="https://i.ibb.co/R4j0rZK/Instagram-icon-icons-com-66804.png" alt="Instagram" /></a>
            <a href="https://www.youtube.com/channel/UCpaKyt4YduQC1rkuEArrcDQ" target="_blank" rel="noopener noreferrer"><img src="https://i.ibb.co/WBh2k94/youtube-logo-icon-168737-2.png" alt="YouTube" /></a>
          </div>
          
          <div className="cta-info">
            <h2>ALELUNA STUDIO LLC</h2>
            <p>Creative Photo + Film<br />& Entertainment Services</p>
            <p>Email Address: alelunastudio@gmail.com</p>
            <p>Phone Number: (571) 252 0595</p>
          </div>
        </div>
      </section>
      
    </div>
    
  );
};

export default Portafolio;