import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../modules.css';
import soundEngine from '../utils/soundEngine';

export default function QuantumTunneling() {
  const [position, setPosition] = useState("10%");
  const [opacity, setOpacity] = useState(1);
  const [statusText, setStatusText] = useState("Ready to throw!");
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [attempts, setAttempts] = useState(0);
  const [successes, setSuccesses] = useState(0);

  const throwClassical = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAttempts(prev => prev + 1);
    
    setStatusText("Classical particle bounces back from the solid wall.");
    setPosition(["10%", "45%", "10%"]);
    
    setTimeout(() => soundEngine.playThud(), 750);

    setTimeout(() => {
      setPosition("10%");
      setIsAnimating(false);
    }, 1500);
  };

  const throwQuantum = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAttempts(prev => prev + 1);
    
    // 10% chance to tunnel requested by user
    const willTunnel = Math.random() <= 0.10;
    
    soundEngine.playWhoosh();

    if (willTunnel) {
      setSuccesses(prev => prev + 1);
      setStatusText("Quantum Tunneling Successful! The particle passed through.");
      setPosition(["10%", "50%", "90%"]);
      setOpacity([1, 0.2, 1]);
      setTimeout(() => soundEngine.playPhaseShift(), 750);
    } else {
      setStatusText("Probability failed... The particle bounced back.");
      setPosition(["10%", "45%", "10%"]);
      setTimeout(() => soundEngine.playFadeOut(), 750);
    }

    setTimeout(() => {
      setPosition("10%");
      setOpacity(1);
      setIsAnimating(false);
    }, 1500);
  };

  const resetStats = () => {
    setAttempts(0);
    setSuccesses(0);
    setStatusText("Counters reset. Ready to throw!");
  };

  return (
    <div className="module-container">
      <Link to="/" style={{ alignSelf: 'flex-start', marginBottom: '1rem', color: '#8be9ff' }}>← Back to Modules</Link>
      <h1 className="module-title">Quantum Tunneling</h1>
      <p className="module-subtitle">Particles can cross solid barriers due to quantum probability.</p>

      <div className="module-card">
        
        {/* Statistical Scoreboard */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '600px', marginBottom: '1.5rem', padding: '1rem 2rem', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '1.4rem', color: '#00f0ff', fontWeight: 'bold' }}>
            Success Chance: 10%
          </div>
          <div style={{ fontSize: '1.4rem', color: '#ff007f', fontWeight: 'bold' }}>
            Attempts: {attempts} | Success: {successes}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#a620ff', fontWeight: 'bold', fontSize: '1.2rem', minHeight: '30px' }}>
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

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={throwClassical} disabled={isAnimating}>
            Throw Classical Ball
          </button>
          <button className="btn-primary" style={{ background: 'linear-gradient(90deg, #ff007f, #a620ff)' }} onClick={throwQuantum} disabled={isAnimating}>
            Throw Quantum Particle
          </button>
          <button className="btn-primary" style={{ background: '#333', border: '1px solid #555', boxShadow: 'none' }} onClick={resetStats} disabled={isAnimating}>
            Reset Stats
          </button>
        </div>

        <motion.div 
          className="module-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginTop: '2rem' }}
        >
          👉 “In quantum physics, passing through barriers isn't guaranteed—it happens purely based on probability over multiple attempts.”
        </motion.div>
      </div>
    </div>
  );
}
