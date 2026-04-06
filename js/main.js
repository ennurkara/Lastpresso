// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initCupAnimation();
  initLangToggle();
  initCupImageFallback();
});

// Nav background darkens on scroll
function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// Cup rotates 360° as user scrolls through the hero section
function initCupAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const cup = document.getElementById('cup');
  if (!cup) return;

  gsap.to(cup, {
    rotation: 360,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });
}

// Show fallback LP circle if cup image fails to load
function initCupImageFallback() {
  const img = document.getElementById('cupImg');
  const fallback = document.getElementById('cupFallback');
  if (!img || !fallback) return;

  img.addEventListener('error', () => {
    img.style.display = 'none';
    fallback.style.display = 'flex';
  });

  img.addEventListener('load', () => {
    fallback.style.display = 'none';
  });
}

// DE/EN language toggle — switches all data-de / data-en text elements
function initLangToggle() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;

  let currentLang = 'de';

  btn.addEventListener('click', () => {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    btn.textContent = currentLang.toUpperCase();
    document.documentElement.lang = currentLang;
    applyLanguage(currentLang);
  });
}

function applyLanguage(lang) {
  const attr = `data-${lang}`;
  document.querySelectorAll(`[${attr}]`).forEach(el => {
    el.textContent = el.getAttribute(attr);
  });
}
