/**
 * Header Block
 * Builds header with logo, segments, nav, and serviceability bar
 */

export default async function decorate(block) {
  block.textContent = '';

  // Utility bar (dark blue bar at very top)
  const utilityBar = document.createElement('div');
  utilityBar.className = 'header-utility';
  utilityBar.innerHTML = `
    <div class="header-utility-inner">
      <a href="https://www.spectrum.net/account" class="header-utility-link">My Account</a>
    </div>
  `;
  block.appendChild(utilityBar);

  // Main header wrapper
  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header-wrapper';

  // Top bar: Logo, Segments, Phone
  const headerTop = document.createElement('div');
  headerTop.className = 'header-top';
  headerTop.innerHTML = `
    <a href="/" class="header-logo">
      <span class="header-logo-text">Spectrum</span>
      <span class="header-logo-sub">BUSINESS</span>
    </a>
    <div class="header-segments">
      <a href="https://www.spectrum.com" class="header-segment">Residential</a>
      <a href="https://www.spectrum.com/business" class="header-segment active">Business</a>
      <a href="https://enterprise.spectrum.com" class="header-segment">Enterprise</a>
    </div>
    <a href="tel:8664414044" class="header-phone">866-441-4044</a>
  `;
  headerWrapper.appendChild(headerTop);

  // Navigation bar
  const nav = document.createElement('nav');
  nav.className = 'header-nav';

  try {
    const resp = await fetch('/nav.plain.html');
    if (resp.ok) {
      const html = await resp.text();
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const links = temp.querySelectorAll('a');
      if (links.length > 0) {
        links.forEach((link) => {
          const a = document.createElement('a');
          a.href = link.href;
          a.className = 'header-nav-link';
          a.textContent = link.textContent;
          if (link.textContent.toLowerCase() === 'internet') {
            a.classList.add('active');
          }
          nav.appendChild(a);
        });
      }
    }
  } catch (e) {
    // Use fallback
  }

  if (nav.children.length === 0) {
    nav.innerHTML = `
      <a href="https://www.spectrum.com/business/offers" class="header-nav-link">Offers</a>
      <a href="https://www.spectrum.com/business/internet" class="header-nav-link active">Internet</a>
      <a href="https://www.spectrum.com/business/phone" class="header-nav-link">Phone</a>
      <a href="https://www.spectrum.com/business/mobile" class="header-nav-link">Mobile</a>
      <a href="https://www.spectrum.com/business/tv" class="header-nav-link">TV</a>
      <a href="/compare" class="header-nav-link">Compare</a>
      <a href="https://www.spectrum.com/business/contact" class="header-nav-link">Contact Us</a>
    `;
  }
  headerWrapper.appendChild(nav);

  block.appendChild(headerWrapper);

  // Serviceability bar (outside header-wrapper for full-width dark bg)
  const serviceability = document.createElement('div');
  serviceability.className = 'serviceability';
  serviceability.innerHTML = `
    <div class="serviceability-inner">
      <button class="serviceability-toggle">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Check service availability
      </button>
      <div class="serviceability-form">
        <input type="text" placeholder="Street Address" aria-label="Street Address" />
        <div class="divider"></div>
        <input type="text" placeholder="Suite/Unit" aria-label="Suite or Unit" />
        <div class="divider"></div>
        <input type="text" placeholder="Zip Code" aria-label="Zip Code" />
        <button class="serviceability-btn">Check availability</button>
      </div>
      <div class="serviceability-close">Cancel</div>
    </div>
  `;
  block.appendChild(serviceability);

  // Mobile toggle functionality
  const toggle = serviceability.querySelector('.serviceability-toggle');
  const closeBtn = serviceability.querySelector('.serviceability-close');

  toggle.addEventListener('click', () => {
    serviceability.classList.add('is-expanded');
  });

  closeBtn.addEventListener('click', () => {
    serviceability.classList.remove('is-expanded');
  });
}
