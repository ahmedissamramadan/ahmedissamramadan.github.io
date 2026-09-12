// ==========================================================================
// THE 2026 GRAND CHRONICLE — APPLICATION LOGIC (ENGLISH MASTER EDITION)
// Architect & AI-Native Entrepreneur: Ahmed Issam Ramadan (AIR)
// ==========================================================================

let activeDomain = "all";
let currentSearchQuery = "";
let currentWaslFilters = { sector: "b2b_ai", stage: "seed", country: "sa" };
let currentSmhDevice = "ultrasound_4d";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Living Topology Particle Canvas
  new ParticleCanvas("particle-canvas");

  // 2. Initialize Clocks & Telemetry
  initLiveClock();

  // 3. Render Profile & Metrics
  renderHeroProfile();
  renderGlobalMetrics();

  // 4. Render Timeline
  renderTimeline();

  // 5. Render Domains & Items
  renderDomainTabs();
  renderDomainItems("all");

  // 6. Render Sub-modules & Simulators
  renderTopologyDiagram();
  renderWaslAssetsExplorer();
  renderWaslSimulator();
  renderCorelinkDiagnostic();
  renderEngineeringHub();
  renderSmhRoiCalculator();
  renderVaultCertifications();

  // 7. Setup Interactivity & Terminals
  setupTerminal();
  setupEventListeners();
  initScrollReveal();

  // 8. Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Live EEST Clock
function initLiveClock() {
  const clockEl = document.getElementById("live-clock");
  if (!clockEl) return;
  const update = () => {
    const now = new Date();
    const options = {
      timeZone: "Africa/Cairo",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };
    clockEl.textContent = "Cairo • " + now.toLocaleDateString("en-US", options) + " EEST";
  };
  update();
  setInterval(update, 1000);
}

