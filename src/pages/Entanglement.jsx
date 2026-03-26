import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../modules.css';

export default function Entanglement() {
  const [diceA, setDiceA] = useState("?");
  const [diceB, setDiceB] = useState("?");
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    
    let rolls = 0;
    const interval = setInterval(() => {
      setDiceA(Math.floor(Math.random() * 6) + 1);
      setDiceB(Math.floor(Math.random() * 6) + 1);
      rolls++;
      
      if (rolls > 15) {
        clearInterval(interval);
        // Entangled result: they must instantly match!
        const finalResult = Math.floor(Math.random() * 6) + 1;
        setDiceA(finalResult);
        setDiceB(finalResult);
        setIsRolling(false);
      }
    }, 100);
  };

  return (
    <div className="module-container">
      <Link to="/" style={{ alignSelf: 'flex-start', marginBottom: '1rem', color: '#8be9ff' }}>← Back to Modules</Link>
      <h1 className="module-title">Quantum Entanglement</h1>
      <p className="module-subtitle">Two particles instantly share connected states across any distance.</p>

      <div className="module-card">
        
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ color: '#a0aec0', marginBottom: '1rem' }}>Click Dice A to roll it. Notice how Dice B responds!</p>

          <div className="dice-container">
            {/* The energy connection line */}
            <motion.div 
              className="energy-line"
              animate={isRolling ? {
                boxShadow: ["0 0 10px #8be9ff", "0 0 30px #a620ff", "0 0 10px #8be9ff"],
                opacity: [0.5, 1, 0.5]
              } : {
                boxShadow: "0 0 5px #8be9ff",
                opacity: 0.3
              }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            ></motion.div>

            {/* DICE A */}
            <div className="dice-wrapper" onClick={rollDice}>
              <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Dice A</h3>
              <motion.div 
                className="dice"
                animate={isRolling ? { rotate: [0, 180, 360], scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.3, repeat: isRolling ? Infinity : 0 }}
              >
                {diceA}
              </motion.div>
            </div>

            {/* DICE B */}
            <div className="dice-wrapper">
              <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Dice B</h3>
              <motion.div 
                className="dice"
                animate={isRolling ? { rotate: [0, -180, -360], scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.3, repeat: isRolling ? Infinity : 0 }}
                style={{ borderColor: '#00f0ff', boxShadow: '0 0 30px rgba(0, 240, 255, 0.5) inset, 0 0 20px rgba(0, 240, 255, 0.5)' }}
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
