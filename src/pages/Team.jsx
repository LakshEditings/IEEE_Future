import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Replace extensions if actual files are .png or .jpeg
import imgD from '../assets/Dharani.jpeg';
import imgS from '../assets/Sadhana.png';
import imgL from '../assets/Lakshen.jpeg';
import imgR from '../assets/Rukhsar.jpeg';

const teamMembers = [
  {
    id: 1,
    name: "Dharani V",
    role: "IEEE EMBS Treasurer",
    image: imgD,
    rotate: -4,
    yOffset: 0,
    namePos: 'bottom-left'
  },
  {
    id: 2,
    name: "Sadhana M",
    role: "WIE Secretary",
    image: imgS,
    rotate: 3,
    yOffset: 50,
    namePos: 'top'
  },
  {
    id: 3,
    name: "V Lakshen",
    role: "IEEE SB Secretary",
    image: imgL,
    rotate: -2,
    yOffset: -20,
    namePos: 'bottom-left'
  },
  {
    id: 4,
    name: "Rukhsar Maryam MS",
    role: "IEEE SB PRO",
    image: imgR,
    rotate: 4,
    yOffset: 30,
    namePos: 'top'
  }
];

export default function Team() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '2rem', overflow: 'hidden', position: 'relative', fontFamily: "'Times New Roman', serif" }}>
      <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', textDecoration: 'none', color: '#00ccff', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>← Back to Modules</Link>
      
      <h1 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: '900', color: '#000', margin: '2rem 0 5rem 0', letterSpacing: '2px' }}>
        THE TEAM
      </h1>

      {/* Cyber lines decoration */}
      <svg width="200" height="200" style={{ position: 'absolute', bottom: '0', left: '0', pointerEvents: 'none' }}>
        <path d="M0,150 L50,150 L50,180 L80,180 L120,200" fill="none" stroke="#00ffff" strokeWidth="4" />
        <circle cx="50" cy="150" r="5" fill="#00ffff" />
        <circle cx="120" cy="200" r="8" fill="#00ffff" />
      </svg>
      <svg width="200" height="200" style={{ position: 'absolute', bottom: '0', right: '0', pointerEvents: 'none' }}>
        <path d="M200,100 L150,100 L150,160 L100,200" fill="none" stroke="#00ffff" strokeWidth="4" />
        <circle cx="100" cy="200" r="5" fill="#00ffff" />
      </svg>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}>
        {teamMembers.map((member, index) => (
          <motion.div 
            key={member.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            style={{ 
              position: 'relative', 
              transform: `rotate(${member.rotate}deg) translateY(${member.yOffset}px)`,
              display: 'flex', flexDirection: 'column'
            }}
          >
            {/* Name at the top if applicable */}
            {member.namePos === 'top' && (
              <h2 style={{ color: '#ff3333', fontStyle: 'italic', fontWeight: '900', fontSize: '1.8rem', fontFamily: 'Impact, sans-serif', letterSpacing: '1px', alignSelf: 'center', marginBottom: '-10px', zIndex: 10 }}>
                {member.name}
              </h2>
            )}

            {/* Polaroid Box */}
            <div style={{
              background: '#fdfdfd',
              padding: '12px 12px 60px 12px',
              border: '1px solid #ddd',
              boxShadow: '0 15px 35px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.1)',
              position: 'relative',
              width: '260px'
            }}>
              {/* Paperclip */}
              <svg width="30" height="80" viewBox="0 0 30 80" style={{ position: 'absolute', top: '-30px', right: '20px', zIndex: 5, dropShadow: '2px 2px 2px rgba(0,0,0,0.3)' }}>
                <path d="M15,10 L15,60 A10,10 0 0,0 25,70 A10,10 0 0,0 35,60 L35,20 A15,15 0 0,0 5,20 L5,50 A5,5 0 0,0 15,55 L15,20" fill="none" stroke="#b0b0b0" strokeWidth="3" transform="translate(-5, 0)" />
              </svg>

              {/* Photo Area */}
              <div style={{ width: '100%', height: '280px', background: '#e0e0e0', overflow: 'hidden', border: '1px solid #eee' }}>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  onError={(e) => {
                    // Fallback to a placeholder gradient if the real photo doesn't exist yet
                    e.target.onerror = null; 
                    e.target.style.display = 'none';
                    e.target.parentNode.style.background = 'linear-gradient(135deg, #a620ff, #00f0ff)';
                  }}
                />
              </div>

              {/* Role */}
              <h3 style={{
                color: '#0066cc',
                fontStyle: 'italic',
                fontWeight: '900',
                fontSize: '1.15rem',
                textAlign: 'right',
                position: 'absolute',
                bottom: '10px',
                right: '15px',
                lineHeight: '1.1',
                whiteSpace: 'nowrap'
              }}>
                {member.role}
              </h3>
            </div>

            {/* Name at the bottom if applicable */}
            {member.namePos === 'bottom-left' && (
              <h2 style={{ color: '#ff3333', fontStyle: 'italic', fontWeight: '900', fontSize: '1.8rem', fontFamily: 'Impact, sans-serif', letterSpacing: '1px', position: 'absolute', bottom: '-20px', left: '-10px', zIndex: 10, textShadow: '2px 2px 0px #fff' }}>
                {member.name}
              </h2>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
