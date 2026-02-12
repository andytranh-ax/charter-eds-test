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
        <a href="https://www.spectrum.com/about">About Charter</a>
        <a href="https://www.spectrum.com/business/about">About Spectrum Business</a>
        <a href="https://www.spectrum.com/business/commitment">Customer Commitment</a>
        <a href="https://enterprise.spectrum.com">Spectrum Enterprise</a>
        <a href="https://www.spectrumreach.com">Spectrum Reach</a>
        <a href="https://www.spectrum.com">Residential Services</a>
        <a href="https://jobs.spectrum.com">Careers</a>
        <a href="https://corporate.spectrum.com/newsroom">Newsroom</a>
        <a href="https://ir.charter.com">Investors</a>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <a href="https://www.spectrum.com/business/bundles">Bundles & Promotions</a>
        <a href="https://www.spectrum.com/business/internet">Spectrum Business Internet</a>
        <a href="https://www.spectrum.com/business/phone">Spectrum Business Voice</a>
        <a href="https://www.spectrum.com/business/phone/business-connect">Spectrum Business Connect</a>
        <a href="https://www.spectrum.com/business/mobile">Spectrum Mobile</a>
        <a href="https://www.spectrum.com/business/tv">Spectrum Business TV</a>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <a href="https://www.spectrum.com/business/services">Services In My Area</a>
        <a href="https://www.spectrum.com/business/insights">Spectrum Business Insights</a>
        <a href="https://www.spectrum.com/business/toolkit">New Business Toolkit</a>
        <a href="https://www.spectrum.com/business/speed-test">Test Your Internet Speed</a>
        <a href="https://www.spectrum.com/business/tv/channel-lineup">Channel Lineup</a>
        <a href="https://www.spectrum.com/business/wifi">Spectrum WiFi Access Points</a>
        <a href="https://www.spectrum.com/business/contract-buyout">Contract Buyout</a>
        <a href="https://www.spectrum.com/business/guarantee">30 Day Guarantee</a>
        <a href="https://www.spectrum.com/business/partners">Partner Program</a>
        <a href="https://www.spectrum.com/business/wholesale">Wholesale</a>
        <a href="https://www.spectrum.com/business/referral">Referral Program</a>
      </div>
      <div class="footer-col">
        <h4>Help & Support</h4>
        <a href="https://www.spectrum.com/business/contact">Contact Spectrum Business</a>
        <a href="https://www.spectrum.com/business/account">Manage Account</a>
        <a href="https://www.spectrum.com/business/support">Support</a>
        <a href="https://www.spectrum.com/business/upgrade">Upgrade</a>
        <a href="https://www.spectrum.com/stores">Store Locator</a>
        <a href="https://www.spectrum.com/business/sitemap">Sitemap</a>
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
    <a href="https://www.spectrum.com/privacy">Your Privacy Rights</a>
    <a href="https://www.spectrum.com/accessibility">Accessibility</a>
    <a href="https://www.spectrum.com/california-privacy">California Consumer Privacy Policy</a>
    <a href="https://www.spectrum.com/do-not-sell">Do Not Sell or Share My Personal Information</a>
    <a href="https://www.spectrum.com/privacy-policy">Privacy Policy</a>
    <a href="https://www.spectrum.com/terms">AUP & Terms of Service</a>
  `;
  footerLegal.appendChild(legalLinks);

  const disclaimer = document.createElement('p');
  disclaimer.className = 'footer-disclaimer';
  disclaimer.textContent = 'Not all products, pricing and services are available in all areas. Pricing and actual speeds may vary. Internet speeds based on wired connection. Restrictions apply. ©2026 Charter Communications. All rights reserved.';
  footerLegal.appendChild(disclaimer);

  footerInner.appendChild(footerLegal);
  block.appendChild(footerInner);
}
