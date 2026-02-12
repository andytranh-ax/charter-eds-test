/*
 * ANIMATIONS & SCROLL EFFECTS
 * ===========================
 * Modern scroll-triggered animations using Intersection Observer
 */

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll(`
    .pricing-card,
    .feature-card,
    .contact-card,
    .columns > div > div,
    .faq-item,
    .default-content-wrapper h2,
    .default-content-wrapper p,
    .cta-banner .cta-banner-inner
  `);

  // Add animation class to elements
  animatedElements.forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    // Add stagger delay based on siblings
    const siblings = el.parentElement?.children;
    if (siblings) {
      const siblingIndex = Array.from(siblings).indexOf(el);
      el.style.transitionDelay = `${siblingIndex * 0.1}s`;
    }
  });

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -80px 0px', // Trigger slightly before element is fully visible
      threshold: 0.1,
    }
  );

  // Observe all animated elements
  animatedElements.forEach((el) => observer.observe(el));
}

/**
 * Initialize parallax effects on images
 */
function initParallax() {
  const parallaxImages = document.querySelectorAll('.hero .hero-bg img, .feature-card-image img');

  if (parallaxImages.length === 0) return;

  let ticking = false;

  function updateParallax() {
    parallaxImages.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const scrollPercent = (rect.top + rect.height / 2) / window.innerHeight;
      const translateY = (scrollPercent - 0.5) * 30; // Subtle parallax
      img.style.transform = `translateY(${translateY}px) scale(1.05)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Initialize header scroll effects
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class for glass effect
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Optional: Hide/show header on scroll direction
    // if (currentScroll > lastScroll && currentScroll > 200) {
    //   header.style.transform = 'translateY(-100%)';
    // } else {
    //   header.style.transform = 'translateY(0)';
    // }

    lastScroll = currentScroll;
  }, { passive: true });
}

/**
 * Initialize counter animations for numbers
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.pricing-card-price .amount');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element) {
  const text = element.textContent;
  const number = parseInt(text.replace(/\D/g, ''), 10);

  if (isNaN(number)) return;

  const duration = 1000;
  const start = performance.now();
  const startValue = 0;

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(startValue + (number - startValue) * easeOut);

    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = text; // Restore original text with any formatting
    }
  }

  requestAnimationFrame(update);
}

/**
 * Initialize magnetic button effect
 */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('a.button.primary, .serviceability-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

/**
 * Initialize text reveal animation for hero
 */
function initTextReveal() {
  const heroHeading = document.querySelector('.hero h1, .hero .hero-heading');
  if (!heroHeading) return;

  const text = heroHeading.textContent;
  const words = text.split(' ');

  heroHeading.innerHTML = words
    .map((word, i) => `<span class="word" style="animation-delay: ${0.2 + i * 0.08}s">${word}</span>`)
    .join(' ');

  // Add styles for word animation
  const style = document.createElement('style');
  style.textContent = `
    .hero h1 .word,
    .hero .hero-heading .word {
      display: inline-block;
      opacity: 0;
      animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Initialize smooth anchor scroll
 */
function initSmoothAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
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

/**
 * Main initialization
 */
function initAnimations() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

function init() {
  // Small delay to ensure all blocks are decorated
  setTimeout(() => {
    initScrollAnimations();
    initParallax();
    initHeaderScroll();
    initCounterAnimations();
    initMagneticButtons();
    // initTextReveal(); // Uncomment for word-by-word reveal
    initSmoothAnchorScroll();

    console.log('✨ Animations initialized');
  }, 100);
}

// Auto-initialize
initAnimations();

// Export for use in other modules
export {
  initScrollAnimations,
  initParallax,
  initHeaderScroll,
  initCounterAnimations,
  initMagneticButtons,
  initTextReveal,
  initSmoothAnchorScroll,
};
