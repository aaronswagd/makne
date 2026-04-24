/**
 * ==========================================
 * PREMIUM PERSONAL BRAND — SCRIPT.JS
 * ==========================================
 * Handles:
 *  - Sticky navbar with blur effect
 *  - Smooth scrolling for anchor links
 *  - Scroll reveal animations for portfolio
 *  - Existing service/testimonial/step reveals
 */

(function () {
  'use strict';

  // ========== DOM ELEMENTS ==========
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

  // ========== SCROLL REVEAL — PORTFOLIO PROJECTS ==========
  function initPortfolioReveal() {
    const projectCards = document.querySelectorAll('.project-card.reveal');

    if (projectCards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after reveal for performance
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    projectCards.forEach((card) => {
      observer.observe(card);
    });

    // Reveal cards already visible on load
    window.addEventListener('load', () => {
      projectCards.forEach((card) => {
        if (card.getBoundingClientRect().top < window.innerHeight - 80) {
          card.classList.add('visible');
        }
      });
    });
  }

  // ========== SCROLL REVEAL — EXISTING ELEMENTS ==========
  function initExistingReveal() {
    const revealElements = document.querySelectorAll(
      '.service-card, .testimonial, .step'
    );

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

  // ========== INITIALIZE ==========
  function init() {
    initSmoothScroll();
    initPortfolioReveal();
    initExistingReveal();
    handleScroll();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();