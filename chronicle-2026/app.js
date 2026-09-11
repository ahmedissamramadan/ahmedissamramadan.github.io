// ==========================================================================
// THE 2026 GRAND CHRONICLE — APPLICATION LOGIC
// Architect: Ahmed Issam Ramadan
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Particle Canvas
  new ParticleCanvas("particle-canvas");

  // 2. Initialize Clocks & Metadata
  initLiveClock();

  // 3. Render Profile & Metrics
  renderHeroProfile();
  renderGlobalMetrics();

  // 4. Render Timeline
  renderTimeline();

  // 5. Render Domains & Items
  renderDomainTabs();
  renderDomainItems("all");

  // 6. Render Interactive Sub-modules
  renderTopologyDiagram();
  renderWaslAssetsExplorer();
  renderCorelinkDiagnostic();
  renderEngineeringHub();
  renderVaultCertifications();

  // 6.5 Render V3 Hyper-Edition Interactive Modules
  renderWaslSimulator();
  renderSmhRoiCalculator();
  initTopologyPacketFlow();
  setupTerminal();

  // 7. Setup Event Listeners (Search, Sound, Modals)
  setupEventListeners();

  // 8. Lucide Icons initialization
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Live Clock for 2026 EEST
function initLiveClock() {
  const clockEl = document.getElementById("live-clock");
  if (!clockEl) return;
  const update = () => {
    const now = new Date();
    // System date set to 2026
    const options = { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    clockEl.textContent = "القاهرة • " + now.toLocaleDateString("ar-EG", options);
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
      <div class="flex items-center gap-3">
        <div class="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/20">
          <div class="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950 font-heading text-2xl font-bold text-white">
            AIR
          </div>
          <span class="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
          </span>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl md:text-4xl font-bold tracking-tight text-white font-heading">${profile.name}</h1>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-medium badge-blue font-en-badge">2026 Master Chronicle</span>
          </div>
          <p class="text-sm md:text-base text-slate-400 mt-1 font-heading">${profile.title}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button id="btn-sound-toggle" class="glass-pill btn-press px-4 py-2 rounded-xl text-xs flex items-center gap-2 text-slate-300 hover:text-white">
          <i data-lucide="volume-x" id="sound-icon" class="w-4 h-4"></i>
          <span id="sound-label">المؤثرات الصوتية: معطلة</span>
        </button>
        <button onclick="window.print()" class="glass-pill btn-press px-4 py-2 rounded-xl text-xs flex items-center gap-2 text-slate-300 hover:text-white">
          <i data-lucide="printer" class="w-4 h-4"></i>
          <span>طباعة السجل</span>
        </button>
      </div>
    </div>

    <div class="glass-panel rounded-2xl p-5 mb-6 border-slate-800/80">
      <div class="flex items-start gap-3">
        <i data-lucide="shield-alert" class="w-5 h-5 text-amber-400 shrink-0 mt-0.5"></i>
        <div>
          <h4 class="text-xs font-bold text-amber-300 font-heading mb-1">التوثيق الرسمي وقواعد الهوية المعتمدة</h4>
          <p class="text-xs text-slate-300 leading-relaxed">${profile.credentialsNote} خريج ليسانس حقوق جامعة الزقازيق (2022) دون عمل بالمحاماة ولا يحمل عضوية النقابة. كافة القدرات البرمجية وهندسة النظم وتطوير الويب وقواعد البيانات والأتمتة <strong>مكتسبة ذاتياً بالممارسة والتطبيق الفعلي المكثف</strong>.</p>
        </div>
      </div>
    </div>

    <p class="text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-4xl">
      ${profile.bio}
    </p>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
      <div class="glass-panel p-3.5 rounded-xl">
        <span class="text-[11px] font-bold text-blue-400 block mb-1.5 font-heading">🎨 تصميم الواجهات (UI/UX)</span>
        <div class="flex flex-wrap gap-1.5">
          ${profile.stack.design.map(s => `<span class="text-[11px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800">${s}</span>`).join("")}
        </div>
      </div>
      <div class="glass-panel p-3.5 rounded-xl">
        <span class="text-[11px] font-bold text-indigo-400 block mb-1.5 font-heading">⚡ الواجهات الأمامية (Frontend)</span>
        <div class="flex flex-wrap gap-1.5">
          ${profile.stack.frontend.map(s => `<span class="text-[11px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800">${s}</span>`).join("")}
        </div>
      </div>
      <div class="glass-panel p-3.5 rounded-xl">
        <span class="text-[11px] font-bold text-purple-400 block mb-1.5 font-heading">⚙️ الخلفيات والبيانات (Backend)</span>
        <div class="flex flex-wrap gap-1.5">
          ${profile.stack.backend.map(s => `<span class="text-[11px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800">${s}</span>`).join("")}
        </div>
      </div>
      <div class="glass-panel p-3.5 rounded-xl">
        <span class="text-[11px] font-bold text-emerald-400 block mb-1.5 font-heading">🤖 الأتمتة والـ MCP</span>
        <div class="flex flex-wrap gap-1.5">
          ${profile.stack.automation.map(s => `<span class="text-[11px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800">${s}</span>`).join("")}
        </div>
      </div>
    </div>
  `;
}

// Global KPI Counters
function renderGlobalMetrics() {
  const container = document.getElementById("global-metrics-grid");
  if (!container) return;

  container.innerHTML = CHRONICLE_DATA.globalMetrics.map((m, idx) => `
    <div class="glass-panel spotlight-card p-5 rounded-2xl relative overflow-hidden card-interactive cursor-pointer" onclick="showMetricDetails('${m.id}')">
      <div class="flex items-center justify-between mb-3">
        <span class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-${m.color}-400">
          <i data-lucide="${m.icon}" class="w-5 h-5"></i>
        </span>
        <span class="text-[11px] px-2 py-0.5 rounded-full badge-${m.color} font-en-badge">#0${idx + 1}</span>
      </div>
      <div class="font-mono-num text-3xl md:text-4xl font-extrabold text-white mb-1">${m.value}</div>
      <div class="text-xs md:text-sm font-medium text-slate-300 font-heading mb-1">${m.label}</div>
      <div class="text-[11px] text-slate-400 flex items-center gap-1">
        <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-emerald-400"></i>
        <span>${m.change}</span>
      </div>
    </div>
  `).join("");
}

// Timeline Section
function renderTimeline() {
  const container = document.getElementById("timeline-container");
  if (!container) return;

  container.innerHTML = `
    <div class="relative">
      <div class="absolute right-5 md:right-8 top-0 bottom-0 w-0.5 timeline-line"></div>
      <div class="space-y-12">
        ${CHRONICLE_DATA.timeline.map((q, qIdx) => `
          <div class="relative pr-12 md:pr-20">
            <div class="absolute right-3.5 md:right-6.5 top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-slate-950 ring-4 ring-slate-900 border-2 border-${q.color}-400"></div>
            
            <div class="glass-panel p-6 rounded-2xl border-slate-800/80 mb-4">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div class="flex items-center gap-2">
                  <span class="text-xs px-3 py-1 rounded-full badge-${q.color} font-bold font-heading">${q.quarter}</span>
                  <span class="text-xs text-slate-400 font-mono-num font-en-badge">${q.period}</span>
                </div>
                <span class="text-xs text-slate-400 font-heading">${q.badge}</span>
              </div>
              <h3 class="text-base md:text-lg font-bold text-white font-heading mb-4">${q.tagline}</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${q.milestones.map(m => `
                  <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div class="flex items-center gap-2 mb-1.5">
                      <i data-lucide="check-circle-2" class="w-4 h-4 text-${q.color}-400 shrink-0"></i>
                      <span class="text-xs font-bold text-white font-heading">${m.title}</span>
                      <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono-num mr-auto">${m.date}</span>
                    </div>
                    <p class="text-xs text-slate-300 leading-relaxed">${m.desc}</p>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// Domain Tabs & Filtering
let activeDomain = "all";
let currentSearchQuery = "";

function renderDomainTabs() {
  const container = document.getElementById("domain-tabs-container");
  if (!container) return;

  const tabs = [
    { id: "all", label: "كافة الإنجازات (الكل)", count: "33+" },
    { id: "software", label: "💻 البرمجيات و SaaS", count: "6" },
    { id: "agency", label: "🏢 الوكالة و CRM", count: "4" },
    { id: "engineering", label: "🏗️ الهندسة والميدان", count: "3" },
    { id: "branding", label: "🎨 الأصول والهويات", count: "3" },
    { id: "agents", label: "🤖 وكلاء AI والـ MCP", count: "3" },
    { id: "certifications", label: "🎓 الشهادات المعتمدة", count: "11+" }
  ];

  container.innerHTML = tabs.map(t => `
    <button onclick="switchDomainTab('${t.id}')" id="tab-btn-${t.id}" class="px-4 py-2 rounded-xl text-xs md:text-sm font-heading font-medium transition-all btn-press ${t.id === activeDomain ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "glass-pill text-slate-400 hover:text-slate-200"}">
      ${t.label} <span class="text-[10px] opacity-75 font-mono-num">(${t.count})</span>
    </button>
  `).join("");
}

function switchDomainTab(domainId) {
  if (window.soundFX) window.soundFX.click();
  activeDomain = domainId;
  renderDomainTabs();
  renderDomainItems(domainId);
}

function renderDomainItems(domainId) {
  const container = document.getElementById("domain-items-grid");
  if (!container) return;

  let allItems = [];
  const { domains } = CHRONICLE_DATA;

  if (domainId === "all") {
    Object.keys(domains).forEach(key => {
      const d = domains[key];
      d.items.forEach(item => {
        allItems.push({ ...item, domainKey: key, domainTitle: d.title, domainColor: d.color });
      });
    });
  } else if (domains[domainId]) {
    const d = domains[domainId];
    allItems = d.items.map(item => ({ ...item, domainKey: domainId, domainTitle: d.title, domainColor: d.color }));
  }

  // Filter with Search Query
  if (currentSearchQuery.trim()) {
    const q = currentSearchQuery.toLowerCase();
    allItems = allItems.filter(item => {
      const matchTitle = (item.title || "").toLowerCase().includes(q);
      const matchDesc = (item.description || item.desc || "").toLowerCase().includes(q);
      const matchTech = (item.tech || []).some(t => t.toLowerCase().includes(q));
      const matchMetrics = (item.metrics || []).some(m => m.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchTech || matchMetrics;
    });
  }

  const countBadge = document.getElementById("search-results-counter");
  if (countBadge) {
    countBadge.textContent = `تم العثور على ${allItems.length} عنصراً موثقاً`;
  }

  if (allItems.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 glass-panel rounded-2xl">
        <i data-lucide="search-x" class="w-12 h-12 text-slate-500 mx-auto mb-3"></i>
        <h4 class="text-base font-bold text-slate-300 font-heading mb-1">لا توجد نتائج مطابقة لبحثك</h4>
        <p class="text-xs text-slate-500">جرب استخدام كلمات مفتاحية أخرى مثل: WASL, ClickUp, Supabase, Tohamy, الشهادات</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = allItems.map(item => `
    <div class="glass-panel spotlight-card rounded-2xl p-5 card-interactive flex flex-col justify-between cursor-pointer border-slate-800/80" onclick="openItemModal('${item.id}', '${item.domainKey}')">
      <div>
        <div class="flex items-start justify-between gap-2 mb-3">
          <span class="text-[11px] px-2.5 py-1 rounded-lg badge-${item.domainColor || "blue"} font-heading font-medium">
            ${item.category || item.badge || item.issuer || item.domainTitle}
          </span>
          <span class="text-[10px] text-slate-400 font-mono-num">${item.date || item.status || "2026"}</span>
        </div>

        <h3 class="text-base md:text-lg font-bold text-white font-heading mb-2 hover:text-indigo-400 transition-colors">${item.title}</h3>
        <p class="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">${item.description || item.desc}</p>

        ${item.metrics ? `
          <div class="space-y-1.5 mb-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
            ${item.metrics.slice(0, 2).map(m => `
              <div class="flex items-center gap-2 text-xs text-slate-300">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-indigo-400 shrink-0"></i>
                <span class="truncate">${m}</span>
              </div>
            `).join("")}
          </div>
        ` : ""}
      </div>

      <div>
        ${item.tech ? `
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${item.tech.slice(0, 4).map(t => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-en-badge">${t}</span>`).join("")}
            ${item.tech.length > 4 ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">+${item.tech.length - 4}</span>` : ""}
          </div>
        ` : ""}

        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-heading font-medium">
          <span>استعراض الملف الموسوعي الكامل</span>
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
        </div>
      </div>
    </div>
  `).join("");

  if (window.lucide) window.lucide.createIcons();
  attachSpotlightEffect();
}

// Spotlight Effect
function attachSpotlightEffect() {
  document.querySelectorAll(".spotlight-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

// Modal Detail View
function openItemModal(itemId, domainKey) {
  if (window.soundFX) window.soundFX.openModal();
  let item = null;
  const { domains } = CHRONICLE_DATA;

  if (domains[domainKey]) {
    item = domains[domainKey].items.find(i => i.id === itemId);
  } else {
    Object.keys(domains).forEach(k => {
      const found = domains[k].items.find(i => i.id === itemId);
      if (found) {
        item = found;
        domainKey = k;
      }
    });
  }

  if (!item) return;

  const modal = document.getElementById("detail-modal");
  const modalBody = document.getElementById("modal-content-body");
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="flex items-start justify-between gap-4 mb-4">
      <div>
        <span class="text-xs px-3 py-1 rounded-full badge-blue font-heading font-bold mb-2 inline-block">
          ${item.category || item.badge || item.issuer || "توثيق معتمد"}
        </span>
        <h2 class="text-xl md:text-2xl font-bold text-white font-heading">${item.title}</h2>
        <span class="text-xs text-slate-400 font-mono-num mt-1 block">${item.date || item.status || "نظام نشط 2026"}</span>
      </div>
      <button onclick="closeDetailModal()" class="p-2 rounded-xl glass-pill text-slate-400 hover:text-white btn-press">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
    </div>

    <div class="text-sm text-slate-300 leading-relaxed mb-6 space-y-3">
      <p>${item.description || item.desc}</p>
    </div>

    ${item.highlights ? `
      <div class="mb-6">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">أهم المخرجات والإنجازات الفنية:</h4>
        <div class="space-y-2">
          ${item.highlights.map(h => `
            <div class="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
              <span>${h}</span>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}

    ${item.metrics ? `
      <div class="mb-6">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">لوحة المؤشرات الخاصة بالمشروع:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          ${item.metrics.map(m => `
            <div class="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-900/50 text-xs text-indigo-300 flex items-center gap-2">
              <i data-lucide="zap" class="w-3.5 h-3.5 text-indigo-400"></i>
              <span>${m}</span>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}

    ${item.tech ? `
      <div class="mb-6">
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">المكدس التقني المستخدم (Tech Stack):</h4>
        <div class="flex flex-wrap gap-2">
          ${item.tech.map(t => `<span class="text-xs px-3 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-en-badge">${t}</span>`).join("")}
        </div>
      </div>
    ` : ""}

    ${item.localPath ? `
      <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
        <div class="flex items-center justify-between mb-1">
          <span class="text-[11px] font-bold text-slate-400 font-heading">المسار المعتمد على جهاز الماك:</span>
          <button onclick="navigator.clipboard.writeText('${item.localPath}'); showToast('تم نسخ مسار الماك بنجاح!', 'check-circle')" class="text-[10px] text-indigo-400 hover:text-indigo-300">نسخ المسار</button>
        </div>
        <div class="font-mono-num text-xs text-slate-300 break-all">${item.localPath}</div>
      </div>
    ` : ""}
  `;

  modal.classList.add("active");
  if (window.lucide) window.lucide.createIcons();
}

function closeDetailModal() {
  if (window.soundFX) window.soundFX.closeModal();
  const modal = document.getElementById("detail-modal");
  if (modal) modal.classList.remove("active");
}

function showMetricDetails(metricId) {
  const metric = CHRONICLE_DATA.globalMetrics.find(m => m.id === metricId);
  if (!metric) return;
  if (window.soundFX) window.soundFX.click();
  showToast(`${metric.label}: ${metric.value} (${metric.change})`, "bar-chart-3");
}

// Interactive Topology Diagram
function renderTopologyDiagram() {
  const container = document.getElementById("topology-nodes-container");
  if (!container) return;

  container.innerHTML = CHRONICLE_DATA.topologyNodes.map(node => `
    <div class="glass-panel p-4 rounded-xl text-center card-interactive cursor-pointer border-slate-800/80 hover:border-indigo-500/50" onclick="showToast('${node.label}: ${node.role}', '${node.icon}')">
      <div class="w-10 h-10 mx-auto mb-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
        <i data-lucide="${node.icon}" class="w-5 h-5"></i>
      </div>
      <h4 class="text-xs font-bold text-white font-heading truncate">${node.label}</h4>
      <p class="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">${node.role}</p>
    </div>
  `).join("");
}

// Wasl 299 Visual Assets Explorer
function renderWaslAssetsExplorer() {
  const container = document.getElementById("wasl-assets-summary");
  if (!container) return;

  const categories = [
    { title: "00. التخطيط والاستراتيجية", count: "13 ورقة عمل SOSTAC", icon: "file-spreadsheet" },
    { title: "01. منظومة الهوية والشعارات", count: "15 أصلاً", icon: "feather" },
    { title: "02. واجهات المنصة والتطبيقات", count: "16 أصلاً", icon: "layout" },
    { title: "03. الفنون التراثية والرقمية", count: "69 أصلاً", icon: "compass" },
    { title: "04. الاقتباسات والتايبوجرافي", count: "41 أصلاً", icon: "type" },
    { title: "05. حملات السوشيال ميديا", count: "122 أصلاً", icon: "share-2" },
    { title: "06. الفعاليات و Demo Days", count: "18 أصلاً", icon: "calendar" },
    { title: "07. تمويل واستقطاب الصناديق", count: "16 أصلاً", icon: "trending-up" },
    { title: "08. فيديو وموشن جرافيك", count: "2 مقطعي Loop", icon: "video" }
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

// CoreLink Diagnostic Widget
function renderCorelinkDiagnostic() {
  const container = document.getElementById("corelink-diagnostic-content");
  if (!container) return;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
      <div class="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40">
        <span class="text-xs text-rose-400 font-bold block mb-1 font-heading">1. تشخيص الاختناق الراهن</span>
        <div class="font-mono-num text-2xl font-bold text-white mb-1">78 مهمة</div>
        <p class="text-xs text-slate-400">تراكم مهام متأخرة مقابل 23 مشروعاً، مع نسبة 30-40% هدر إعادة عمل لغياب التبعيات.</p>
      </div>
      <div class="p-4 rounded-xl bg-amber-950/30 border border-amber-900/40">
        <span class="text-xs text-amber-400 font-bold block mb-1 font-heading">2. إعادة الهيكلة والتنظيم</span>
        <div class="font-mono-num text-2xl font-bold text-white mb-1">4 مساحات</div>
        <p class="text-xs text-slate-400">توزيع مساحات ClickUp (Operations, HR, Finance, Client Accounts) واستيعاب 12 عميلاً.</p>
      </div>
      <div class="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/40">
        <span class="text-xs text-emerald-400 font-bold block mb-1 font-heading">3. نموذج التشغيل المستهدف</span>
        <div class="font-mono-num text-2xl font-bold text-white mb-1">Active Workflow</div>
        <p class="text-xs text-slate-400">تحويل النظام من مسجل بيانات سلبي إلى محرك سير عمل نشط يربط التبعيات آلياً.</p>
      </div>
    </div>
  `;
}

// Engineering & Medical Joint Venture Hub
function renderEngineeringHub() {
  const container = document.getElementById("engineering-hub-content");
  if (!container) return;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="glass-panel p-5 rounded-2xl border-slate-800/80">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs px-2.5 py-1 rounded badge-emerald font-heading font-bold">Tohamy House & Pizza Party</span>
          <span class="text-xs text-slate-400 font-mono-num">مدينة نصر / المواقع</span>
        </div>
        <h4 class="text-base font-bold text-white font-heading mb-2">المقايسات وجداول الأبواب المعمارية</h4>
        <ul class="text-xs text-slate-300 space-y-2 mb-4">
          <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> مقايسة بيتزا بارتي المعتمدة بالأكواد المرجعية.</li>
          <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> فيلا د. خالد: اعتماد 9 أبواب مع تصحيح حلق الماستر ليكون 30 سم.</li>
          <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> مواقع: 107، العاصمة الإدارية (As-Built)، ومدينتي 55/20، والوصال.</li>
        </ul>
      </div>

      <div class="glass-panel p-5 rounded-2xl border-slate-800/80">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs px-2.5 py-1 rounded badge-blue font-heading font-bold">SMH Engineering & Vilorax JV</span>
          <span class="text-xs text-slate-400 font-mono-num">سبتمبر 2026</span>
        </div>
        <h4 class="text-base font-bold text-white font-heading mb-2">التحالف الاستراتيجي الطبي (م. هشام القناوي)</h4>
        <ul class="text-xs text-slate-300 space-y-2 mb-4">
          <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-blue-400"></i> دمج خبرات سلاسل الإمداد الطبية مع محركات استقطاب B2B الذكية.</li>
          <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-blue-400"></i> استخبارات مراكز الأشعة والسونار والمستشفيات في الدلتا والقاهرة.</li>
          <li class="flex items-center gap-2"><i data-lucide="check" class="w-3.5 h-3.5 text-blue-400"></i> اعتماد عقد الشراكة النهائي ومذكرة التفاهم ونموذج الـ BOQ الطبي.</li>
        </ul>
      </div>
    </div>
  `;
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
          <span class="text-[10px] px-2 py-0.5 rounded-full badge-amber font-heading font-medium">${c.issuer}</span>
          <span class="text-[10px] text-slate-400 font-mono-num">${c.date}</span>
        </div>
        <h4 class="text-xs font-bold text-white font-heading mb-1 hover:text-yellow-400 transition-colors">${c.title}</h4>
        <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">${c.desc}</p>
      </div>
      <div class="flex items-center justify-between text-[10px] text-yellow-400 font-heading pt-2 border-t border-slate-800/60">
        <span class="truncate max-w-[170px]">${c.badge}</span>
        <i data-lucide="award" class="w-3.5 h-3.5 shrink-0"></i>
      </div>
    </div>
  `).join("");
}

// Executive Toast Notification
let toastTimeout = null;
function showToast(message, iconName = "check-circle") {
  const toast = document.getElementById("executive-toast");
  const msgEl = document.getElementById("toast-message");
  const iconEl = document.getElementById("toast-icon");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  if (iconEl && iconName) {
    iconEl.setAttribute("data-lucide", iconName);
    if (window.lucide) window.lucide.createIcons();
  }

  toast.classList.add("toast-show");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("toast-show");
  }, 3200);
}

// Copy Executive Email with Clipboard & Feedback
function copyExecutiveEmail() {
  const email = "ahmedissam.work@gmail.com";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      if (window.soundFX) window.soundFX.success();
      showToast("تم نسخ البريد التنفيذي: " + email, "check-circle");
    }).catch(() => {
      fallbackCopy(email);
    });
  } else {
    fallbackCopy(email);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  ta.style.top = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.warn("Fallback copy failed", err);
  }
  document.body.removeChild(ta);
  if (window.soundFX) window.soundFX.success();
  showToast("تم نسخ البريد التنفيذي: " + text, "check-circle");
}

// Synchronize Sound UI between Header and Dock
function syncSoundUI(isMuted) {
  // Top header button
  const iconTop = document.getElementById("sound-icon");
  const labelTop = document.getElementById("sound-label");
  if (iconTop && labelTop) {
    if (isMuted) {
      iconTop.setAttribute("data-lucide", "volume-x");
      labelTop.textContent = "المؤثرات الصوتية: معطلة";
    } else {
      iconTop.setAttribute("data-lucide", "volume-2");
      labelTop.textContent = "المؤثرات الصوتية: نشطة";
    }
  }

  // Floating Dock button
  const iconDock = document.getElementById("dock-sound-icon");
  const tooltipDock = document.getElementById("dock-sound-tooltip");
  if (iconDock && tooltipDock) {
    if (isMuted) {
      iconDock.setAttribute("data-lucide", "volume-x");
      tooltipDock.textContent = "المؤثرات: معطلة (انقر للتفعيل)";
    } else {
      iconDock.setAttribute("data-lucide", "volume-2");
      tooltipDock.textContent = "المؤثرات: نشطة 🔊";
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

function toggleSoundFromDock() {
  if (window.soundFX) {
    const isMuted = window.soundFX.toggleMute();
    syncSoundUI(isMuted);
    showToast(isMuted ? "تم كتم المؤثرات الصوتية" : "تم تفعيل المؤثرات الصوتية 🔊", isMuted ? "volume-x" : "volume-2");
  }
}

// B2B Partnership Inquiry Modal Drawer Controls
function openPartnershipModal(presetType = "") {
  if (window.soundFX) window.soundFX.openModal();
  const modal = document.getElementById("partnership-modal");
  if (!modal) return;

  if (presetType) {
    const radios = document.querySelectorAll('input[name="partnership_type"]');
    radios.forEach(r => {
      if (r.value === presetType || (presetType.includes("AI") && r.value.includes("AI"))) {
        r.checked = true;
      }
    });
  }

  modal.classList.add("active");
  if (window.lucide) window.lucide.createIcons();
}

function closePartnershipModal() {
  if (window.soundFX) window.soundFX.closeModal();
  const modal = document.getElementById("partnership-modal");
  if (modal) modal.classList.remove("active");
}

function handlePartnershipSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("partnership-form");
  if (!form) return;

  const type = form.querySelector('input[name="partnership_type"]:checked')?.value || "Consulting & Advisory";
  const name = document.getElementById("partner-name")?.value || "";
  const contact = document.getElementById("partner-contact")?.value || "";
  const timeline = document.getElementById("partner-timeline")?.value || "";
  const brief = document.getElementById("partner-brief")?.value || "";

  const text = `السلام عليكم م. أحمد، أود الاستفسار بخصوص تعاون تنفيذي:
• المسار: ${type}
• الجهة/الاسم: ${name}
• وسيلة التواصل: ${contact}
• الإطار الزمني: ${timeline}
• نبذة: ${brief}`;

  const telegramUrl = `https://t.me/ahmedissam_bot?text=${encodeURIComponent(text)}`;
  window.open(telegramUrl, "_blank");

  closePartnershipModal();
  if (window.soundFX) window.soundFX.success();
  showToast("تم إعداد رسالتك وفتح تيليجرام بنجاح!", "send");
}

function sendViaEmail() {
  const form = document.getElementById("partnership-form");
  const type = form ? (form.querySelector('input[name="partnership_type"]:checked')?.value || "Consulting & Advisory") : "Executive Consultation";
  const name = document.getElementById("partner-name")?.value || "";
  const contact = document.getElementById("partner-contact")?.value || "";
  const timeline = document.getElementById("partner-timeline")?.value || "";
  const brief = document.getElementById("partner-brief")?.value || "";

  const subject = `طلب استشارة / شراكة B2B [${type}] — ${name || "جهة مهتمة"}`;
  const body = `السلام عليكم مهندس أحمد،

أرغب في بحث سبل التعاون وفق التفاصيل الآتية:
- المسار المطلوب: ${type}
- الاسم / الشركة: ${name}
- وسيلة التواصل: ${contact}
- الإطار الزمني: ${timeline}
- نبذة عن المشروع والتحديات:
${brief}

مع التقدير.`;

  const mailtoUrl = `mailto:ahmedissam.work@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;

  closePartnershipModal();
  if (window.soundFX) window.soundFX.success();
  showToast("تم فتح عميل البريد الإلكتروني!", "mail");
}

// Event Listeners
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      currentSearchQuery = e.target.value;
      renderDomainItems(activeDomain);
    });
  }

  // Sound Toggle Button
  const soundBtn = document.getElementById("btn-sound-toggle");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      if (window.soundFX) {
        const isMuted = window.soundFX.toggleMute();
        syncSoundUI(isMuted);
        showToast(isMuted ? "تم كتم المؤثرات الصوتية" : "تم تفعيل المؤثرات الصوتية 🔊", isMuted ? "volume-x" : "volume-2");
      }
    });
  }

  // Close modals on escape
  window.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeDetailModal();
      closePartnershipModal();
      closeTerminalModal();
    }
  });

  // Background clicks to close modals
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

  const tModal = document.getElementById("terminal-modal");
  if (tModal) {
    tModal.addEventListener("click", e => {
      if (e.target === tModal) closeTerminalModal();
    });
  }
}

// ==========================================================================
// V3.0 HYPER-EDITION ENRICHMENTS IMPLEMENTATION
// ==========================================================================

// 1. WASL Network Investor Matchmaking Simulator
let currentWaslFilters = {
  sector: "b2b_ai",
  stage: "seed",
  country: "sa"
};

function renderWaslSimulator() {
  const container = document.getElementById("wasl-simulator-container");
  if (!container || !window.WASL_SIMULATOR_DATA) return;

  const { sectors, stages, countries } = window.WASL_SIMULATOR_DATA;

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label class="block text-xs font-bold text-slate-300 font-heading mb-2">قطاع المشروع (Sector):</label>
        <select id="wasl-sim-sector" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-800/60 text-xs text-white focus:outline-none focus:border-purple-500 transition-all">
          ${sectors.map(s => `<option value="${s.id}" ${s.id === currentWaslFilters.sector ? "selected" : ""}>${s.labelAr}</option>`).join("")}
        </select>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-300 font-heading mb-2">مرحلة التمويل (Funding Stage):</label>
        <select id="wasl-sim-stage" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-800/60 text-xs text-white focus:outline-none focus:border-purple-500 transition-all">
          ${stages.map(s => `<option value="${s.id}" ${s.id === currentWaslFilters.stage ? "selected" : ""}>${s.labelAr}</option>`).join("")}
        </select>
      </div>

      <div>
        <label class="block text-xs font-bold text-slate-300 font-heading mb-2">السوق المستهدف (Target Market):</label>
        <select id="wasl-sim-country" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-purple-800/60 text-xs text-white focus:outline-none focus:border-purple-500 transition-all">
          ${countries.map(c => `<option value="${c.id}" ${c.id === currentWaslFilters.country ? "selected" : ""}>${c.labelAr}</option>`).join("")}
        </select>
      </div>
    </div>

    <div class="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-purple-900/40">
      <div class="flex items-center gap-2">
        <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="text-xs text-slate-300 font-heading" id="wasl-sim-status">نتائج المطابقة الاستثمارية التلقائية:</span>
      </div>
      <button onclick="triggerWaslSimulate()" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-heading font-bold transition-all shadow-md shadow-purple-600/30 flex items-center gap-1.5 btn-press">
        <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
        <span>إعادة المطابقة</span>
      </button>
    </div>

    <div id="wasl-sim-results" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"></div>
  `;

  // Attach change events
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
    <div class="p-4 rounded-xl bg-slate-900/90 border border-purple-700/40 flex flex-col justify-between transition-all hover:border-purple-400/60 hover:translate-y-[-2px] shadow-lg shadow-purple-950/20">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-xs font-bold text-white font-heading">${inv.name}</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono-num font-bold match-score-badge">
            ${inv.calculatedScore}% تطابق
          </span>
        </div>
        <p class="text-[11px] text-purple-300 font-heading mb-2">حجم التذكرة: <strong class="text-white font-mono-num">${inv.ticket}</strong></p>
        <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">${inv.thesis}</p>
      </div>
      <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
        <span>مستثمر معتمد بدليل WASL</span>
        <span class="text-emerald-400 flex items-center gap-1 font-heading">
          <i data-lucide="check-circle" class="w-3 h-3"></i> مؤهل للمراسلة
        </span>
      </div>
    </div>
  `).join("");

  if (window.lucide) window.lucide.createIcons();
}

function triggerWaslSimulate() {
  runWaslSimulation();
  showToast("تم تحديث مطابقة المستثمرين بنجاح!", "refresh-cw");
}

// 2. SMH Engineering & Vilorax Medical ROI Calculator
let currentSmhDevice = "ultrasound_4d";

function renderSmhRoiCalculator() {
  const container = document.getElementById("smh-roi-container");
  if (!container || !window.SMH_MEDICAL_EQUIPMENT_DATA) return;

  const { devices } = window.SMH_MEDICAL_EQUIPMENT_DATA;
  const current = devices.find(d => d.id === currentSmhDevice) || devices[0];

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Controls Column -->
      <div class="lg:col-span-6 space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-300 font-heading mb-2">اختر الجهاز الطبي المراد تقييمه:</label>
          <div class="grid grid-cols-2 gap-2">
            ${devices.map(d => `
              <button type="button" onclick="selectSmhDevice('${d.id}')" class="p-2.5 rounded-xl text-right text-xs font-heading border transition-all ${d.id === currentSmhDevice ? 'bg-emerald-950/60 border-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'}">
                <span class="block truncate">${d.nameAr}</span>
                <span class="text-[10px] text-emerald-400 font-mono-num">${(d.defaultPrice).toLocaleString()} EGP</span>
              </button>
            `).join("")}
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center text-xs font-heading mb-1">
            <span class="text-slate-300">متوسط عدد الفحوصات / العمليات اليومية:</span>
            <span class="text-emerald-400 font-mono-num font-bold text-sm" id="smh-daily-scans-val">${current.defaultDailyScans} فحص/يوم</span>
          </div>
          <input type="range" id="smh-daily-scans" min="4" max="60" value="${current.defaultDailyScans}" class="custom-range" oninput="updateSmhCalculations()">
          <div class="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>4 فحوصات</span>
            <span>30 فحص</span>
            <span>60 فحص</span>
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center text-xs font-heading mb-1">
            <span class="text-slate-300">سعر الفحص التشخيصي للمريض (EGP):</span>
            <span class="text-emerald-400 font-mono-num font-bold text-sm" id="smh-scan-fee-val">${current.scanPrice} EGP</span>
          </div>
          <input type="range" id="smh-scan-fee" min="100" max="3000" step="50" value="${current.scanPrice}" class="custom-range" oninput="updateSmhCalculations()">
          <div class="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>100 ج.م</span>
            <span>1,500 ج.م</span>
            <span>3,000 ج.م</span>
          </div>
        </div>
      </div>

      <!-- Financial Metrics Summary Column -->
      <div class="lg:col-span-6 flex flex-col justify-between bg-slate-900/90 border border-emerald-800/40 p-5 rounded-2xl">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs text-slate-400 font-heading">التحليل المالي الشهري والسنوي التقديري</span>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono-num font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" id="smh-roi-badge">
              فترة الاسترداد: 6.2 شهر
            </span>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span class="text-[11px] text-slate-400 font-heading block mb-1">الإيراد الشهري الصافي:</span>
              <div class="text-lg md:text-xl font-bold text-white font-mono-num" id="smh-monthly-net">-- EGP</div>
              <span class="text-[10px] text-slate-500">26 يوم عمل شهرياً</span>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span class="text-[11px] text-slate-400 font-heading block mb-1">التدفق النقدي السنوي الصافي:</span>
              <div class="text-lg md:text-xl font-bold text-emerald-400 font-mono-num" id="smh-annual-net">-- EGP</div>
              <span class="text-[10px] text-slate-500">بعد خصم الصيانة والمستهلكات</span>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/30 text-xs text-slate-300 leading-relaxed font-readex">
            <span class="text-emerald-400 font-bold font-heading block mb-1">مؤشر جدوى الاستثمار:</span>
            <p id="smh-insight-text">يعتبر هذا الجهاز من أعلى الأصول الطبية كفاءة تشغيلية وسرعة في استرداد رأس المال وفق معايير المستشفيات الخاصة بالدلتا والقاهرة.</p>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <span class="text-slate-400 font-heading">توريد وتشغيل وضمان SMH Engineering</span>
          <button onclick="openPartnershipModal('SMH Medical Equipment')" class="text-emerald-400 hover:text-emerald-300 font-bold font-heading flex items-center gap-1">
            طلب مقايسة طبية رسمية <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
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
  if (dailyScansVal) dailyScansVal.textContent = `${dailyScans} فحص/يوم`;
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

  if (monthlyNetEl) monthlyNetEl.textContent = `${Math.round(monthlyNet).toLocaleString()} EGP`;
  if (annualNetEl) annualNetEl.textContent = `${Math.round(annualNet).toLocaleString()} EGP`;

  if (roiBadgeEl) {
    roiBadgeEl.textContent = `فترة الاسترداد: ${paybackMonths} شهر`;
    if (parseFloat(paybackMonths) <= 12) {
      roiBadgeEl.className = "px-2.5 py-0.5 rounded-full text-[11px] font-mono-num font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    } else {
      roiBadgeEl.className = "px-2.5 py-0.5 rounded-full text-[11px] font-mono-num font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30";
    }
  }

  if (insightEl) {
    if (parseFloat(paybackMonths) < 8) {
      insightEl.textContent = `عائد استثنائي فائق: يسترد الجهاز كامل قيمته الرأسمالية في غضون ${paybackMonths} أشهر، محققاً صافي ربح سنوي يتجاوز ${Math.round(annualNet).toLocaleString()} جنيه مصري.`;
    } else {
      insightEl.textContent = `عائد استثماري آمن: تدفق نقدي دوري مستقر ومستدام مع تغطية كامل مصاريف الصيانة والاستهلاك الدوري.`;
    }
  }
}

// 3. Live Animated Packet Stream Canvas
function initTopologyPacketFlow() {
  const canvas = document.getElementById("topology-packet-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;

  const resize = () => {
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight || 176;
    canvas.width = width * (window.devicePixelRatio || 1);
    canvas.height = height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  };

  resize();
  window.addEventListener("resize", resize);

  // Logical network node positions
  const nodes = [
    { x: 0.15, y: 0.5, label: "AIR Core" },
    { x: 0.35, y: 0.25, label: "AGY (Next.js)" },
    { x: 0.35, y: 0.75, label: "Dia Intelligence" },
    { x: 0.65, y: 0.5, label: "Unified Memory" },
    { x: 0.85, y: 0.25, label: "Supabase Cloud" },
    { x: 0.85, y: 0.75, label: "ClickUp OS" }
  ];

  const connections = [
    { from: 0, to: 1, color: "#38bdf8" },
    { from: 0, to: 2, color: "#818cf8" },
    { from: 1, to: 3, color: "#38bdf8" },
    { from: 2, to: 3, color: "#a855f7" },
    { from: 3, to: 4, color: "#34d399" },
    { from: 3, to: 5, color: "#f59e0b" }
  ];

  // Packets
  const packets = [];
  for (let i = 0; i < 20; i++) {
    packets.push({
      connIdx: Math.floor(Math.random() * connections.length),
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.005,
      size: 2.5 + Math.random() * 1.5
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connection lines
    connections.forEach(conn => {
      const n1 = nodes[conn.from];
      const n2 = nodes[conn.to];
      ctx.beginPath();
      ctx.moveTo(n1.x * width, n1.y * height);
      ctx.lineTo(n2.x * width, n2.y * height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(node => {
      const nx = node.x * width;
      const ny = node.y * height;

      ctx.beginPath();
      ctx.arc(nx, ny, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#0f172a";
      ctx.fill();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "10px JetBrains Mono, monospace";
      ctx.fillStyle = "#94a3b8";
      ctx.textAlign = "center";
      ctx.fillText(node.label, nx, ny - 10);
    });

    // Draw and update moving packets
    packets.forEach(p => {
      p.progress += p.speed;
      if (p.progress > 1) {
        p.progress = 0;
        p.connIdx = Math.floor(Math.random() * connections.length);
      }

      const conn = connections[p.connIdx];
      const n1 = nodes[conn.from];
      const n2 = nodes[conn.to];

      const px = n1.x * width + (n2.x * width - n1.x * width) * p.progress;
      const py = n1.y * height + (n2.y * height - n1.y * height) * p.progress;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = conn.color;
      ctx.shadowColor = conn.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// 4. AIR-CLI Interactive Terminal HUD
function openTerminalModal() {
  const modal = document.getElementById("terminal-modal");
  if (modal) {
    modal.classList.add("active", "modal-open", "terminal-open");
    const input = document.getElementById("terminal-input");
    if (input) {
      setTimeout(() => input.focus(), 100);
    }
  }
  if (window.soundFX && window.soundFX.openModal) window.soundFX.openModal();
}

function closeTerminalModal() {
  const modal = document.getElementById("terminal-modal");
  if (modal) {
    modal.classList.remove("active", "modal-open", "terminal-open");
  }
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

  // Echo command
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

  if (cmd === "help") {
    resLine.innerHTML = `<span class="text-amber-400 font-bold">${CLI_COMMANDS_DATA.help}</span>`;
  } else if (CLI_COMMANDS_DATA[cmd]) {
    resLine.innerHTML = `<pre class="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">${CLI_COMMANDS_DATA[cmd]}</pre>`;
  } else if (cmd === "metrics") {
    const metricsStr = CHRONICLE_DATA.globalMetrics.map(m => `• ${m.label}: ${m.value} (${m.change})`).join("\n");
    resLine.innerHTML = `<pre class="text-xs text-emerald-400 font-mono whitespace-pre-wrap leading-relaxed">[SYSTEM TELEMETRY 2026]\n${metricsStr}</pre>`;
  } else if (cmd === "contact") {
    openPartnershipModal();
    resLine.innerHTML = `<span class="text-indigo-400">Opening B2B Executive Contact Drawer...</span>`;
  } else if (cmd === "lang") {
    toggleLanguage();
    resLine.innerHTML = `<span class="text-cyan-400">Language switched to: ${currentLanguage.toUpperCase()}</span>`;
  } else if (cmd === "") {
    return;
  } else {
    resLine.innerHTML = `<span class="text-rose-400">Command not found: '${rawCmd}'. Type <strong class="text-white">'help'</strong> for available system commands.</span>`;
  }

  output.appendChild(resLine);
  if (body) {
    body.scrollTop = body.scrollHeight;
  }
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

  // Global Cmd+K / Ctrl+K shortcut
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
}

// 5. Bilingual Engine (Arabic RTL ⟷ English LTR)
let currentLanguage = "ar";

function setLanguage(lang) {
  if (!window.BILINGUAL_TRANSLATIONS || !window.BILINGUAL_TRANSLATIONS[lang]) return;
  currentLanguage = lang;
  const t = window.BILINGUAL_TRANSLATIONS[lang];

  document.documentElement.lang = lang === "ar" ? "ar-EG" : "en-US";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";

  // Update label on navbar and dock
  const langLabel = document.getElementById("lang-label");
  if (langLabel) langLabel.textContent = lang === "ar" ? "EN" : "عربي";

  const dockTooltip = document.getElementById("dock-lang-tooltip");
  if (dockTooltip) dockTooltip.textContent = lang === "ar" ? "English (LTR)" : "العربية (RTL)";

  // Update elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });

  // Update placeholders
  const searchInput = document.getElementById("search-input");
  if (searchInput && t.searchPlaceholder) {
    searchInput.placeholder = t.searchPlaceholder;
  }

  showToast(lang === "ar" ? "تم تحويل الواجهة إلى العربية (RTL)" : "Interface switched to English (LTR)", "globe");
  if (window.soundFX) window.soundFX.click();
}

function toggleLanguage() {
  setLanguage(currentLanguage === "ar" ? "en" : "ar");
}

// Global functions for inline HTML calls
window.switchDomainTab = switchDomainTab;
window.openItemModal = openItemModal;
window.closeDetailModal = closeDetailModal;
window.showMetricDetails = showMetricDetails;
window.openPartnershipModal = openPartnershipModal;
window.closePartnershipModal = closePartnershipModal;
window.handlePartnershipSubmit = handlePartnershipSubmit;
window.sendViaEmail = sendViaEmail;
window.copyExecutiveEmail = copyExecutiveEmail;
window.toggleSoundFromDock = toggleSoundFromDock;
window.showToast = showToast;
window.openTerminalModal = openTerminalModal;
window.closeTerminalModal = closeTerminalModal;
window.runCliQuick = runCliQuick;
window.executeCliCommand = executeCliCommand;
window.triggerWaslSimulate = triggerWaslSimulate;
window.selectSmhDevice = selectSmhDevice;
window.updateSmhCalculations = updateSmhCalculations;
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;
