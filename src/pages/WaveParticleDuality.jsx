import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../modules.css';

export default function WaveParticleDuality() {
  const [mode, setMode] = useState('particle'); // 'particle' or 'wave'
  const [particles, setParticles] = useState([]);

  // Generate continuous particles for Particle Mode
  useEffect(() => {
    let interval;
    if (mode === 'particle') {
      interval = setInterval(() => {
        setParticles(prev => {
          // Keep max 20 particles on screen
          const newId = Date.now() + Math.random();
          // Two clusters (top slit or bottom slit target)
          const targetSlit = Math.random() > 0.5 ? 40 : 180;
          return [...prev.slice(-15), { id: newId, yOffset: targetSlit }];
        });
      }, 300);
    } else {
      setParticles([]);
    }
    return () => clearInterval(interval);
  }, [mode]);

  return (
    <div className="module-container">
      <Link to="/" style={{ alignSelf: 'flex-start', marginBottom: '1rem', color: '#8be9ff' }}>← Back to Modules</Link>
      <h1 className="module-title">Wave-Particle Duality</h1>
      <p className="module-subtitle">Quantum objects can behave like both particles and waves depending on how we measure them.</p>

      <div className="module-card">
        
        <div className="controls-toggle">
          <button 
            className={`toggle-btn ${mode === 'particle' ? 'active' : ''}`}
            onClick={() => setMode('particle')}
          >
            Particle Mode
          </button>
          <button 
            className={`toggle-btn ${mode === 'wave' ? 'active' : ''}`}
            onClick={() => setMode('wave')}
            style={mode === 'wave' ? { background: 'linear-gradient(90deg, #00f0ff, #fff)'} : {}}
          >
            Wave Mode
          </button>
        </div>

        <div className="duality-arena">
          {/* Source Box */}
          <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', width: '30px', height: '30px', background: '#ff007f', borderRadius: '50%', boxShadow: '0 0 20px #ff007f' }}></div>

          {/* Double Slit Barrier */}
          <div className="slit-barrier">
            <div className="solid-part" style={{ height: '30%' }}></div>
            <div className="slit"></div>
            <div className="solid-part" style={{ height: '20%' }}></div>
            <div className="slit"></div>
            <div className="solid-part" style={{ height: '30%' }}></div>
          </div>

          {/* Screen Detector */}
          <div className="screen">
            {/* The Pattern displayed on the screen gradually */}
            {mode === 'particle' ? (
               // 2 stripes pattern
               <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '65px', left: '-5px', width: '10px', height: '80px', background: '#ff007f', opacity: 0.8, boxShadow: '0 0 10px #ff007f' }}></div>
                 <div style={{ position: 'absolute', bottom: '65px', left: '-5px', width: '10px', height: '80px', background: '#ff007f', opacity: 0.8, boxShadow: '0 0 10px #ff007f' }}></div>
               </div>
            ) : (
               // Interference pattern (5 stripes)
               <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
                 <div style={{ width: '6px', height: '40px', background: '#00f0ff', opacity: 0.3, boxShadow: '0 0 15px #00f0ff' }}></div>
                 <div style={{ width: '6px', height: '50px', background: '#00f0ff', opacity: 0.6, boxShadow: '0 0 15px #00f0ff' }}></div>
                 <div style={{ width: '6px', height: '60px', background: '#00f0ff', opacity: 1, boxShadow: '0 0 20px #00f0ff' }}></div>
                 <div style={{ width: '6px', height: '50px', background: '#00f0ff', opacity: 0.6, boxShadow: '0 0 15px #00f0ff' }}></div>
                 <div style={{ width: '6px', height: '40px', background: '#00f0ff', opacity: 0.3, boxShadow: '0 0 15px #00f0ff' }}></div>
               </div>
            )}
          </div>

          {/* Animations Area */}
          {mode === 'particle' && particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ left: '50px', top: '165px', opacity: 1 }}
              animate={{ left: '95%', top: `${p.yOffset}px`, opacity: 0 }}
              transition={{ duration: 1.5, ease: "linear" }}
              style={{ position: 'absolute', width: '8px', height: '8px', background: '#ff007f', borderRadius: '50%', boxShadow: '0 0 10px #ff007f' }}
            />
          ))}

          {mode === 'wave' && (
            <svg width="100%" height="100%" style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
              {/* Concentric rings from source */}
              <motion.circle cx="35" cy="175" r="40" stroke="#00f0ff" strokeWidth="2" fill="none" opacity="0" animate={{ r: [null, 400], opacity: [0.8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
              <motion.circle cx="35" cy="175" r="40" stroke="#00f0ff" strokeWidth="2" fill="none" opacity="0" animate={{ r: [null, 400], opacity: [0.8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }} />
              <motion.circle cx="35" cy="175" r="40" stroke="#00f0ff" strokeWidth="2" fill="none" opacity="0" animate={{ r: [null, 400], opacity: [0.8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }} />

              {/* Rings from top slit */}
              <motion.circle cx="50%" cy="100" r="10" stroke="#00f0ff" strokeWidth="2" fill="none" opacity="0" animate={{ r: [null, 300], opacity: [0.5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.5 }} />
              <motion.circle cx="50%" cy="100" r="10" stroke="#00f0ff" strokeWidth="2" fill="none" opacity="0" animate={{ r: [null, 300], opacity: [0.5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 2.3 }} />

              {/* Rings from bottom slit */}
              <motion.circle cx="50%" cy="230" r="10" stroke="#00f0ff" strokeWidth="2" fill="none" opacity="0" animate={{ r: [null, 300], opacity: [0.5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.5 }} />
              <motion.circle cx="50%" cy="230" r="10" stroke="#00f0ff" strokeWidth="2" fill="none" opacity="0" animate={{ r: [null, 300], opacity: [0.5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 2.3 }} />
            </svg>
          )}
        </div>

        <motion.div 
          className="module-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '2rem' }}
        >
          👉 “Quantum objects can behave like particles (forming clusters) or like waves (forming interference patterns).”
        </motion.div>

      </div>
    </div>
  );
}