// Hero Profile Section
function renderHeroProfile() {
  const { profile } = CHRONICLE_DATA;
  const container = document.getElementById("hero-profile-content");
  if (!container) return;

  container.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-4">
        <div class="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-xl shadow-indigo-500/25">
          <div class="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950 font-heading text-2xl font-bold text-white tracking-wider">
            AIR
          </div>
          <span class="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
          </span>
        </div>
        <div>
          <div class="flex flex-wrap items-center gap-2.5">
            <h1 class="text-2xl md:text-4xl font-extrabold tracking-tight text-white font-heading">${profile.name}</h1>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-blue font-mono-num">${profile.statusBadge}</span>
          </div>
          <p class="text-sm md:text-base text-slate-400 mt-1 font-heading font-medium">${profile.title}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button id="btn-sound-toggle" class="glass-pill btn-press px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 text-slate-300 hover:text-white font-mono">
          <i data-lucide="volume-x" id="sound-icon" class="w-4 h-4 text-amber-400"></i>
          <span id="sound-label">Audio: Muted</span>
        </button>
        <button onclick="window.print()" class="glass-pill btn-press px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 text-slate-300 hover:text-white font-mono">
          <i data-lucide="printer" class="w-4 h-4 text-cyan-400"></i>
          <span>Print Record</span>
        </button>
      </div>
    </div>

    <!-- Official Profile Governance Notice -->
    <div class="glass-panel rounded-2xl p-5 mb-6 border-slate-800/80 bg-slate-950/60">
      <div class="flex items-start gap-3.5">
        <i data-lucide="shield-alert" class="w-5 h-5 text-amber-400 shrink-0 mt-0.5"></i>
        <div>
          <h4 class="text-xs font-bold text-amber-300 font-heading uppercase tracking-wider mb-1">Official Governance & Profile Invariant Record</h4>
          <p class="text-xs text-slate-300 leading-relaxed">
            Zagazig University LL.B. graduate (2022) — <strong>strictly non-practicing</strong> and has never held Bar Association membership. Not a graduate of Computer Science or IT faculties; all software development, full-stack web architecture, distributed databases, and enterprise automation skills are <strong>100% self-taught</strong> through intensive hands-on execution and high-stakes startup building. Official ALX credentials: <strong>AI Career Essentials (AiCE)</strong> and <strong>Project Management Crash Course</strong>.
          </p>
        </div>
      </div>
    </div>

    <p class="text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-4xl font-normal">
      ${profile.bio}
    </p>

    <!-- Core Tech Stacks -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      <div class="glass-panel p-4 rounded-xl">
        <span class="text-xs font-bold text-blue-400 block mb-2 font-heading">🎨 UI/UX Design</span>
        <div class="flex flex-wrap gap-1.5">
          ${profile.stack.design.map(s => `<span class="text-[11px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800 font-mono">${s}</span>`).join("")}
        </div>
      </div>
      <div class="glass-panel p-4 rounded-xl">
        <span class="text-xs font-bold text-indigo-400 block mb-2 font-heading">⚡ Frontend Systems</span>
        <div class="flex flex-wrap gap-1.5">
          ${profile.stack.frontend.map(s => `<span class="text-[11px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800 font-mono">${s}</span>`).join("")}
        </div>
      </div>
      <div class="glass-panel p-4 rounded-xl">
        <span class="text-xs font-bold text-purple-400 block mb-2 font-heading">⚙️ Backend & Data</span>
        <div class="flex flex-wrap gap-1.5">
          ${profile.stack.backend.map(s => `<span class="text-[11px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800 font-mono">${s}</span>`).join("")}
        </div>
      </div>
      <div class="glass-panel p-4 rounded-xl">
        <span class="text-xs font-bold text-emerald-400 block mb-2 font-heading">🤖 Automation & MCP</span>
        <div class="flex flex-wrap gap-1.5">
          ${profile.stack.automation.map(s => `<span class="text-[11px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800 font-mono">${s}</span>`).join("")}
        </div>
      </div>
    </div>
  `;
}

// Global Metrics with Count-Up and SVG Sparklines
function renderGlobalMetrics() {
  const container = document.getElementById("global-metrics-grid");
  if (!container) return;

  container.innerHTML = CHRONICLE_DATA.globalMetrics.map((m, idx) => {
    // Generate mini sparkline path
    const spark = m.sparkline || [10, 20, 15, 30, 25, 40];
    const minVal = Math.min(...spark);
    const maxVal = Math.max(...spark);
    const width = 64;
    const height = 24;
    const points = spark.map((val, i) => {
      const x = (i / (spark.length - 1)) * width;
      const y = height - ((val - minVal) / (maxVal - minVal || 1)) * (height - 6) - 3;
      return `${x},${y}`;
    }).join(" ");

    return `
      <div class="glass-panel p-4 md:p-5 rounded-2xl card-interactive cursor-pointer border-slate-800/80 flex flex-col justify-between" onclick="showMetricDetails('${m.id}')">
        <div class="flex items-center justify-between gap-2 mb-2">
          <div class="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-${m.color}-400 shadow-sm">
            <i data-lucide="${m.icon}" class="w-4 h-4"></i>
          </div>
          <!-- Sparkline Live Telemetry -->
          <svg class="sparkline-svg" viewBox="0 0 ${width} ${height}">
            <polyline class="sparkline-path" stroke="var(--accent-${m.color === 'blue' ? 'primary' : m.color === 'emerald' ? 'emerald' : m.color === 'purple' ? 'primary' : 'amber'})" points="${points}" />
            <circle cx="${width}" cy="${points.split(' ').pop().split(',')[1]}" r="2.5" fill="var(--accent-${m.color === 'blue' ? 'primary' : m.color === 'emerald' ? 'emerald' : 'amber'})" />
          </svg>
        </div>
        <div>
          <div class="font-mono-num text-2xl md:text-3xl font-extrabold text-white tracking-tight count-up-target" data-value="${m.value}">
            ${m.value}
          </div>
          <h3 class="text-xs font-bold text-slate-300 font-heading mt-1 leading-snug">${m.label}</h3>
          <p class="text-[11px] text-slate-400 mt-1 font-mono flex items-center gap-1.5">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>${m.change}</span>
          </p>
        </div>
      </div>
    `;
  }).join("");

  // Trigger count-up animation on viewport enter
  initCountUpObserver();
}

function initCountUpObserver() {
  const elements = document.querySelectorAll(".count-up-target");
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const rawVal = el.getAttribute("data-value");
        const numericVal = parseInt(rawVal.replace(/[^0-9]/g, ""), 10);
        const hasPlus = rawVal.includes("+");

        if (!isNaN(numericVal)) {
          let start = 0;
          const duration = 1200;
          const startTime = performance.now();

          const updateCount = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out spring-like progress
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * numericVal);
            el.textContent = `${current}${hasPlus ? "+" : ""}`;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = rawVal;
            }
          };
          requestAnimationFrame(updateCount);
        }
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  elements.forEach(el => observer.observe(el));
}

// Quarterly Timeline
function renderTimeline() {
  const container = document.getElementById("timeline-container");
  if (!container) return;

  container.innerHTML = CHRONICLE_DATA.timeline.map((q, qIdx) => `
    <div class="relative pl-6 md:pl-8 pb-10 border-l border-slate-800 last:pb-2 reveal-on-scroll">
      <div class="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-slate-950 border-2 border-${q.color}-500 shadow-md shadow-${q.color}-500/40"></div>
      <div class="glass-panel p-5 md:p-6 rounded-2xl border-slate-800/80">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <span class="text-xs px-2.5 py-0.5 rounded-full badge-${q.color} font-mono-num font-semibold">${q.quarter}</span>
            <span class="text-xs text-slate-400 font-mono ml-2">${q.period}</span>
          </div>
          <span class="text-xs text-slate-400 font-heading font-medium">${q.badge}</span>
        </div>
        <h3 class="text-base md:text-lg font-bold text-white font-heading mb-4">${q.tagline}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${q.milestones.map(m => `
            <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div class="text-[11px] font-mono font-semibold text-${q.color}-400 mb-1">${m.date}</div>
              <h4 class="text-xs font-bold text-white font-heading mb-1.5">${m.title}</h4>
              <p class="text-xs text-slate-300 leading-relaxed font-normal">${m.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

// Domain Category Tabs
function renderDomainTabs() {
  const container = document.getElementById("domain-tabs-container");
  if (!container) return;

  const tabs = [
    { id: "all", label: "All Systems & Repos", icon: "layout-grid", count: 30 },
    { id: "software", label: "Software & Web Platforms", icon: "code-2", count: 6 },
    { id: "agency", label: "Agency OS & Workflows", icon: "briefcase", count: 3 },
    { id: "media", label: "Brand Identities & Media", icon: "palette", count: 5 },
    { id: "engineering", label: "Field & Medical Engineering", icon: "building-2", count: 4 },
    { id: "certifications", label: "Verified Credentials", icon: "award", count: 11 }
  ];

  container.innerHTML = tabs.map(tab => `
    <button 
      onclick="switchDomainTab('${tab.id}')"
      id="tab-btn-${tab.id}"
      class="px-3.5 py-2 rounded-xl text-xs font-heading font-semibold flex items-center gap-2 transition-all ${tab.id === activeDomain ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'glass-pill text-slate-400 hover:text-white'}"
    >
      <i data-lucide="${tab.icon}" class="w-3.5 h-3.5"></i>
      <span>${tab.label}</span>
      <span class="px-1.5 py-0.2 text-[10px] rounded-md font-mono-num ${tab.id === activeDomain ? 'bg-indigo-700 text-white' : 'bg-slate-900 text-slate-400'}">${tab.count}</span>
    </button>
  `).join("");

  if (window.lucide) window.lucide.createIcons();
}

function switchDomainTab(tabId) {
  activeDomain = tabId;
  renderDomainTabs();
  renderDomainItems(tabId);
  if (window.soundFX) window.soundFX.click();
}

// Domain Items Grid
function renderDomainItems(domainKey) {
  const container = document.getElementById("domain-items-grid");
  if (!container) return;

  let allItems = [];
  if (domainKey === "all") {
    Object.keys(CHRONICLE_DATA.domains).forEach(k => {
      allItems = allItems.concat(CHRONICLE_DATA.domains[k].items.map(i => ({ ...i, domainKey: k })));
    });
  } else if (CHRONICLE_DATA.domains[domainKey]) {
    allItems = CHRONICLE_DATA.domains[domainKey].items.map(i => ({ ...i, domainKey }));
  }

  // Filter with currentSearchQuery
  if (currentSearchQuery.trim() !== "") {
    const q = currentSearchQuery.toLowerCase();
    allItems = allItems.filter(i => {
      const matchTitle = (i.title || "").toLowerCase().includes(q);
      const matchDesc = (i.description || i.desc || "").toLowerCase().includes(q);
      const matchCategory = (i.category || i.badge || "").toLowerCase().includes(q);
      const matchTech = (i.tech || []).some(t => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchCategory || matchTech;
    });
  }

  if (allItems.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center glass-panel rounded-2xl">
        <i data-lucide="search-x" class="w-10 h-10 text-slate-500 mx-auto mb-3"></i>
        <h4 class="text-sm font-bold text-white font-heading">No systems matched your search query</h4>
        <p class="text-xs text-slate-400 mt-1">Try keywords like 'WASL', 'Supabase', 'Claude', or 'ClickUp'.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = allItems.map((item, idx) => `
    <div 
      class="glass-panel p-5 rounded-2xl card-interactive cursor-pointer border-slate-800/80 flex flex-col justify-between stagger-item" 
      onclick="openItemModal('${item.id}', '${item.domainKey}')"
      style="animation-delay: ${idx * 40}ms"
    >
      <div>
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="text-[10px] px-2.5 py-0.5 rounded-full badge-${getDomainColor(item.domainKey)} font-mono font-medium truncate max-w-[200px]">
            ${item.category || item.badge || item.issuer || "Verified System"}
          </span>
          <span class="text-[10px] text-slate-400 font-mono">${item.status ? "Status: Live" : (item.date || "2026")}</span>
        </div>
        <h3 class="text-sm md:text-base font-bold text-white font-heading mb-2 hover:text-indigo-400 transition-colors leading-snug">
          ${item.title}
        </h3>
        <p class="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4 font-normal">
          ${item.description || item.desc}
        </p>
      </div>

      <div>
        ${item.tech ? `
          <div class="flex flex-wrap gap-1 mb-4 pt-3 border-t border-slate-800/80">
            ${item.tech.slice(0, 3).map(t => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">${t}</span>`).join("")}
            ${item.tech.length > 3 ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">+${item.tech.length - 3}</span>` : ""}
          </div>
        ` : ""}
        <div class="flex items-center justify-between text-xs font-heading font-semibold text-indigo-400 hover:text-indigo-300">
          <span>Inspect Architecture</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </div>
      </div>
    </div>
  `).join("");

  if (window.lucide) window.lucide.createIcons();
}

function getDomainColor(k) {
  switch (k) {
    case "software": return "blue";
    case "agency": return "purple";
    case "media": return "purple";
    case "engineering": return "emerald";
    case "certifications": return "amber";
    default: return "blue";
  }
}

// Deep-Dive Modal Drawer
function openItemModal(itemId, domainKey) {
  const modal = document.getElementById("detail-modal");
  const body = document.getElementById("modal-content-body");
  if (!modal || !body) return;

  let item = null;
  if (domainKey && CHRONICLE_DATA.domains[domainKey]) {
    item = CHRONICLE_DATA.domains[domainKey].items.find(i => i.id === itemId);
  } else {
    Object.keys(CHRONICLE_DATA.domains).forEach(k => {
      const found = CHRONICLE_DATA.domains[k].items.find(i => i.id === itemId);
      if (found) {
        item = found;
        domainKey = k;
      }
    });
  }

  if (!item) return;

  body.innerHTML = `
    <div class="flex items-start justify-between gap-4 mb-5 border-b border-slate-800/80 pb-4">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs px-2.5 py-0.5 rounded-full badge-${getDomainColor(domainKey)} font-mono font-medium">
            ${item.category || item.badge || item.issuer}
          </span>
          <span class="text-xs text-slate-400 font-mono">${item.status || item.date || "Audited 2026"}</span>
        </div>
        <h2 class="text-xl md:text-2xl font-extrabold text-white font-heading">${item.title}</h2>
      </div>
      <button onclick="closeDetailModal()" class="p-2 rounded-xl glass-pill text-slate-400 hover:text-white btn-press">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
    </div>

    <p class="text-xs md:text-sm text-slate-200 leading-relaxed mb-6 font-normal">
      ${item.description || item.desc}
    </p>

    ${item.metrics ? `
      <div class="mb-6">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading mb-2.5">Validated Key Metrics & Deliverables:</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${item.metrics.map(m => `
            <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-xs text-slate-200 font-mono">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
              <span>${m}</span>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}

    ${item.highlights ? `
      <div class="mb-6">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading mb-2.5">Architectural Execution Highlights:</h4>
        <ul class="space-y-2 text-xs text-slate-300">
          ${item.highlights.map(h => `
            <li class="flex items-start gap-2.5">
              <span class="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5"></span>
              <span class="leading-relaxed">${h}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    ` : ""}

    ${item.tech ? `
      <div class="mb-6">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading mb-2.5">Production Tech Stack:</h4>
        <div class="flex flex-wrap gap-1.5">
          ${item.tech.map(t => `<span class="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-indigo-300 font-mono">${t}</span>`).join("")}
        </div>
      </div>
    ` : ""}

    ${item.localPath ? `
      <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-slate-400 flex items-center justify-between">
        <span class="truncate max-w-[380px]">Local Repo: ${item.localPath}</span>
        <button onclick="copyPath('${item.localPath}')" class="text-indigo-400 hover:text-white flex items-center gap-1 font-heading">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Path
        </button>
      </div>
    ` : ""}
  `;

  modal.classList.add("active", "modal-open");
  if (window.lucide) window.lucide.createIcons();
  if (window.soundFX && window.soundFX.openModal) window.soundFX.openModal();
}

function closeDetailModal() {
  const modal = document.getElementById("detail-modal");
  if (modal) modal.classList.remove("active", "modal-open");
  if (window.soundFX && window.soundFX.closeModal) window.soundFX.closeModal();
}

// WASL Visual Assets Explorer
function renderWaslAssetsExplorer() {
  const container = document.getElementById("wasl-assets-summary");
  if (!container) return;

  const categories = [
    { title: "00. Strategy & Worksheets", count: "13 SOSTAC Excel Sheets", icon: "file-spreadsheet" },
    { title: "01. Brand Identity & Logos", count: "15 Master Assets", icon: "feather" },
    { title: "02. UI/UX App Interfaces", count: "16 Screen Layouts", icon: "layout" },
    { title: "03. Heritage Cultural Art", count: "69 Fine Art Assets", icon: "compass" },
    { title: "04. Typography & Quotes", count: "41 Editorial Assets", icon: "type" },
    { title: "05. Social Media Campaigns", count: "122 Omnichannel Assets", icon: "share-2" },
    { title: "06. Events & Demo Days", count: "18 High-Res Assets", icon: "calendar" },
    { title: "07. Investor Pitch & Decks", count: "16 Institutional Assets", icon: "trending-up" },
    { title: "08. Motion Graphics Loops", count: "2 Production Motion Loops", icon: "video" }
  ];

  container.innerHTML = categories.map(c => `
    <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <i data-lucide="${c.icon}" class="w-4 h-4 text-purple-400"></i>
        <span class="text-xs font-bold text-slate-200 font-heading">${c.title}</span>
      </div>
      <span class="text-xs px-2.5 py-0.5 rounded-full badge-purple font-mono-num">${c.count}</span>
    </div>
  `).join("");
}

// WASL Matchmaking Simulator Engine
function renderWaslSimulator() {
  const container = document.getElementById("wasl-simulator-container");
  if (!container || !window.WASL_SIMULATOR_DATA) return;

  const { sectors, stages, countries } = window.WASL_SIMULATOR_DATA;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label for="wasl-sim-sector" class="block text-xs font-bold text-slate-300 font-heading mb-2">Startup Sector:</label>
        <select id="wasl-sim-sector" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-800/60 text-xs text-white focus:outline-none focus:border-purple-500 transition-all font-mono">
          ${sectors.map(s => `<option value="${s.id}" ${s.id === currentWaslFilters.sector ? "selected" : ""}>${s.label}</option>`).join("")}
        </select>
      </div>

      <div>
        <label for="wasl-sim-stage" class="block text-xs font-bold text-slate-300 font-heading mb-2">Target Funding Stage:</label>
        <select id="wasl-sim-stage" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-800/60 text-xs text-white focus:outline-none focus:border-purple-500 transition-all font-mono">
          ${stages.map(s => `<option value="${s.id}" ${s.id === currentWaslFilters.stage ? "selected" : ""}>${s.label}</option>`).join("")}
        </select>
      </div>

      <div>
        <label for="wasl-sim-country" class="block text-xs font-bold text-slate-300 font-heading mb-2">Target Market / Geography:</label>
        <select id="wasl-sim-country" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-800/60 text-xs text-white focus:outline-none focus:border-purple-500 transition-all font-mono">
          ${countries.map(c => `<option value="${c.id}" ${c.id === currentWaslFilters.country ? "selected" : ""}>${c.label}</option>`).join("")}
        </select>
      </div>
    </div>

    <div class="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-purple-900/40">
      <div class="flex items-center gap-2">
        <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="text-xs text-slate-300 font-heading font-medium" id="wasl-sim-status">Algorithmic Deal Match Output:</span>
      </div>
      <button onclick="triggerWaslSimulate()" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-heading font-bold transition-all shadow-md shadow-purple-600/30 flex items-center gap-1.5 btn-press">
        <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
        <span>Recalculate Matches</span>
      </button>
    </div>

    <!-- Results Cards Grid -->
    <div id="wasl-sim-results" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6"></div>

    <!-- Recharts-style SVG Match Strength Breakdown -->
    <div class="recharts-glass-container">
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-bold text-slate-300 font-heading">Recharts-Style Match Distribution (% Fit by Category)</h4>
        <span class="text-[10px] font-mono text-purple-400">Algorithmic Telemetry</span>
      </div>
      <div id="wasl-recharts-bars" class="space-y-2"></div>
    </div>
  `;

  const sectorEl = document.getElementById("wasl-sim-sector");
  const stageEl = document.getElementById("wasl-sim-stage");
  const countryEl = document.getElementById("wasl-sim-country");

  const onFilterChange = () => {
    currentWaslFilters.sector = sectorEl.value;
    currentWaslFilters.stage = stageEl.value;
    currentWaslFilters.country = countryEl.value;
    runWaslSimulation();
  };

  if (sectorEl) sectorEl.addEventListener("change", onFilterChange);
  if (stageEl) stageEl.addEventListener("change", onFilterChange);
  if (countryEl) countryEl.addEventListener("change", onFilterChange);

  runWaslSimulation();
}

function runWaslSimulation() {
  const resultsContainer = document.getElementById("wasl-sim-results");
  const rechartsContainer = document.getElementById("wasl-recharts-bars");
  if (!resultsContainer || !window.WASL_SIMULATOR_DATA) return;

  if (window.soundFX) window.soundFX.click();

  const { investors } = window.WASL_SIMULATOR_DATA;
  const { sector, stage, country } = currentWaslFilters;

  // Matching algorithm
  const matched = investors.map(inv => {
    let score = 70;
    if (inv.sectors.includes(sector)) score += 15;
    if (inv.stages.includes(stage)) score += 10;
    if (inv.countries.includes(country) || inv.countries.includes("mena")) score += 5;
    return { ...inv, calculatedScore: Math.min(score, 99) };
  }).sort((a, b) => b.calculatedScore - a.calculatedScore);

  resultsContainer.innerHTML = matched.slice(0, 3).map(inv => `
    <div class="p-4 rounded-xl bg-slate-900/90 border border-purple-700/40 flex flex-col justify-between transition-all hover:border-purple-400/60 hover:-translate-y-1 shadow-lg shadow-purple-950/20">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-xs font-bold text-white font-heading">${inv.name}</span>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono-num font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            ${inv.calculatedScore}% Match
          </span>
        </div>
        <p class="text-[11px] text-purple-300 font-heading mb-1.5">Ticket Size: <strong class="text-white font-mono">${inv.ticket}</strong></p>
        <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3 font-normal">${inv.thesis}</p>
      </div>
      <div class="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
        <span>Verified WASL Directory</span>
        <span class="text-emerald-400 flex items-center gap-1 font-heading">
          <i data-lucide="check-circle" class="w-3 h-3"></i> Direct Pitch Ready
        </span>
      </div>
    </div>
  `).join("");

  // Render Recharts-style visual bars
  if (rechartsContainer) {
    const categories = [
      { label: "Market Alignment", pct: matched[0]?.calculatedScore || 92, color: "#a855f7" },
      { label: "Stage & Ticket Fit", pct: Math.min(96, (matched[0]?.calculatedScore || 90) - 4), color: "#38bdf8" },
      { label: "Thesis Overlap", pct: Math.min(94, (matched[0]?.calculatedScore || 88) - 6), color: "#10b981" }
    ];

    rechartsContainer.innerHTML = categories.map(c => `
      <div>
        <div class="flex justify-between text-[11px] font-mono mb-1">
          <span class="text-slate-300">${c.label}</span>
          <span class="text-white font-bold">${c.pct}%</span>
        </div>
        <div class="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
          <div class="h-full rounded-full transition-all duration-700" style="width: ${c.pct}%; background: ${c.color}"></div>
        </div>
      </div>
    `).join("");
  }

  if (window.lucide) window.lucide.createIcons();
}

function triggerWaslSimulate() {
  runWaslSimulation();
  showToast("Investor matches dynamically updated!", "refresh-cw");
}

// CoreLink CRM Diagnostic
function renderCorelinkDiagnostic() {
  const container = document.getElementById("corelink-diagnostic-content");
  if (!container) return;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
      <div class="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40">
        <span class="text-xs text-rose-400 font-bold block mb-1 font-heading">1. Bottleneck Diagnosis</span>
        <div class="font-mono-num text-2xl font-bold text-white mb-1">78 Tasks</div>
        <p class="text-xs text-slate-300 font-normal leading-relaxed">Identified backlog across 23 active projects with 30-40% rework overhead caused by missing task dependency structures.</p>
      </div>
      <div class="p-4 rounded-xl bg-amber-950/30 border border-amber-900/40">
        <span class="text-xs text-amber-400 font-bold block mb-1 font-heading">2. Structural Partitioning</span>
        <div class="font-mono-num text-2xl font-bold text-white mb-1">4 Spaces</div>
        <p class="text-xs text-slate-300 font-normal leading-relaxed">Partitioned ClickUp workspace into 4 dedicated operational spaces (Operations, HR, Finance, Accounts) sustaining 12 concurrent retainers.</p>
      </div>
      <div class="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/40">
        <span class="text-xs text-emerald-400 font-bold block mb-1 font-heading">3. Target Operating Engine</span>
        <div class="font-mono-num text-2xl font-bold text-white mb-1">Active OS</div>
        <p class="text-xs text-slate-300 font-normal leading-relaxed">Transformed CoreLink CRM from a passive retrospective ledger into an event-driven active operating engine with automated SLAs.</p>
      </div>
    </div>
  `;
}

// Field Engineering & Medical JV Hub
function renderEngineeringHub() {
  const container = document.getElementById("engineering-hub-content");
  if (!container) return;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="glass-panel p-5 rounded-2xl border-slate-800/80">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs px-2.5 py-0.5 rounded badge-emerald font-heading font-bold">Tohamy House & Pizza Party</span>
          <span class="text-xs text-slate-400 font-mono">Nasr City / Active Sites</span>
        </div>
        <h4 class="text-base font-bold text-white font-heading mb-2">Architectural BOQs & Millwork Certification</h4>
        <ul class="text-xs text-slate-300 space-y-2 mb-4 font-normal">
          <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Pizza Party commercial fit-out BOQ approved with reference codes.</li>
          <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Villa Dr. Khaled: 9 doors certified with 30cm master frame rectification.</li>
          <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Active sites: Site 107, New Capital As-Built, Madinaty 55/20, Al-Wesal.</li>
        </ul>
      </div>

      <div class="glass-panel p-5 rounded-2xl border-slate-800/80">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs px-2.5 py-0.5 rounded badge-blue font-heading font-bold">SMH Engineering & Vilorax JV</span>
          <span class="text-xs text-slate-400 font-mono">Medical Diagnostic Alliance</span>
        </div>
        <h4 class="text-base font-bold text-white font-heading mb-2">Healthcare Strategic Alliance (Eng. Hesham El-Qenawy)</h4>
        <ul class="text-xs text-slate-300 space-y-2 mb-4 font-normal">
          <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-blue-400"></i> Integrated medical supply chain with automated B2B hospital outreach.</li>
          <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-blue-400"></i> Diagnostic intelligence across radiology centers in the Delta & Cairo.</li>
          <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-blue-400"></i> Final joint venture partnership agreement & medical BOQ template executed.</li>
        </ul>
      </div>
    </div>
  `;
}

// SMH Medical ROI Calculator Engine
function renderSmhRoiCalculator() {
  const container = document.getElementById("smh-roi-container");
  if (!container || !window.SMH_MEDICAL_EQUIPMENT_DATA) return;

  const { devices } = window.SMH_MEDICAL_EQUIPMENT_DATA;
  const current = devices.find(d => d.id === currentSmhDevice) || devices[0];

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Input Controls -->
      <div class="lg:col-span-6 space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-300 font-heading mb-2">Select Diagnostic Equipment Model:</label>
          <div class="grid grid-cols-2 gap-2">
            ${devices.map(d => `
              <button type="button" onclick="selectSmhDevice('${d.id}')" class="p-2.5 rounded-xl text-left text-xs font-heading border transition-all ${d.id === currentSmhDevice ? 'bg-emerald-950/60 border-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'}">
                <span class="block truncate">${d.name}</span>
                <span class="text-[10px] text-emerald-400 font-mono-num">${(d.defaultPrice).toLocaleString()} EGP</span>
              </button>
            `).join("")}
          </div>
        </div>

        <div>
          <label for="smh-daily-scans" class="flex justify-between items-center text-xs font-heading mb-1 cursor-pointer">
            <span class="text-slate-300">Average Daily Scans / Patient Volume:</span>
            <span class="text-emerald-400 font-mono-num font-bold text-sm" id="smh-daily-scans-val">${current.defaultDailyScans} scans/day</span>
          </label>
          <input type="range" id="smh-daily-scans" min="4" max="60" value="${current.defaultDailyScans}" class="custom-range" oninput="updateSmhCalculations()">
          <div class="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>4 scans</span>
            <span>30 scans</span>
            <span>60 scans</span>
          </div>
        </div>

        <div>
          <label for="smh-scan-fee" class="flex justify-between items-center text-xs font-heading mb-1 cursor-pointer">
            <span class="text-slate-300">Patient Fee per Diagnostic Scan (EGP):</span>
            <span class="text-emerald-400 font-mono-num font-bold text-sm" id="smh-scan-fee-val">${current.scanPrice} EGP</span>
          </label>
          <input type="range" id="smh-scan-fee" min="100" max="3000" step="50" value="${current.scanPrice}" class="custom-range" oninput="updateSmhCalculations()">
          <div class="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>100 EGP</span>
            <span>1,500 EGP</span>
            <span>3,000 EGP</span>
          </div>
        </div>
      </div>

      <!-- Financial Metrics Summary & Recharts Area Chart -->
      <div class="lg:col-span-6 flex flex-col justify-between bg-slate-900/90 border border-emerald-800/40 p-5 rounded-2xl">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs text-slate-400 font-heading">Estimated Monthly & Annual Financial Returns</span>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono-num font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" id="smh-roi-badge">
              Payback: 6.2 months
            </span>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span class="text-[11px] text-slate-400 font-heading block mb-1">Net Monthly Cash Flow:</span>
              <div class="text-lg md:text-xl font-bold text-white font-mono-num" id="smh-monthly-net">-- EGP</div>
              <span class="text-[10px] text-slate-500 font-mono">26 operating days/month</span>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span class="text-[11px] text-slate-400 font-heading block mb-1">Net Annual Cash Flow:</span>
              <div class="text-lg md:text-xl font-bold text-emerald-400 font-mono-num" id="smh-annual-net">-- EGP</div>
              <span class="text-[10px] text-slate-500 font-mono">Net of maintenance & consumables</span>
            </div>
          </div>

          <!-- Recharts-style SVG Area Chart for Payback Curve -->
          <div class="mb-4">
            <div class="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
              <span>Cumulative 12-Month Net Cash Flow</span>
              <span id="smh-breakeven-indicator" class="text-emerald-400 font-bold">Breakeven: Month 6</span>
            </div>
            <div class="w-full h-24 bg-slate-950/80 rounded-xl p-2 border border-slate-800 relative overflow-hidden">
              <svg id="smh-cashflow-chart" class="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="smhGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#10b981" stop-opacity="0.45"/>
                    <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
                  </linearGradient>
                </defs>
                <path id="smh-area-path" fill="url(#smhGrad)" d="" />
                <path id="smh-line-path" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" d="" />
                <line id="smh-capex-line" x1="0" y1="50" x2="300" y2="50" stroke="#f43f5e" stroke-dasharray="4" stroke-width="1.5" />
              </svg>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/30 text-xs text-slate-300 leading-relaxed font-normal">
            <span class="text-emerald-400 font-bold font-heading block mb-1">Financial Feasibility Analysis:</span>
            <p id="smh-insight-text">High-yield capital asset delivering swift cash payback with sustained operating margins across Egyptian clinical benchmarks.</p>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <span class="text-slate-400 font-heading">SMH Engineering Warranty & Distribution</span>
          <button onclick="openPartnershipModal('SMH Medical Equipment')" class="text-emerald-400 hover:text-emerald-300 font-bold font-heading flex items-center gap-1">
            Request Equipment BOQ <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  updateSmhCalculations();
}

function selectSmhDevice(deviceId) {
  currentSmhDevice = deviceId;
  const { devices } = window.SMH_MEDICAL_EQUIPMENT_DATA;
  const current = devices.find(d => d.id === deviceId);
  if (!current) return;

  const scansInput = document.getElementById("smh-daily-scans");
  const feeInput = document.getElementById("smh-scan-fee");
  if (scansInput) scansInput.value = current.defaultDailyScans;
  if (feeInput) feeInput.value = current.scanPrice;

  renderSmhRoiCalculator();
  if (window.soundFX) window.soundFX.click();
}

function updateSmhCalculations() {
  const { devices } = window.SMH_MEDICAL_EQUIPMENT_DATA;
  const current = devices.find(d => d.id === currentSmhDevice) || devices[0];

  const scansInput = document.getElementById("smh-daily-scans");
  const feeInput = document.getElementById("smh-scan-fee");

  const dailyScans = parseInt(scansInput?.value || current.defaultDailyScans, 10);
  const feePerScan = parseInt(feeInput?.value || current.scanPrice, 10);

  const dailyScansVal = document.getElementById("smh-daily-scans-val");
  const feeVal = document.getElementById("smh-scan-fee-val");
  if (dailyScansVal) dailyScansVal.textContent = `${dailyScans} scans/day`;
  if (feeVal) feeVal.textContent = `${feePerScan.toLocaleString()} EGP`;

  const monthlyDays = 26;
  const monthlyGross = dailyScans * feePerScan * monthlyDays;
  const monthlyOpCost = (monthlyGross * 0.12) + ((current.defaultPrice * current.maintenanceRatio) / 12);
  const monthlyNet = Math.max(0, monthlyGross - monthlyOpCost);
  const annualNet = monthlyNet * 12;

  const paybackMonths = monthlyNet > 0 ? (current.defaultPrice / monthlyNet).toFixed(1) : "N/A";

  const monthlyNetEl = document.getElementById("smh-monthly-net");
  const annualNetEl = document.getElementById("smh-annual-net");
  const roiBadgeEl = document.getElementById("smh-roi-badge");
  const insightEl = document.getElementById("smh-insight-text");
  const breakevenIndicator = document.getElementById("smh-breakeven-indicator");

  if (monthlyNetEl) monthlyNetEl.textContent = `${Math.round(monthlyNet).toLocaleString()} EGP`;
  if (annualNetEl) annualNetEl.textContent = `${Math.round(annualNet).toLocaleString()} EGP`;

  if (roiBadgeEl) {
    roiBadgeEl.textContent = `Payback Period: ${paybackMonths} months`;
    if (parseFloat(paybackMonths) <= 12) {
      roiBadgeEl.className = "px-2.5 py-0.5 rounded-full text-[11px] font-mono-num font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    } else {
      roiBadgeEl.className = "px-2.5 py-0.5 rounded-full text-[11px] font-mono-num font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30";
    }
  }

  if (breakevenIndicator) {
    breakevenIndicator.textContent = `Breakeven: Month ${paybackMonths}`;
  }

  // Update SVG Recharts-style Curve
  const linePath = document.getElementById("smh-line-path");
  const areaPath = document.getElementById("smh-area-path");
  if (linePath && areaPath) {
    const points = [];
    const width = 300;
    const height = 80;
    const capex = current.defaultPrice;
    const maxVal = Math.max(capex * 1.5, annualNet);

    for (let m = 0; m <= 12; m++) {
      const x = (m / 12) * width;
      const cumCash = monthlyNet * m;
      const y = height - (cumCash / (maxVal || 1)) * (height - 15) - 5;
      points.push(`${x},${y}`);
    }

    const dLine = "M " + points.join(" L ");
    const dArea = `M 0,${height} L ` + points.join(" L ") + ` L ${width},${height} Z`;
    linePath.setAttribute("d", dLine);
    areaPath.setAttribute("d", dArea);
  }

  if (insightEl) {
    if (parseFloat(paybackMonths) < 8) {
      insightEl.textContent = `Exceptional Return: Fully amortizes initial capital within ${paybackMonths} months, yielding over ${Math.round(annualNet).toLocaleString()} EGP net operational profit per annum.`;
    } else {
      insightEl.textContent = `Sustainable Institutional Asset: Predictable recurring cash flow with comprehensive service warranty coverage.`;
    }
  }
}

// Multi-Agent Topology Diagram
function renderTopologyDiagram() {
  const container = document.getElementById("topology-nodes-container");
  if (!container) return;

  container.innerHTML = CHRONICLE_DATA.topologyNodes.map(node => `
    <div class="glass-panel p-4 rounded-xl text-center card-interactive cursor-pointer border-slate-800/80 hover:border-indigo-500/50" onclick="showToast('${node.label}: ${node.role}', '${node.icon}')">
      <div class="w-10 h-10 mx-auto mb-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
        <i data-lucide="${node.icon}" class="w-5 h-5"></i>
      </div>
      <h4 class="text-xs font-bold text-white font-heading truncate">${node.label}</h4>
      <p class="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed font-mono">${node.role}</p>
    </div>
  `).join("");
}

// Vault Certifications Dynamic Render
function renderVaultCertifications() {
  const container = document.getElementById("vault-certs-grid");
  if (!container || !CHRONICLE_DATA.domains.certifications) return;

  const certs = CHRONICLE_DATA.domains.certifications.items;
  container.innerHTML = certs.map(c => `
    <div class="glass-panel p-4 rounded-xl card-interactive cursor-pointer border-slate-800/80 hover:border-yellow-500/40 flex flex-col justify-between" onclick="openItemModal('${c.id}', 'certifications')">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-[10px] px-2 py-0.5 rounded-full badge-amber font-mono font-medium">${c.issuer}</span>
          <span class="text-[10px] text-slate-400 font-mono">${c.date}</span>
        </div>
        <h4 class="text-xs font-bold text-white font-heading mb-1 hover:text-yellow-400 transition-colors">${c.title}</h4>
        <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3 font-normal">${c.desc}</p>
      </div>
      <div class="flex items-center justify-between text-[10px] text-yellow-400 font-heading pt-2 border-t border-slate-800/60">
        <span class="truncate max-w-[170px]">${c.badge}</span>
        <i data-lucide="award" class="w-3.5 h-3.5 shrink-0"></i>
      </div>
    </div>
  `).join("");
}

// AIR-CLI Command Terminal HUD
function openTerminalModal() {
  const modal = document.getElementById("terminal-modal");
  if (modal) {
    modal.classList.add("active", "modal-open");
    const input = document.getElementById("terminal-input");
    if (input) setTimeout(() => input.focus(), 80);
  }
  if (window.soundFX && window.soundFX.openModal) window.soundFX.openModal();
}

function closeTerminalModal() {
  const modal = document.getElementById("terminal-modal");
  if (modal) modal.classList.remove("active", "modal-open");
  if (window.soundFX && window.soundFX.closeModal) window.soundFX.closeModal();
}

function runCliQuick(cmd) {
  const input = document.getElementById("terminal-input");
  if (input) {
    input.value = cmd;
    executeCliCommand(cmd);
    input.value = "";
    input.focus();
  }
}

function executeCliCommand(rawCmd) {
  const cmd = (rawCmd || "").trim().toLowerCase();
  const output = document.getElementById("terminal-output");
  const body = document.getElementById("terminal-body");
  if (!output) return;

  if (window.soundFX && window.soundFX.mechanicalClick) {
    window.soundFX.mechanicalClick();
  } else if (window.soundFX) {
    window.soundFX.click();
  }

  const cmdLine = document.createElement("div");
  cmdLine.className = "terminal-line flex items-center gap-2";
  cmdLine.innerHTML = `<span class="terminal-prompt-prefix">air@2026:~$</span> <span class="text-white font-bold">${rawCmd}</span>`;
  output.appendChild(cmdLine);

  if (cmd === "clear") {
    output.innerHTML = "";
    return;
  }

  const resLine = document.createElement("div");
  resLine.className = "terminal-line text-slate-300 pb-2 border-b border-slate-900";

  if (CLI_COMMANDS_DATA[cmd]) {
    resLine.innerHTML = `<pre class="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">${CLI_COMMANDS_DATA[cmd]}</pre>`;
  } else if (cmd === "metrics") {
    const metricsStr = CHRONICLE_DATA.globalMetrics.map(m => `• ${m.label}: ${m.value} (${m.change})`).join("\n");
    resLine.innerHTML = `<pre class="text-xs text-emerald-400 font-mono whitespace-pre-wrap leading-relaxed">[SYSTEM TELEMETRY 2026]\n${metricsStr}</pre>`;
  } else if (cmd === "contact") {
    openPartnershipModal("Executive Consultation");
    resLine.innerHTML = `<span class="text-indigo-400">Opening Executive Advisory & Contracting Drawer...</span>`;
  } else if (cmd === "") {
    return;
  } else {
    resLine.innerHTML = `<span class="text-rose-400">Command not found: '${rawCmd}'. Type <strong class="text-white">'help'</strong> for available system commands.</span>`;
  }

  output.appendChild(resLine);
  if (body) body.scrollTop = body.scrollHeight;
}

function setupTerminal() {
  const input = document.getElementById("terminal-input");
  if (input) {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        executeCliCommand(input.value);
        input.value = "";
      }
    });
  }

  // Global Cmd+K / Ctrl+K
  window.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const modal = document.getElementById("terminal-modal");
      if (modal && modal.classList.contains("modal-open")) {
        closeTerminalModal();
      } else {
        openTerminalModal();
      }
    }
  });

  const tModal = document.getElementById("terminal-modal");
  if (tModal) {
    tModal.addEventListener("click", e => {
      if (e.target === tModal) closeTerminalModal();
    });
  }
}

// Executive Toast Notification
let toastTimeout = null;
function showToast(message, iconName = "check-circle") {
  const toast = document.getElementById("executive-toast");
  const msgEl = document.getElementById("toast-message");
  const iconEl = document.getElementById("toast-icon");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  if (iconEl && iconName) iconEl.setAttribute("data-lucide", iconName);
  if (window.lucide) window.lucide.createIcons();

  toast.classList.add("toast-show");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("toast-show");
  }, 3500);
}

// B2B Partnership Modal & Forms
function openPartnershipModal(trackTitle) {
  const modal = document.getElementById("partnership-modal");
  if (!modal) return;
  if (trackTitle) {
    const radio = document.getElementById("radio-ai-arch");
    if (radio && trackTitle.includes("Architecture")) radio.checked = true;
  }
  modal.classList.add("active", "modal-open");
  if (window.soundFX && window.soundFX.openModal) window.soundFX.openModal();
}

function closePartnershipModal() {
  const modal = document.getElementById("partnership-modal");
  if (modal) modal.classList.remove("active", "modal-open");
  if (window.soundFX && window.soundFX.closeModal) window.soundFX.closeModal();
}

function handlePartnershipSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("partnership-form");
  const type = form.querySelector('input[name="partnership_type"]:checked')?.value || "Advisory & Consulting";
  const name = document.getElementById("partner-name")?.value || "";
  const contact = document.getElementById("partner-contact")?.value || "";
  const timeline = document.getElementById("partner-timeline")?.value || "";
  const brief = document.getElementById("partner-brief")?.value || "";

  const text = `Hello Ahmed, I would like to initiate an executive consultation / partnership:
• Track: ${type}
• Organization / Name: ${name}
• Contact Channel: ${contact}
• Target Timeline: ${timeline}
• Project Brief: ${brief}`;

  const telegramUrl = `https://t.me/ahmedissam_bot?text=${encodeURIComponent(text)}`;
  window.open(telegramUrl, "_blank");

  closePartnershipModal();
  if (window.soundFX && window.soundFX.success) window.soundFX.success();
  showToast("Telegram message prepared successfully!", "send");
}

function sendViaEmail() {
  const form = document.getElementById("partnership-form");
  const type = form ? (form.querySelector('input[name="partnership_type"]:checked')?.value || "Consulting & Advisory") : "Executive Consultation";
  const name = document.getElementById("partner-name")?.value || "";
  const contact = document.getElementById("partner-contact")?.value || "";
  const timeline = document.getElementById("partner-timeline")?.value || "";
  const brief = document.getElementById("partner-brief")?.value || "";

  const subject = `Executive Partnership Inquiry [${type}] — ${name || "Prospective Partner"}`;
  const body = `Dear Ahmed,

I would like to explore an architectural collaboration based on the following scope:
- Engagement Track: ${type}
- Name / Company: ${name}
- Contact Details: ${contact}
- Target Timeline: ${timeline}
- Project Overview & Core Bottlenecks:
${brief}

Best regards.`;

  const mailtoUrl = `mailto:ahmedissam.work@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;

  closePartnershipModal();
  if (window.soundFX && window.soundFX.success) window.soundFX.success();
  showToast("Email client opened with pre-filled dossier!", "mail");
}

function copyExecutiveEmail() {
  navigator.clipboard.writeText("ahmedissam.work@gmail.com").then(() => {
    if (window.soundFX && window.soundFX.success) window.soundFX.success();
    showToast("Official email copied: ahmedissam.work@gmail.com", "copy");
  });
}

function copyPath(p) {
  navigator.clipboard.writeText(p).then(() => {
    if (window.soundFX) window.soundFX.click();
    showToast("Repository path copied to clipboard!", "check");
  });
}

// Sound FX Controller
function toggleSoundFromDock() {
  if (window.soundFX) {
    const isMuted = window.soundFX.toggleMute();
    syncSoundUI(isMuted);
    showToast(isMuted ? "Sound effects muted" : "Sound effects enabled 🔊", isMuted ? "volume-x" : "volume-2");
  }
}

function syncSoundUI(isMuted) {
  const soundIcon = document.getElementById("sound-icon");
  const soundLabel = document.getElementById("sound-label");
  const dockIcon = document.getElementById("dock-sound-icon");
  const dockTooltip = document.getElementById("dock-sound-tooltip");

  if (soundIcon) soundIcon.setAttribute("data-lucide", isMuted ? "volume-x" : "volume-2");
  if (soundLabel) soundLabel.textContent = isMuted ? "Audio: Muted" : "Audio: Active";
  if (dockIcon) dockIcon.setAttribute("data-lucide", isMuted ? "volume-x" : "volume-2");
  if (dockTooltip) dockTooltip.textContent = isMuted ? "Audio: Muted" : "Audio: Active";
  if (window.lucide) window.lucide.createIcons();
}

function showMetricDetails(metricId) {
  const metric = CHRONICLE_DATA.globalMetrics.find(m => m.id === metricId);
  if (!metric) return;
  if (window.soundFX) window.soundFX.click();
  showToast(`${metric.label}: ${metric.value} (${metric.change})`, "bar-chart-3");
}

// Staggered Scroll-Reveal Observer
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window)) {
    targets.forEach(t => t.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(t => observer.observe(t));
}

// Event Listeners
function setupEventListeners() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      currentSearchQuery = e.target.value;
      renderDomainItems(activeDomain);
    });
  }

  const soundBtn = document.getElementById("btn-sound-toggle");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      if (window.soundFX) {
        const isMuted = window.soundFX.toggleMute();
        syncSoundUI(isMuted);
        showToast(isMuted ? "Sound effects muted" : "Sound effects enabled 🔊", isMuted ? "volume-x" : "volume-2");
      }
    });
  }

  window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeDetailModal();
      closePartnershipModal();
      closeTerminalModal();
    }
  });

  const modal = document.getElementById("detail-modal");
  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) closeDetailModal();
    });
  }

  const pModal = document.getElementById("partnership-modal");
  if (pModal) {
    pModal.addEventListener("click", e => {
      if (e.target === pModal) closePartnershipModal();
    });
  }
}

// Window Global Exports
window.switchDomainTab = switchDomainTab;
window.openItemModal = openItemModal;
window.closeDetailModal = closeDetailModal;
window.showMetricDetails = showMetricDetails;
window.openPartnershipModal = openPartnershipModal;
window.closePartnershipModal = closePartnershipModal;
window.handlePartnershipSubmit = handlePartnershipSubmit;
window.sendViaEmail = sendViaEmail;
window.copyExecutiveEmail = copyExecutiveEmail;
window.copyPath = copyPath;
window.toggleSoundFromDock = toggleSoundFromDock;
window.showToast = showToast;
window.openTerminalModal = openTerminalModal;
window.closeTerminalModal = closeTerminalModal;
window.runCliQuick = runCliQuick;
window.executeCliCommand = executeCliCommand;
window.triggerWaslSimulate = triggerWaslSimulate;
window.selectSmhDevice = selectSmhDevice;
window.updateSmhCalculations = updateSmhCalculations;
