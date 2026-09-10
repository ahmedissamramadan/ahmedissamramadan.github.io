// Web Audio API Synthetic Sound Engine (Zero external MP3 dependencies)
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = true; // Muted by default so it never annoys the user
    this.ambientOsc = null;
    this.ambientGain = null;
    this.isAmbientPlaying = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTone(freq, type = "sine", duration = 0.08, gainVal = 0.08) {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  click() {
    this.playTone(800, "sine", 0.05, 0.05);
  }

  hover() {
    this.playTone(340, "triangle", 0.04, 0.02);
  }

  openModal() {
    if (this.muted) return;
    this.playTone(520, "sine", 0.12, 0.08);
    setTimeout(() => this.playTone(780, "sine", 0.15, 0.06), 60);
  }

  closeModal() {
    if (this.muted) return;
    this.playTone(650, "sine", 0.1, 0.06);
    setTimeout(() => this.playTone(420, "sine", 0.12, 0.05), 50);
  }

  success() {
    if (this.muted) return;
    this.playTone(440, "sine", 0.12, 0.08);
    setTimeout(() => this.playTone(660, "sine", 0.15, 0.08), 80);
    setTimeout(() => this.playTone(880, "sine", 0.25, 0.1), 160);
  }

  toggleMute() {
    this.muted = !this.muted;
    if (!this.muted) {
      this.initContext();
      this.success();
    }
    return this.muted;
  }
}

if (typeof window !== "undefined") {
  window.soundFX = new SoundFX();
}
