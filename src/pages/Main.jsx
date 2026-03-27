import React from 'react';
import { Link } from 'react-router-dom';

import imgSuperposition from '../assets/superposition.png';
import imgTunneling from '../assets/tunneling.png';
import imgEntanglement from '../assets/entanglement.png';
import imgDuality from '../assets/duality.png';

const modules = [
  { id: 1, title: 'Superposition', image: imgSuperposition, route: '/superposition' },
  { id: 2, title: 'Quantum Tunneling', image: imgTunneling, route: '/tunneling' },
  { id: 3, title: 'Entanglement', image: imgEntanglement, route: '/entanglement' },
  { id: 4, title: 'Wave-Particle Duality', image: imgDuality, route: '/duality' },
];

export default function Main() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
      <h1 className="title-glow">Inside Quantum</h1>
      <p className="subtitle">Click a module to explore</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {modules.map((mod) => (
          <Link to={mod.route} key={mod.id}>
            <div className="card">
              <div className="card-image-wrapper">
                <img src={mod.image} alt={mod.title} className="card-image" />
              </div>
              <div className="card-title">
                {mod.title}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '4rem' }}>
        <Link to="/team" style={{
          display: 'inline-block', padding: '12px 24px', borderRadius: '30px', 
          background: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00f0ff', 
          color: '#00f0ff', fontWeight: 'bold', textDecoration: 'none',
          boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)', transition: 'all 0.3s'
        }}
        onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.8)'}
        onMouseOut={e => e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.3)'}
        >
          Built by IEEE-BIT Students →
        </Link>
      </div>
  );
}
