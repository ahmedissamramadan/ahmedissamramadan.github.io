// Web Audio API Synthetic Sound Engine — V3.0 Hyper Edition
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = true; // Muted by default
    this.droneOsc = null;
    this.droneGain = null;
    this.isDronePlaying = false;
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
    this.playTone(800, "sine", 0.05, 0.04);
  }

  mechanicalClick() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      // Simulate mechanical switch click (burst noise + high click)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200 + Math.random() * 400, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  hover() {
    this.playTone(340, "triangle", 0.03, 0.015);
  }

  openModal() {
    if (this.muted) return;
    this.playTone(520, "sine", 0.12, 0.06);
    setTimeout(() => this.playTone(780, "sine", 0.15, 0.05), 60);
  }

  open() {
    this.openModal();
  }

  closeModal() {
    if (this.muted) return;
    this.playTone(650, "sine", 0.1, 0.05);
    setTimeout(() => this.playTone(420, "sine", 0.12, 0.04), 50);
  }

  close() {
    this.closeModal();
  }

  success() {
    if (this.muted) return;
    this.playTone(440, "sine", 0.12, 0.06);
    setTimeout(() => this.playTone(660, "sine", 0.15, 0.06), 80);
    setTimeout(() => this.playTone(880, "sine", 0.25, 0.08), 160);
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
