
/**
 * Fix My Tyre Ltd - Main Javascript
 * High-performance mobile interactions, FAQ accordions, and animations.
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // --- Mobile Navigation Drawer ---
  (function initMobileNav() {
    var burger = document.getElementById('burger');
    var nav = document.getElementById('mainNav');
    var backdrop = document.getElementById('navBackdrop');
    if (!burger || !nav) return;

    function closeNav() {
      nav.classList.remove('open');
      if (backdrop) backdrop.classList.remove('show');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
      burger.innerHTML = '<i class="bi bi-list"></i>';
    }

    function openNav() {
      nav.classList.add('open');
      if (backdrop) backdrop.classList.add('show');
      document.body.style.overflow = 'hidden';
      burger.setAttribute('aria-expanded', 'true');
      burger.innerHTML = '<i class="bi bi-x-lg"></i>';
    }

    burger.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = nav.classList.contains('open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    var navClose = document.getElementById('navClose');
    if (navClose) {
      navClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeNav();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeNav);
    }

    // Dropdown toggle on mobile
    var dropToggles = nav.querySelectorAll('.has-drop > .nav-link');
    dropToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          var parentLi = toggle.parentElement;
          var wasOpen = parentLi.classList.contains('open');
          
          // Optional: close other dropdowns in nav
          nav.querySelectorAll('.has-drop').forEach(function(item) {
            if (item !== parentLi) item.classList.remove('open');
          });
          
          parentLi.classList.toggle('open', !wasOpen);
        }
      });
    });

    // Close nav on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
      }
    });

    // Close nav if viewport is resized beyond tablet breakpoint
    window.addEventListener('resize', function() {
      if (window.innerWidth > 991 && nav.classList.contains('open')) {
        closeNav();
      }
    });
  })();

  // --- FAQ Accordion ---
  (function initFAQ() {
    var faqButtons = document.querySelectorAll('.faq-q');
    faqButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var item = btn.parentElement;
        var parentAccordion = item.parentElement;
        var isOpen = item.classList.contains('open');

        // Close siblings in the same accordion group
        if (parentAccordion) {
          parentAccordion.querySelectorAll('.faq-item').forEach(function(sibling) {
            sibling.classList.remove('open');
          });
        }

        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  })();

  // --- Scroll Reveal Animations ---
  (function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    
    var animatedElements = document.querySelectorAll('.svc-card, .step, .area-card, .gal-item, .split-media, .panel');
    animatedElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    });

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
          setTimeout(function() {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 60);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  })();
});
