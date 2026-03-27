import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../modules.css';
import soundEngine from '../utils/soundEngine';

export default function WaveParticleDuality() {
  const [mode, setMode] = useState('particle'); // 'particle' | 'wave'
  const [observe, setObserve] = useState(false);
  const [activeParticles, setActiveParticles] = useState([]);
  const [screenDots, setScreenDots] = useState([]); // Accumulating hits
  const [wavePulses, setWavePulses] = useState([]);
  
  const playTick = () => {
    soundEngine.playTick();
  };

  useEffect(() => {
    if (mode === 'wave' && !observe) {
      soundEngine.startWaveSynth();
    } else {
      soundEngine.stopWaveSynth();
    }
    return () => soundEngine.stopWaveSynth();
  }, [mode, observe]);

  const prevObserveRef = useRef(observe);
  useEffect(() => {
    if (observe && !prevObserveRef.current) {
      soundEngine.playSnap();
    }
    prevObserveRef.current = observe;
  }, [observe]);

  useEffect(() => {
    if (screenDots.length === 10) {
      soundEngine.playRisingTone();
    }
  }, [screenDots.length]);

  const getTargetY = (isParticlePattern) => {
    // 350px container height. Screen is right side.
    if (isParticlePattern) {
      // 2 clusters behind the slits
      // Slits are at roughly 35% and 65% of the 350px height (122px and 227px).
      const slitY = Math.random() > 0.5 ? 122 : 227;
      // Add randomness cluster spread
      return slitY + (Math.random() * 30 - 15);
    } else {
      // 5 stripes interference pattern (Wave Pattern)
      const peaks = [50, 112, 175, 237, 300]; 
      // Weighted so center is more likely
      const roll = Math.random();
      let peakIndex;
      if (roll < 0.1) peakIndex = 0;
      else if (roll < 0.3) peakIndex = 1;
      else if (roll < 0.7) peakIndex = 2; // Center most likely
      else if (roll < 0.9) peakIndex = 3;
      else peakIndex = 4;
      
      return peaks[peakIndex] + (Math.random() * 15 - 7.5); // Tight clusters
    }
  };

  useEffect(() => {
    let interval;
    if (mode === 'particle') {
      interval = setInterval(() => {
        // Emit one dot
        const id = Date.now() + Math.random();
        // Determine its final Y target on the screen
        // Particle mode always produces 2 clusters, or 5 stripes if wave logic?
        // Wait, prompt: "Particle Mode -> 2 clusters. Observe ON -> 2 clusters. Observe OFF (Wave mode) -> 5 stripes"
        const isParticlePattern = mode === 'particle' || (mode === 'wave' && observe);
        const targetY = getTargetY(isParticlePattern);

        setActiveParticles(prev => [...prev.slice(-10), { id, startY: 175, endY: targetY }]);
        
        // After 1.5s (duration of travel), record the hit and play tick
        setTimeout(() => {
          setScreenDots(prev => [...prev, { id, y: targetY }]);
          playTick();
        }, 1500);

      }, 400); // 400ms between dots
    } else if (mode === 'wave') {
      // If wave mode and NO observe, emit ripples.
      if (!observe) {
        interval = setInterval(() => {
          const id = Date.now() + Math.random();
          setWavePulses(prev => [...prev.slice(-5), id]);
          // Also incrementally build the interference pattern on the screen organically
          setTimeout(() => {
             // add a random dot from 5-stripe pattern to simulate wave hitting screen
             const targetY = getTargetY(false); // interference pattern
             setScreenDots(prev => [...prev, { id: id + 'dot1', y: targetY }]);
             setScreenDots(prev => [...prev, { id: id + 'dot2', y: getTargetY(false) }]);
             setScreenDots(prev => [...prev, { id: id + 'dot3', y: getTargetY(false) }]);
          }, 2000);
        }, 1000);
      } else {
        // Wave mode BUT observe is ON -> emits physical particles slowly!
        interval = setInterval(() => {
          const id = Date.now() + Math.random();
          const targetY = getTargetY(true); // 2 clusters
          setActiveParticles(prev => [...prev.slice(-10), { id, startY: 175, endY: targetY }]);
          setTimeout(() => {
            setScreenDots(prev => [...prev, { id, y: targetY }]);
            playTick();
          }, 1500);
        }, 400);
      }
    }

    return () => clearInterval(interval);
  }, [mode, observe]);

  const reset = () => {
    setScreenDots([]);
    setActiveParticles([]);
    setWavePulses([]);
  };

  return (
    <div className="module-container">
      <Link to="/" style={{ alignSelf: 'flex-start', marginBottom: '1rem', color: '#8be9ff' }}>← Back to Modules</Link>
      <h1 className="module-title">Wave-Particle Duality</h1>
      <p className="module-subtitle">The same entity behaves as particles or waves depending on observation.</p>

      <div className="module-card">
        
        {/* Controls */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          
          <div className="controls-toggle">
            <button 
              className={`toggle-btn ${mode === 'particle' ? 'active' : ''}`}
              onClick={() => { setMode('particle'); reset(); }}
            >
              🔵 Particle Mode
            </button>
            <button 
              className={`toggle-btn ${mode === 'wave' ? 'active' : ''}`}
              onClick={() => { setMode('wave'); reset(); }}
              style={mode === 'wave' ? { background: 'linear-gradient(90deg, #00f0ff, #fff)'} : {}}
            >
              🌊 Wave Mode
            </button>
          </div>

          <div className="controls-toggle" style={{ background: observe ? 'rgba(255, 0, 127, 0.2)' : 'rgba(0,0,0,0.4)', border: observe ? '1px solid #ff007f' : '1px solid transparent' }}>
            <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', fontWeight: 'bold' }}>👁️ Observe:</span>
            <button 
              className={`toggle-btn ${observe === false ? 'active' : ''}`}
              onClick={() => { setObserve(false); reset(); }}
              style={observe === false ? { background: '#555' } : { color: '#888' }}
            >
              OFF
            </button>
            <button 
              className={`toggle-btn ${observe === true ? 'active' : ''}`}
              onClick={() => { setObserve(true); reset(); }}
              style={observe === true ? { background: '#ff007f', boxShadow: '0 0 15px #ff007f' } : { color: '#888' }}
            >
              ON
            </button>
          </div>

          <button onClick={reset} className="btn-primary" style={{ background: '#333', boxShadow: 'none' }}>Reset</button>

        </div>

        {/* Duality Arena */}
        <div className="duality-arena" style={{ background: '#080811', border: '1px solid #333' }}>
          
          {/* Left (Source) */}
          <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '30px', height: '30px', background: '#00f0ff', borderRadius: '50%', boxShadow: '0 0 20px #00f0ff', zIndex: 10 }}></div>
            <span style={{ position: 'absolute', top: '40px', fontSize: '10px', whiteSpace: 'nowrap', color: '#888' }}>Electron Source</span>
          </div>

          {/* Center (Barrier) */}
          <div style={{ position: 'absolute', left: '40%', width: '10px', height: '100%', background: '#222', zIndex: 5, boxShadow: '0 0 20px rgba(0,0,0,0.9)' }}>
            {/* Slit 1 */}
            <div style={{ position: 'absolute', top: '30%', width: '10px', height: '40px', background: '#080811' }}></div>
            {/* Slit 2 */}
            <div style={{ position: 'absolute', top: '60%', width: '10px', height: '40px', background: '#080811' }}></div>
          </div>

          {/* Right (Screen) */}
          <div style={{ position: 'absolute', right: '0', width: '80px', height: '100%', background: 'rgba(20, 20, 40, 0.4)', borderLeft: '2px solid rgba(0, 240, 255, 0.3)', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '10px', color: '#888' }}>Screen</span>
            
            {/* Render accumulating dots on screen */}
            {screenDots.map(dot => (
              <div 
                key={dot.id} 
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 60 + 10}px`,
                  top: `${dot.y}px`,
                  width: '4px', height: '4px',
                  background: '#fff', borderRadius: '50%',
                  boxShadow: '0 0 5px #00f0ff'
                }} 
              />
            ))}
          </div>

          {/* Particle Travel Animations */}
          <AnimatePresence>
            {activeParticles.map(p => (
              <motion.div
                key={p.id}
                initial={{ left: '40px', top: `${p.startY}px`, opacity: 1, scale: 1 }}
                animate={{ left: 'calc(100% - 80px)', top: `${p.endY}px`, opacity: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1.5, ease: "linear" }}
                style={{ 
                  position: 'absolute', width: '8px', height: '8px', 
                  background: '#fff', borderRadius: '50%', 
                  boxShadow: '0 0 10px #00f0ff, -10px 0 10px rgba(0, 240, 255, 0.5)', 
                  zIndex: 20 
                }}
              />
            ))}
          </AnimatePresence>

          {/* Wave Ripple Animations */}
          {mode === 'wave' && !observe && (
            <svg width="100%" height="100%" style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', zIndex: 1 }}>
              {wavePulses.map(id => (
                <g key={id}>
                  {/* Source ripple */}
                  <motion.circle cx="35" cy="175" r="30" stroke="#00f0ff" strokeWidth="2" fill="none"
                    initial={{ r: 30, opacity: 0.8 }}
                    animate={{ r: 400, opacity: 0 }}
                    transition={{ duration: 3, ease: "linear" }}
                  />
                  {/* Top slit secondary ripple */}
                  <motion.circle cx="40%" cy="122" r="10" stroke="#00f0ff" strokeWidth="2" fill="none"
                    initial={{ r: 10, opacity: 0 }}
                    animate={{ r: [10, 10, 400], opacity: [0, 0.6, 0] }}
                    transition={{ duration: 3, times: [0, 0.3, 1], ease: "linear" }}
                  />
                  {/* Bottom slit secondary ripple */}
                  <motion.circle cx="40%" cy="227" r="10" stroke="#00f0ff" strokeWidth="2" fill="none"
                    initial={{ r: 10, opacity: 0 }}
                    animate={{ r: [10, 10, 400], opacity: [0, 0.6, 0] }}
                    transition={{ duration: 3, times: [0, 0.3, 1], ease: "linear" }}
                  />
                </g>
              ))}
            </svg>
          )}
        </div>

        <motion.div 
          className="module-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '2rem', borderLeftColor: observe ? '#ff007f' : '#00f0ff' }}
          key={`${mode}-${observe}`}
        >
          {observe 
            ? "👉 Observation collapses the wave function! It now behaves solely as discrete particles."
            : (mode === 'particle' 
                ? "👉 Emitting discrete particles creates two distinct clusters." 
                : "👉 Unobserved waves pass through both slits and interfere, creating probability stripes.")}
        </motion.div>

      </div>
    </div>
  );
}
