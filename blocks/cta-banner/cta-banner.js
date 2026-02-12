/*
 * CTA BANNER BLOCK
 * Processes rows: heading, description, CTAs
 */
export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'cta-banner-inner';

  // Process each row
  [...block.children].forEach((row) => {
    const cell = row.children[0];
    if (!cell) return;

    const text = cell.textContent.trim();
    if (!text) return;

    // Check for links (CTAs)
    const links = cell.querySelectorAll('a');
    if (links.length > 0) {
      const ctaDiv = document.createElement('div');
      ctaDiv.className = 'cta-banner-actions';
      links.forEach((link, i) => {
        const btn = document.createElement('a');
        btn.href = link.href;
        btn.className = i === 0 ? 'button primary' : 'button secondary';
        btn.textContent = link.textContent;
        ctaDiv.appendChild(btn);
      });
      wrapper.appendChild(ctaDiv);
      return;
    }

    // Bold/strong = heading
    if (cell.querySelector('strong') || cell.querySelector('h1, h2, h3')) {
      const h2 = document.createElement('h2');
      h2.textContent = text;
      wrapper.appendChild(h2);
      return;
    }

    // Regular text = description
    const p = document.createElement('p');
    p.textContent = text;
    wrapper.appendChild(p);
  });

  block.textContent = '';
  block.appendChild(wrapper);
}
