/**
 * main.js — Flowly landing page interactions
 *
 * Responsibilities:
 *  - Mobile nav toggle (hamburger menu)
 *  - Smooth anchor scroll with header offset
 *  - Navbar active-link highlight on scroll
 */

(function () {
  'use strict';

  // ── Mobile nav toggle ────────────────────────────────────────
  const toggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      const isOpen = !mobileMenu.hidden;
      mobileMenu.hidden = isOpen;
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close mobile menu when a link inside it is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
      if (!mobileMenu.hidden && !toggle.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Smooth scroll with navbar offset ─────────────────────────
  const navbar = document.querySelector('.navbar');

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  // ── Navbar active link on scroll ─────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              const href = link.getAttribute('href');
              if (href === '#' + entry.target.id) {
                link.style.color = 'var(--color-brand)';
                link.style.fontWeight = '600';
              } else {
                link.style.color = '';
                link.style.fontWeight = '';
              }
            });
          }
        });
      },
      { rootMargin: '-64px 0px -60% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

})();
