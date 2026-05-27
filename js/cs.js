/* Case Study System — shared JS */

// ── Reveal on scroll ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Lightbox ──
const lb      = document.getElementById('lightbox');
const lbImg   = document.getElementById('lb-img');
const lbCap   = document.getElementById('lb-caption');
let lbItems   = [];
let lbCurrent = 0;

function openLb(idx) {
  lbCurrent = idx;
  lbImg.src = lbItems[idx].img;
  lbCap.textContent = lbItems[idx].label || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
function lbNav(dir) {
  lbCurrent = (lbCurrent + dir + lbItems.length) % lbItems.length;
  lbImg.src = lbItems[lbCurrent].img;
  lbCap.textContent = lbItems[lbCurrent].label || '';
}

document.querySelectorAll('.cs-gallery-item').forEach((item, i) => {
  lbItems.push({
    img: item.querySelector('img').src,
    label: item.dataset.label || '',
  });
  item.addEventListener('click', () => openLb(i));
});

document.getElementById('lbClose')?.addEventListener('click', closeLb);
document.getElementById('lbPrev')?.addEventListener('click', () => lbNav(-1));
document.getElementById('lbNext')?.addEventListener('click', () => lbNav(1));
lb?.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (!lb?.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft')
    lbNav(e.key === 'ArrowRight' ? 1 : -1);
});
