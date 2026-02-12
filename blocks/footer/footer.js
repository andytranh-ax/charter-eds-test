/**
 * Footer Block
 * Loads footer content from /footer document and builds footer structure
 */

export default async function decorate(block) {
  block.textContent = '';

  const footerInner = document.createElement('div');
  footerInner.className = 'footer-inner';

  // Top section - logo and social
  const footerTop = document.createElement('div');
  footerTop.className = 'footer-top';

  const footerLogo = document.createElement('div');
  footerLogo.className = 'footer-logo';
  footerLogo.innerHTML = `
    <span class="footer-logo-text">Spectrum</span>
    <span class="footer-logo-sub">BUSINESS</span>
  `;
  footerTop.appendChild(footerLogo);

  const socialLinks = document.createElement('div');
  socialLinks.className = 'footer-social';
  socialLinks.innerHTML = `
    <a href="https://facebook.com/spectrum" aria-label="Facebook">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    </a>
    <a href="https://twitter.com/getspectrum" aria-label="Twitter">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
    </a>
    <a href="https://linkedin.com/company/charter-communications" aria-label="LinkedIn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
    </a>
  `;
  footerTop.appendChild(socialLinks);
  footerInner.appendChild(footerTop);

  // Footer columns - try to load from /footer document
  const footerColumns = document.createElement('div');
  footerColumns.className = 'footer-columns';

  try {
    const resp = await fetch('/footer.plain.html');
    if (resp.ok) {
      const html = await resp.text();
      const temp = document.createElement('div');
      temp.innerHTML = html;

      // Process footer content - look for headings and lists
      const sections = temp.querySelectorAll('div > div');
      sections.forEach((section) => {
        const col = document.createElement('div');
        col.className = 'footer-col';

        const heading = section.querySelector('h2, h3, h4, strong');
        if (heading) {
          const h4 = document.createElement('h4');
          h4.textContent = heading.textContent;
          col.appendChild(h4);
        }

        const links = section.querySelectorAll('a');
        links.forEach((link) => {
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = link.textContent;
          col.appendChild(a);
        });

        if (col.children.length > 0) {
          footerColumns.appendChild(col);
        }
      });
    }
  } catch (e) {
    // Footer failed to load, use fallback
  }

  // Fallback if no content loaded
  if (footerColumns.children.length === 0) {
    footerColumns.innerHTML = `
      <div class="footer-col">
        <h4>Company</h4>
        <a href="/about">About Charter</a>
        <a href="/careers">Careers</a>
        <a href="/newsroom">Newsroom</a>
        <a href="/investors">Investors</a>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <a href="/bundles">Bundles & Promotions</a>
        <a href="/internet">Spectrum Business Internet</a>
        <a href="/phone">Spectrum Business Phone</a>
        <a href="/mobile">Spectrum Mobile</a>
        <a href="/tv">Spectrum Business TV</a>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <a href="/my-account">Services in My Area</a>
        <a href="/new-business">New Business Toolkit</a>
        <a href="/partners">Partner Program</a>
        <a href="/wifi-policy">Spectrum WiFi Business Policy</a>
      </div>
      <div class="footer-col">
        <h4>Help & Support</h4>
        <a href="/contact">Contact Spectrum Business</a>
        <a href="/support">Support</a>
        <a href="/stores">Store Locator</a>
        <a href="/sitemap">Sitemap</a>
      </div>
    `;
  }
  footerInner.appendChild(footerColumns);

  // Legal section
  const footerLegal = document.createElement('div');
  footerLegal.className = 'footer-legal';

  const legalLinks = document.createElement('div');
  legalLinks.className = 'footer-legal-links';
  legalLinks.innerHTML = `
    <a href="/privacy">Your Privacy Rights</a>
    <a href="/accessibility">Accessibility</a>
    <a href="/california-privacy">California Consumer Privacy Rights</a>
    <a href="/privacy-policy">Privacy Policy</a>
    <a href="/terms">Terms of Service</a>
  `;
  footerLegal.appendChild(legalLinks);

  const disclaimer = document.createElement('p');
  disclaimer.className = 'footer-disclaimer';
  disclaimer.textContent = 'We use cookies and similar technologies to personalize and improve your experience, and for analytics and advertising purposes. By using our website, you agree to our Privacy Policy and Terms of Service.';
  footerLegal.appendChild(disclaimer);

  footerInner.appendChild(footerLegal);
  block.appendChild(footerInner);
}
