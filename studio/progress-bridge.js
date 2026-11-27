(function () {
  const SUPABASE_URL = 'https://owlglaqltdniywcprzab.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93bGdsYXFsdGRuaXl3Y3ByemFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUzNTY2NDgsImV4cCI6MjExMDkzMjY0OH0._Y7iR4YU7z10-TOkRHSYC_466_5pJ3mFSYjRqGgbWGo';

  function getAuthToken() {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.includes('auth-token')) {
        try {
          const parsed = JSON.parse(localStorage.getItem(k));
          if (parsed && parsed.access_token) return parsed.access_token;
        } catch (_) {}
      }
    }
    return SUPABASE_ANON_KEY;
  }

  async function sbFetch(path, options = {}) {
    const token = getAuthToken();
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      ...options,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    return res.ok ? res.json().catch(() => []) : [];
  }

  function injectWidget() {
    if (document.getElementById('art-progress-fab')) return;

    const fab = document.createElement('button');
    fab.id = 'art-progress-fab';
    fab.textContent = 'التقدم والفريق · Live';
    fab.style.cssText = [
      'position:fixed', 'bottom:20px', 'left:20px', 'z-index:9999',
      'padding:10px 16px', 'border-radius:999px',
      'background:#0A0A0A', 'color:#FFFFFF', 'border:1px solid #27272A',
      'font-family:inherit', 'font-size:13px', 'font-weight:700',
      'cursor:pointer', 'box-shadow:0 8px 24px rgba(0,0,0,0.45)'
    ].join(';');

    const drawer = document.createElement('div');
    drawer.id = 'art-progress-drawer';
    drawer.style.cssText = [
      'position:fixed', 'bottom:72px', 'left:20px', 'z-index:9999',
      'width:min(380px, calc(100vw - 40px))', 'max-height:72vh', 'overflow-y:auto',
      'background:#0A0A0A', 'color:#FFFFFF', 'border:1px solid #27272A',
      'border-radius:16px', 'padding:16px', 'display:none',
      'box-shadow:0 16px 40px rgba(0,0,0,0.65)', 'direction:rtl'
    ].join(';');

    fab.onclick = () => {
      const open = drawer.style.display === 'block';
      drawer.style.display = open ? 'none' : 'block';
      if (!open) refresh();
    };

    document.body.appendChild(fab);
    document.body.appendChild(drawer);

    async function refresh() {
      const [milestones, tasks, feed] = await Promise.all([
        sbFetch('plan_milestones?select=*&order=sort_order.asc'),
        sbFetch('plan_tasks?select=*&order=updated_at.desc&limit=10'),
        sbFetch('activity_feed?select=*&order=created_at.desc&limit=8')
      ]);

      const mHtml = milestones.map(m => `
        <div style="background:#141416;border:1px solid #27272A;border-radius:10px;padding:10px;margin-bottom:8px;">
          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;">
            <span>${m.title_ar}</span>
            <span>${m.progress_pct}%</span>
          </div>
          <div style="height:5px;background:#27272A;border-radius:999px;margin-top:6px;overflow:hidden;">
            <div style="height:100%;width:${m.progress_pct}%;background:#FFFFFF;"></div>
          </div>
        </div>
      `).join('') || '<div style="color:#A1A1AA;font-size:12px;">سجل الدخول لعرض المراحل</div>';

      const tHtml = tasks.map(t => `
        <div style="display:flex;justify-content:space-between;align-items:center;background:#141416;border:1px solid #27272A;border-radius:10px;padding:8px 10px;margin-bottom:6px;font-size:12px;">
          <span>${t.title_ar}</span>
          <span style="color:#10B981;font-weight:700;">${t.status}</span>
        </div>
      `).join('');

      const fHtml = feed.map(f => `
        <div style="font-size:11px;color:#A1A1AA;padding:4px 0;border-bottom:1px solid #1C1C20;">
          <strong style="color:#FFFFFF;">${f.actor_name}:</strong> ${f.action_text_ar}
        </div>
      `).join('');

      drawer.innerHTML = `
        <div style="font-size:10px;color:#A1A1AA;letter-spacing:0.08em;font-weight:700;">ARTELLIGENCE · ART • INTELLIGENCE • IMPACT</div>
        <div style="font-size:16px;font-weight:700;margin:4px 0 12px;">التقدم اللحظي والفريق</div>
        <div style="font-size:11px;color:#A1A1AA;margin-bottom:6px;">مراحل الخطة</div>
        ${mHtml}
        <div style="font-size:11px;color:#A1A1AA;margin:10px 0 6px;">أحدث المهام</div>
        ${tHtml}
        <div style="font-size:11px;color:#A1A1AA;margin:10px 0 6px;">نشاط الفريق</div>
        ${fHtml}
        <div style="margin-top:12px;padding-top:8px;border-top:1px solid #27272A;text-align:center;font-size:10px;color:#A1A1AA;">
          Ahmed Issam Ramadan • VentureCycle Studio · SSOT v2.0
        </div>
      `;
    }

    setInterval(() => {
      if (drawer.style.display === 'block') refresh();
    }, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectWidget);
  } else {
    injectWidget();
  }
})();
