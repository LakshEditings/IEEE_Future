import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Superposition from './pages/Superposition';
import QuantumTunneling from './pages/QuantumTunneling';
import Entanglement from './pages/Entanglement';
import WaveParticleDuality from './pages/WaveParticleDuality';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/superposition" element={<Superposition />} />
        <Route path="/tunneling" element={<QuantumTunneling />} />
        <Route path="/entanglement" element={<Entanglement />} />
        <Route path="/duality" element={<WaveParticleDuality />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
