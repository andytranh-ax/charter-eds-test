/**
 * Header Block
 * Loads navigation from /nav document and builds header structure
 */

function buildBrandLogo() {
  const logo = document.createElement('a');
  logo.href = '/';
  logo.className = 'header-logo';
  logo.innerHTML = `
    <span class="header-logo-text">Spectrum</span>
    <span class="header-logo-sub">BUSINESS</span>
  `;
  return logo;
}

function buildMobileMenuButton() {
  const button = document.createElement('button');
  button.className = 'header-menu-toggle';
  button.setAttribute('aria-label', 'Toggle menu');
  button.innerHTML = `
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  `;
  button.addEventListener('click', () => {
    const nav = document.querySelector('.header-nav');
    nav.classList.toggle('open');
    button.classList.toggle('open');
  });
  return button;
}

export default async function decorate(block) {
  // Clear existing content
  block.textContent = '';

  const headerInner = document.createElement('div');
  headerInner.className = 'header-inner';

  // Top section with logo, nav, and CTA
  const headerTop = document.createElement('div');
  headerTop.className = 'header-top';

  // Logo
  headerTop.appendChild(buildBrandLogo());

  // Navigation - load from /nav
  const nav = document.createElement('nav');
  nav.className = 'header-nav';

  try {
    const resp = await fetch('/nav.plain.html');
    if (resp.ok) {
      const html = await resp.text();
      const temp = document.createElement('div');
      temp.innerHTML = html;

      // Process nav content - look for links
      const links = temp.querySelectorAll('a');
      if (links.length > 0) {
        links.forEach((link) => {
          const a = document.createElement('a');
          a.href = link.href;
          a.className = 'header-nav-link';
          a.textContent = link.textContent;
          // Mark Internet as active for this page
          if (link.textContent.toLowerCase() === 'internet') {
            a.classList.add('active');
          }
          nav.appendChild(a);
        });
      }
    }
  } catch (e) {
    // Nav failed to load, use fallback
  }

  // Fallback if no links loaded
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

  headerTop.appendChild(nav);

  // Right side - phone and CTA
  const headerActions = document.createElement('div');
  headerActions.className = 'header-actions';
  headerActions.innerHTML = `
    <a href="tel:8664414044" class="header-phone">866-441-4044</a>
    <a href="/check-availability" class="button primary header-cta">Check availability</a>
  `;
  headerTop.appendChild(headerActions);

  // Mobile menu button
  headerTop.appendChild(buildMobileMenuButton());

  headerInner.appendChild(headerTop);

  // Segment tabs (Residential, Business, Enterprise)
  const segments = document.createElement('div');
  segments.className = 'header-segments';
  segments.innerHTML = `
    <a href="https://www.spectrum.com" class="header-segment">Residential</a>
    <a href="https://www.spectrum.com/business" class="header-segment active">Business</a>
    <a href="https://enterprise.spectrum.com" class="header-segment">Enterprise</a>
  `;
  headerInner.appendChild(segments);

  block.appendChild(headerInner);
}
