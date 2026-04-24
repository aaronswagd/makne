/**
 * ==========================================
 * MAKNÉ — MAIN.JS
 * ==========================================
 * Sticky navbar, smooth scroll, scroll reveal
 */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');

  // ========== STICKY NAVBAR ==========
  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);

  // ========== SMOOTH SCROLL ==========
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  // ========== SCROLL REVEAL — PORTFOLIO ==========
  function initPortfolioReveal() {
    const projectCards = document.querySelectorAll('.project-card.reveal');

    if (projectCards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    projectCards.forEach((card) => observer.observe(card));

    window.addEventListener('load', () => {
      projectCards.forEach((card) => {
        if (card.getBoundingClientRect().top < window.innerHeight - 80) {
          card.classList.add('visible');
        }
      });
    });
  }

  // ========== SCROLL REVEAL — EXISTING ==========
  function initExistingReveal() {
    const revealElements = document.querySelectorAll('.service-card, .testimonial, .step');

    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(25px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    window.addEventListener('load', () => {
      revealElements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    });
  }

  // ========== INIT ==========
  function init() {
    initSmoothScroll();
    initPortfolioReveal();
    initExistingReveal();
    handleScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
