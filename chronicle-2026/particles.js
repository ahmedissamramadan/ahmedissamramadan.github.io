// Autonomous Agent-Mesh Living Topology Canvas (Framer-Motion Quality & Lightweight)
class ParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.packets = [];
    this.mouse = { x: null, y: null, targetX: 0, targetY: 0, radius: 160 };
    this.parallax = { x: 0, y: 0 };
    this.numberOfParticles = window.innerWidth < 768 ? 24 : 48;
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.init();
    this.animate = this.animate.bind(this);
    if (!this.prefersReducedMotion) {
      requestAnimationFrame(this.animate);
    } else {
      this.renderStaticFrame();
    }

    window.addEventListener("resize", () => {
      this.resize();
      if (this.prefersReducedMotion) this.renderStaticFrame();
    });

    if (!this.prefersReducedMotion) {
      window.addEventListener("mousemove", (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.mouse.targetX = (e.clientX - window.innerWidth / 2) * 0.025;
        this.mouse.targetY = (e.clientY - window.innerHeight / 2) * 0.025;
      });
      window.addEventListener("mouseout", () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }
  }

  init() {
    this.resize();
    this.particles = [];
    this.packets = [];

    const count = this.numberOfParticles;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 1.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        isAgent: i % 4 === 0 // 25% of nodes are highlighted agent hubs
      });
    }

    // Spawn 12 active data packets traveling between connections
    for (let k = 0; k < 12; k++) {
      this.packets.push({
        p1Idx: Math.floor(Math.random() * count),
        p2Idx: Math.floor(Math.random() * count),
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
        color: k % 2 === 0 ? "#38bdf8" : "#818cf8"
      });
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  renderStaticFrame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.isAgent ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.2)";
      this.ctx.fill();
    }
  }

  animate() {
    if (this.prefersReducedMotion) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Smooth camera parallax interpolation
    this.parallax.x += (this.mouse.targetX - this.parallax.x) * 0.05;
    this.parallax.y += (this.mouse.targetY - this.parallax.y) * 0.05;

    const activeEdges = [];

    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Mouse soft repulsion
      if (this.mouse.x !== null) {
        let dx = (this.mouse.x - this.parallax.x) - p.x;
        let dy = (this.mouse.y - this.parallax.y) - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius && dist > 0) {
          let force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
        }
      }

      const drawX = p.x + this.parallax.x;
      const drawY = p.y + this.parallax.y;
      const pulseSize = p.size + Math.sin(p.pulse) * 0.5;

      this.ctx.beginPath();
      this.ctx.arc(drawX, drawY, Math.max(0.5, pulseSize), 0, Math.PI * 2);
      this.ctx.fillStyle = p.isAgent ? "rgba(56, 189, 248, 0.75)" : "rgba(129, 140, 248, 0.4)";
      this.ctx.shadowBlur = p.isAgent ? 10 : 4;
      this.ctx.shadowColor = p.isAgent ? "#38bdf8" : "#6366f1";
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Connect nodes within range
      for (let j = i + 1; j < this.particles.length; j++) {
        let p2 = this.particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          let alpha = (1 - dist / 140) * 0.18;
          this.ctx.beginPath();
          this.ctx.moveTo(drawX, drawY);
          this.ctx.lineTo(p2.x + this.parallax.x, p2.y + this.parallax.y);
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          this.ctx.lineWidth = 0.75;
          this.ctx.stroke();

          activeEdges.push({ x1: drawX, y1: drawY, x2: p2.x + this.parallax.x, y2: p2.y + this.parallax.y });
        }
      }
    }

    // Animate data packets flowing on mesh edges
    if (activeEdges.length > 0) {
      for (let k = 0; k < this.packets.length; k++) {
        let pkt = this.packets[k];
        pkt.progress += pkt.speed;
        if (pkt.progress > 1) {
          pkt.progress = 0;
          pkt.edge = activeEdges[Math.floor(Math.random() * activeEdges.length)];
        }
        if (!pkt.edge) {
          pkt.edge = activeEdges[Math.floor(Math.random() * activeEdges.length)];
        }
        if (pkt.edge) {
          const px = pkt.edge.x1 + (pkt.edge.x2 - pkt.edge.x1) * pkt.progress;
          const py = pkt.edge.y1 + (pkt.edge.y2 - pkt.edge.y1) * pkt.progress;

          this.ctx.beginPath();
          this.ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          this.ctx.fillStyle = pkt.color;
          this.ctx.shadowBlur = 8;
          this.ctx.shadowColor = pkt.color;
          this.ctx.fill();
          this.ctx.shadowBlur = 0;
        }
      }
    }

    requestAnimationFrame(this.animate);
  }
}

if (typeof window !== "undefined") {
  window.ParticleCanvas = ParticleCanvas;
}
