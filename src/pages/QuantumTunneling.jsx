import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../modules.css';

export default function QuantumTunneling() {
  const [position, setPosition] = useState("10%");
  const [opacity, setOpacity] = useState(1);
  const [tunnels, setTunnels] = useState(false);
  const [statusText, setStatusText] = useState("Ready to throw!");
  const [isAnimating, setIsAnimating] = useState(false);

  const throwClassical = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStatusText("Classical particle bounces back from the solid wall.");
    setPosition(["10%", "45%", "10%"]);
    
    setTimeout(() => {
      setPosition("10%");
      setIsAnimating(false);
    }, 1500);
  };

  const throwQuantum = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // 50% chance to tunnel
    const willTunnel = Math.random() > 0.5;
    setTunnels(willTunnel);

    if (willTunnel) {
      setStatusText("Quantum Tunneling Successful! The particle passed through.");
      setPosition(["10%", "50%", "90%"]);
      setOpacity([1, 0.2, 1]);
    } else {
      setStatusText("Probability failed... The particle bounced back.");
      setPosition(["10%", "45%", "10%"]);
    }

    setTimeout(() => {
      setPosition("10%");
      setOpacity(1);
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <div className="module-container">
      <Link to="/" style={{ alignSelf: 'flex-start', marginBottom: '1rem', color: '#8be9ff' }}>← Back to Modules</Link>
      <h1 className="module-title">Quantum Tunneling</h1>
      <p className="module-subtitle">Particles can cross solid barriers due to quantum probability.</p>

      <div className="module-card">
        <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#a620ff', fontWeight: 'bold' }}>
          {statusText}
        </div>

        <div className="tunnel-arena">
          <div className="wall"></div>
          <motion.div 
            className="particle"
            animate={{ left: position, opacity: opacity }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          ></motion.div>
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          <button className="btn-primary" onClick={throwClassical} disabled={isAnimating}>
            Throw Classical Ball
          </button>
          <button className="btn-primary" style={{ background: 'linear-gradient(90deg, #ff007f, #a620ff)' }} onClick={throwQuantum} disabled={isAnimating}>
            Throw Quantum Particle
          </button>
        </div>

        <motion.div 
          className="module-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginTop: '2rem' }}
        >
          👉 “In quantum physics, particles can sometimes pass through solid barriers like they weren't even there.”
        </motion.div>
      </div>
    </div>
  );
}
