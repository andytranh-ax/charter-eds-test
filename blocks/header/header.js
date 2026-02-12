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

      // Process nav content - first ul becomes main nav
      const navList = temp.querySelector('ul');
      if (navList) {
        navList.className = 'header-nav-list';
        navList.querySelectorAll('li').forEach((li) => {
          li.className = 'header-nav-item';
          const link = li.querySelector('a');
          if (link) link.className = 'header-nav-link';
        });
        nav.appendChild(navList);
      }
    }
  } catch (e) {
    // Nav failed to load, use fallback
    nav.innerHTML = `
      <ul class="header-nav-list">
        <li class="header-nav-item"><a href="/offers" class="header-nav-link">Offers</a></li>
        <li class="header-nav-item"><a href="/internet" class="header-nav-link active">Internet</a></li>
        <li class="header-nav-item"><a href="/phone" class="header-nav-link">Phone</a></li>
        <li class="header-nav-item"><a href="/mobile" class="header-nav-link">Mobile</a></li>
        <li class="header-nav-item"><a href="/tv" class="header-nav-link">TV</a></li>
        <li class="header-nav-item"><a href="/contact" class="header-nav-link">Contact Us</a></li>
      </ul>
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
