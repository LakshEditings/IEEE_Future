import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../modules.css';
import soundEngine from '../utils/soundEngine';

export default function Entanglement() {
  const [diceA, setDiceA] = useState("?");
  const [diceB, setDiceB] = useState("?");
  const [isRolling, setIsRolling] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const [sharedGlow, setSharedGlow] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setDiceB("?"); // Reset Dice B while A is rolling
    
    soundEngine.playDiceEcho();

    let rolls = 0;
    const interval = setInterval(() => {
      setDiceA(Math.floor(Math.random() * 6) + 1);
      rolls++;
      
      if (rolls > 15) {
        clearInterval(interval);
        
        soundEngine.playStereoTone(true); // Left speaker

        // Dice A Settles
        const finalResult = Math.floor(Math.random() * 6) + 1;
        setDiceA(finalResult);
        
        // Trigger pulse transfer
        setPulseActive(true);

        setTimeout(() => {
           setPulseActive(false);
           soundEngine.playStereoTone(false); // Right speaker
           
           // Pulse arrived -> Update B
           setDiceB(finalResult);
           setSharedGlow(true);
           
           setTimeout(() => {
             setSharedGlow(false);
             setIsRolling(false);
           }, 800); // glow duration

        }, 400); // 400ms visual transfer delay
      }
    }, 100);
  };

  return (
    <div className="module-container">
      <Link to="/" style={{ alignSelf: 'flex-start', marginBottom: '1rem', color: '#8be9ff' }}>← Back to Modules</Link>
      <h1 className="module-title">Quantum Entanglement</h1>
      <p className="module-subtitle">A visual representation of state sharing across a distance.</p>

      <div className="module-card">
        
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ color: '#a0aec0', marginBottom: '1rem' }}>Click Dice A to determine its state. Watch the connection propagate!</p>

          <div className="dice-container">
            {/* The energy connection line */}
            <div className="energy-line" style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
              <motion.div 
                style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, #8be9ff, transparent)' }}
                animate={{ opacity: isRolling || sharedGlow ? 0.8 : 0.2 }}
                transition={{ duration: 0.3 }}
              />
              <AnimatePresence>
                {pulseActive && (
                  <motion.div
                    initial={{ left: 0 }}
                    animate={{ left: '100%' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "linear" }}
                    style={{ position: 'absolute', top: 0, width: '40px', height: '100%', background: '#fff', boxShadow: '0 0 20px #fff, 0 0 40px #00f0ff' }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* DICE A */}
            <div className="dice-wrapper" onClick={rollDice}>
              <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Dice A</h3>
              <motion.div 
                className="dice"
                animate={
                  isRolling && !pulseActive && !sharedGlow ? { rotate: [0, 180, 360], scale: [1, 1.1, 1], boxShadow: "0 0 30px rgba(166, 32, 255, 0.8) inset" } : 
                  sharedGlow ? { scale: [1, 1.15, 1], boxShadow: "0 0 50px #fff, 0 0 30px #a620ff inset", borderColor: '#fff' } :
                  { rotate: 0, scale: 1, boxShadow: "0 0 30px rgba(166, 32, 255, 0.5) inset, 0 0 20px rgba(166, 32, 255, 0.5)", borderColor: '#a620ff' }
                }
                transition={{ duration: 0.3, repeat: isRolling && !pulseActive && !sharedGlow ? Infinity : 0 }}
              >
                {diceA}
              </motion.div>
            </div>

            {/* DICE B */}
            <div className="dice-wrapper">
              <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Dice B</h3>
              <motion.div 
                className="dice"
                animate={
                  sharedGlow ? { scale: [1, 1.15, 1], boxShadow: "0 0 50px #fff, 0 0 30px #00f0ff inset", borderColor: '#fff' } :
                  { scale: 1, boxShadow: '0 0 30px rgba(0, 240, 255, 0.5) inset, 0 0 20px rgba(0, 240, 255, 0.5)', borderColor: '#00f0ff' }
                }
                transition={{ duration: 0.3 }}
              >
                {diceB}
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div 
          className="module-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          👉 “Entangled particles share connected outcomes instantly, even at a distance.”
        </motion.div>

      </div>
    </div>
  );
}
