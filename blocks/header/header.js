/**
 * Header Block
 * Builds header with logo, segments, nav, and serviceability bar
 */

export default async function decorate(block) {
  block.textContent = '';

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
      <div class="serviceability-form">
        <input type="text" placeholder="Street Address" aria-label="Street Address" />
        <div class="divider"></div>
        <input type="text" placeholder="Suite/Unit" aria-label="Suite or Unit" />
        <div class="divider"></div>
        <input type="text" placeholder="Zip Code" aria-label="Zip Code" />
        <button class="serviceability-btn">Check availability</button>
      </div>
    </div>
  `;
  block.appendChild(serviceability);
}
