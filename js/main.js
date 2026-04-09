// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initCupAnimation();
  initLangToggle();
  initCupImageFallback();
  initMapButtons();
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

  function showFallback() {
    img.style.display = 'none';
    fallback.style.display = 'flex';
  }

  img.addEventListener('error', showFallback);
  img.addEventListener('load', () => {
    fallback.style.display = 'none';
  });

  // Image may have already failed before listener was attached (cached 404)
  if (img.complete && img.naturalHeight === 0) {
    showFallback();
  }
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

// Show only the relevant map button based on the user's platform.
// iOS → Apple Maps only | Android → Google Maps only | Desktop → both
function initMapButtons() {
  const googleBtn = document.querySelector('.location-btn--google');
  const appleBtn = document.querySelector('.location-btn--apple');
  if (!googleBtn || !appleBtn) return;

  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);

  if (isIOS) {
    googleBtn.style.display = 'none';
  } else if (isAndroid) {
    appleBtn.style.display = 'none';
  }
  // Desktop: both buttons remain visible
}
