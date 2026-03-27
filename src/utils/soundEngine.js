class SoundEngine {
  constructor() {
    this.ctx = null;
    this.ambientOsc = null;
    this.ambientGain = null;
    this.waveSynthOsc = null;
    this.waveSynthGain = null;
    this.humOsc = null;
    this.humGain = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- 1. SUPERPOSITION ---
  startAmbientShimmer() {
    this.init();
    if (this.ambientOsc) return;
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.value = 0;
    this.ambientGain.connect(this.ctx.destination);
    
    this.ambientOsc = this.ctx.createOscillator();
    this.ambientOsc.type = 'sine';
    this.ambientOsc.frequency.value = 300;
    this.ambientOsc.connect(this.ambientGain);
    this.ambientOsc.start();
    
    // Fade in
    this.ambientGain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 1);
    
    // LFO for shimmer
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 4;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 10;
    lfo.connect(lfoGain);
    lfoGain.connect(this.ambientOsc.frequency);
    lfo.start();
  }

  stopAmbientShimmer() {
    if (this.ambientGain) {
      this.ambientGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (this.ambientOsc) {
          this.ambientOsc.stop();
          this.ambientOsc.disconnect();
          this.ambientOsc = null;
        }
      }, 500);
    }
  }

  playHum(position) {
    this.init();
    if (!this.humOsc) {
      this.humGain = this.ctx.createGain();
      this.humGain.gain.value = 0.05;
      this.humGain.connect(this.ctx.destination);
      this.humOsc = this.ctx.createOscillator();
      this.humOsc.type = 'triangle';
      this.humOsc.connect(this.humGain);
      this.humOsc.start();
    }
    // Pitch based on 0-100 position (100Hz to 600Hz)
    const freq = 100 + (position * 5);
    this.humOsc.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.1);
  }

  stopHum() {
    if (this.humGain) {
      this.humGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);
      setTimeout(() => {
        if (this.humOsc) {
          this.humOsc.stop();
          this.humOsc = null;
        }
      }, 200);
    }
  }

  playSnap() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playWhoosh() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    // white noise approximation using high frequency sine sweep
    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2000, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.15);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // --- 2. QUANTUM TUNNELING ---
  playThud() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playPhaseShift() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(1200, this.ctx.currentTime + 0.2);
    osc.frequency.linearRampToValueAtTime(400, this.ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.2);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  playFadeOut() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  // --- 3. ENTANGLEMENT ---
  playDiceEcho() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playStereoTone(isLeft) {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const panner = this.ctx.createStereoPanner();
    
    panner.pan.value = isLeft ? -1 : 1; 
    osc.type = 'sine';
    osc.frequency.value = 800; // Mirrored perfect tone
    
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.0);
    
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(this.ctx.destination);
    
    osc.start(this.ctx.currentTime + 0.1); // slight delay to feel the sync
    osc.stop(this.ctx.currentTime + 1.1);
  }

  // --- 4. WAVE-PARTICLE DUALITY ---
  playTick() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1000, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.03);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }

  startWaveSynth() {
    this.init();
    if (this.waveSynthOsc) return;
    this.waveSynthGain = this.ctx.createGain();
    this.waveSynthGain.gain.value = 0;
    this.waveSynthGain.connect(this.ctx.destination);
    
    this.waveSynthOsc = this.ctx.createOscillator();
    this.waveSynthOsc.type = 'sine';
    this.waveSynthOsc.frequency.value = 200;
    this.waveSynthOsc.connect(this.waveSynthGain);
    this.waveSynthOsc.start();
    
    // Fade in
    this.waveSynthGain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 1);

    // Subtle interference tremolo
    const tremolo = this.ctx.createOscillator();
    tremolo.frequency.value = 2; // slow wave
    const tremGain = this.ctx.createGain();
    tremGain.gain.value = 0.05;
    tremolo.connect(tremGain);
    tremGain.connect(this.waveSynthGain.gain);
    tremolo.start();
  }

  stopWaveSynth() {
    if (this.waveSynthGain) {
      this.waveSynthGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (this.waveSynthOsc) {
          this.waveSynthOsc.stop();
          this.waveSynthOsc.disconnect();
          this.waveSynthOsc = null;
        }
      }, 500);
    }
  }

  playRisingTone() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 2.0); // rising tone
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 1.0);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2.0);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 2.0);
  }
}

const soundEngine = new SoundEngine();
export default soundEngine;
