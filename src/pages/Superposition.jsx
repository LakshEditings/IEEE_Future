import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../modules.css';
import soundEngine from '../utils/soundEngine';

export default function Superposition() {
  const [classicalOn, setClassicalOn] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [isMeasured, setIsMeasured] = useState(false);
  const [flash, setFlash] = useState(false);

  // Derive light brightness and state
  const isSuperposition = !isMeasured && sliderValue > 0 && sliderValue < 100;
  
  const getLightStyle = () => {
    if (isMeasured) {
      return {
        background: sliderValue === 100 ? '#fff' : '#222',
        boxShadow: sliderValue === 100 ? '0 0 50px #fff, 0 0 100px #fff' : 'none',
      };
    }
    
    // In superposition, map lever (0-100) to brightness
    const intensity = sliderValue / 100;
    const colorVal = Math.floor(34 + intensity * (255 - 34)); // #222 to #fff
    const glow = intensity * 60;
    
    return {
      background: `rgb(${colorVal}, ${colorVal}, ${colorVal})`,
      boxShadow: `0 0 ${glow}px rgba(255,255,255,${intensity}), 0 0 ${glow * 2}px rgba(255,255,255,${intensity * 0.5})`
    };
  };

  useEffect(() => {
    if (isSuperposition) {
      soundEngine.startAmbientShimmer();
    } else {
      soundEngine.stopAmbientShimmer();
    }
    return () => soundEngine.stopAmbientShimmer();
  }, [isSuperposition]);

  const measure = () => {
    soundEngine.stopHum();
    soundEngine.playSnap();
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      soundEngine.playWhoosh();
    }, 150);
    // Random collapse
    const result = Math.random() > 0.5 ? 100 : 0;
    setSliderValue(result);
    setIsMeasured(true);
  };

  const reset = () => {
    setSliderValue(50);
    setIsMeasured(false);
  };

  const handleSlider = (e) => {
    setSliderValue(Number(e.target.value));
    setIsMeasured(false);
    soundEngine.playHum(Number(e.target.value));
  };

  return (
    <div className="module-container" style={{ background: '#0a0a0a', minHeight: '100vh', padding: '2rem', color: '#e0e0e0' }}>
      <Link to="/" style={{ alignSelf: 'flex-start', marginBottom: '1rem', color: '#888', textDecoration: 'none' }}>← Back to Modules</Link>
      
      <h1 className="module-title" style={{ background: 'none', color: '#fff', textShadow: 'none', backgroundClip: 'initial', WebkitTextFillColor: 'initial' }}>
        Superposition
      </h1>
      <p className="module-subtitle" style={{ color: '#888' }}>
        Quantum superposition using a lever-controlled light in grayscale.
      </p>
      
      {flash && <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'white', zIndex: 9999, opacity: 0.8 }}></div>}

      <div className="module-card" style={{ background: '#111', border: '1px solid #333', boxShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
        <div className="switch-container" style={{ gap: '6rem', alignItems: 'flex-start' }}>
          
          {/* Classical Switch */}
          <div className="system-box" style={{ background: '#1a1a1a', border: '1px solid #333' }}>
            <h3 style={{ color: '#ddd' }}>Classical Switch</h3>
            <p style={{ color: '#888', fontSize: '0.85rem', textAlign: 'center' }}>Classical: Only one state<br/>(ON or OFF)</p>
            
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: classicalOn ? '#fff' : '#222',
              boxShadow: classicalOn ? '0 0 50px #fff, 0 0 100px #fff' : 'none',
              transition: 'all 0.1s ease', margin: '2rem 0'
            }} />
            
            {/* Simple toggle switch UI */}
            <div 
              onClick={() => setClassicalOn(!classicalOn)}
              style={{
                width: '60px', height: '30px', background: classicalOn ? '#fff' : '#444', 
                borderRadius: '15px', position: 'relative', cursor: 'pointer', transition: '0.3s'
              }}
            >
              <div style={{
                width: '26px', height: '26px', background: classicalOn ? '#000' : '#888',
                borderRadius: '50%', position: 'absolute', top: '2px', 
                left: classicalOn ? '32px' : '2px', transition: '0.3s'
              }} />
            </div>
            <span style={{ fontWeight: 'bold' }}>{classicalOn ? "ON" : "OFF"}</span>
          </div>

          {/* Quantum Lever System */}
          <div className="system-box" style={{ background: '#1a1a1a', border: '1px solid #333', minWidth: '350px' }}>
            <h3 style={{ color: '#ddd' }}>Quantum Lever System</h3>
            <p style={{ color: '#888', fontSize: '0.85rem', textAlign: 'center' }}>System in mixed state (superposition)<br/>until measured</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', margin: '2rem 0' }}>
              
              {/* Vertical Slider Wrapper */}
              <div style={{ height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#888', marginBottom: '10px' }}>1</span>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={sliderValue} 
                  onChange={handleSlider}
                  onMouseUp={() => soundEngine.stopHum()}
                  onTouchEnd={() => soundEngine.stopHum()}
                  style={{
                    appearance: 'slider-vertical',
                    width: '8px', height: '100%',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ fontSize: '0.8rem', color: '#888', marginTop: '10px' }}>0</span>
              </div>

              {/* Quantum Light Bulb */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <motion.div
                  animate={isSuperposition ? {
                    opacity: [0.9, 1, 0.9],
                    scale: [1, 1.02, 1]
                  } : {}}
                  transition={{ duration: 0.2, repeat: Infinity, repeatType: 'reverse' }}
                  style={{
                    width: '100px', height: '100px', borderRadius: '50%',
                    ...getLightStyle(),
                    transition: isMeasured ? 'none' : 'background 0.3s, box-shadow 0.3s'
                  }}
                />
                <span style={{ fontWeight: 'bold', color: '#aaa' }}>
                  {isMeasured ? (sliderValue === 100 ? "1" : "0") : `0 + 1`}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={measure}
                style={{
                  background: '#fff', color: '#000', border: 'none', padding: '0.8rem 1.5rem',
                  fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(255,255,255,0.4)'
                }}
              >
                MEASURE
              </button>
              <button 
                onClick={reset}
                style={{
                  background: '#333', color: '#fff', border: '1px solid #555', padding: '0.8rem 1.5rem',
                  fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer'
                }}
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
