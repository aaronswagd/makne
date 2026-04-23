/**
 * ==========================================
 * PREMIUM PERSONAL BRAND — SCRIPT.JS
 * ==========================================
 * Handles:
 *  - Sticky navbar with blur effect
 *  - Smooth scrolling for anchor links
 *  - Scroll reveal animations (Intersection Observer)
 */

(function () {
  'use strict';

  // ========== DOM ELEMENTS ==========
  const navbar = document.getElementById('navbar');

  // ========== STICKY NAVBAR ==========
  function handleScroll() {
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

  // ========== SCROLL REVEAL ==========
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.portfolio-item, .service-card, .testimonial, .step'
    );

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
      // Set initial hidden state
      el.style.opacity = '0';
      el.style.transform = 'translateY(25px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Reveal elements already visible on load
    window.addEventListener('load', () => {
      revealElements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    });
  }

  // ========== INITIALIZE ==========
  function init() {
    initSmoothScroll();
    initScrollReveal();
    // Run once on load to set correct navbar state
    handleScroll();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
