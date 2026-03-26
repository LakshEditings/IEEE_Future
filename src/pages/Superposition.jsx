import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../modules.css';

export default function Superposition() {
  const [classicalState, setClassicalState] = useState(0); // 0 or 1
  const [quantumState, setQuantumState] = useState(null); // null (spinning), 0, or 1

  const handleClassicalClick = () => {
    setClassicalState(prev => (prev === 0 ? 1 : 0));
  };

  const handleQuantumClick = () => {
    if (quantumState !== null) {
      // Reset to superposition
      setQuantumState(null);
    } else {
      // Collapse
      const result = Math.random() > 0.5 ? 1 : 0;
      setQuantumState(result);
    }
  };

  return (
    <div className="module-container">
      <Link to="/" style={{ alignSelf: 'flex-start', marginBottom: '1rem', color: '#8be9ff' }}>← Back to Modules</Link>
      <h1 className="module-title">Superposition</h1>
      <p className="module-subtitle">Compare classical vs quantum behavior and observe qubit collapse.</p>
      
      <div className="module-card">
        <div className="switch-container">
          {/* Classical Section */}
          <div className="system-box">
            <h3>Classical System</h3>
            <p style={{color: '#a0aec0', fontSize: '0.9rem', textAlign: 'center'}}>Can only be 0 OR 1</p>
            
            <div 
              style={{
                width: '120px', height: '120px', borderRadius: '50%', 
                background: classicalState ? '#fff' : '#333',
                boxShadow: classicalState ? '0 0 40px #fff' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: classicalState ? '#000' : '#fff', fontSize: '2rem', fontWeight: 'bold',
                cursor: 'pointer', transition: 'all 0.3s ease'
              }}
              onClick={handleClassicalClick}
            >
              {classicalState}
            </div>
            <button className="btn-primary" onClick={handleClassicalClick}>Toggle Switch</button>
          </div>

          {/* Quantum Section */}
          <div className="system-box">
            <h3>Quantum System (Qubit)</h3>
            <p style={{color: '#a0aec0', fontSize: '0.9rem', textAlign: 'center'}}>Exists as 0 + 1 until measured</p>

            <motion.div
              onClick={handleQuantumClick}
              animate={quantumState === null ? {
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 20px #a620ff, 0 0 50px #a620ff inset", 
                  "0 0 40px #00f0ff, 0 0 80px #00f0ff inset", 
                  "0 0 20px #a620ff, 0 0 50px #a620ff inset"
                ]
              } : {
                rotate: 0,
                scale: 1,
                boxShadow: quantumState === 0 ? "0 0 30px #00f0ff" : "0 0 30px #ff007f"
              }}
              transition={quantumState === null ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
              style={{
                width: '120px', height: '120px', borderRadius: '50%',
                background: quantumState === null ? 'radial-gradient(circle, #2a0845, #6441A5)' : 
                            (quantumState === 0 ? '#00f0ff' : '#ff007f'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '1.8rem', fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {quantumState === null ? "0 + 1" : quantumState}
            </motion.div>
            <button className="btn-primary" onClick={handleQuantumClick}>
              {quantumState === null ? "Measure Qubit" : "Reset Qubit"}
            </button>
          </div>
        </div>

        <motion.div 
          className="module-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          👉 “Unlike classical systems, qubits can exist in multiple states simultaneously until measured.”
        </motion.div>
      </div>
    </div>
  );
}
