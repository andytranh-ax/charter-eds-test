/*
 * HERO BLOCK
 * ==========
 * Expects a 1-column table where each row is separate content.
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Find image first
  let image = null;
  rows.forEach((row) => {
    const img = row.querySelector('img');
    if (img) image = img;
  });

  // Build structure
  block.innerHTML = '';

  // Background image container
  if (image) {
    const bgDiv = document.createElement('div');
    bgDiv.className = 'hero-bg';
    image.loading = 'eager';
    bgDiv.appendChild(image.cloneNode(true));
    block.appendChild(bgDiv);
  }

  // Content container
  const content = document.createElement('div');
  content.className = 'hero-content';

  const inner = document.createElement('div');
  inner.className = 'hero-inner';

  // Collect bullet items
  const bulletItems = [];

  rows.forEach((row) => {
    const cell = row.querySelector('div');
    if (!cell) return;

    // Skip cells that only contain image
    if (cell.querySelector('img') && cell.textContent.trim() === '') return;

    const elements = [...cell.children];
    elements.forEach((el) => {
      // Skip images
      if (el.tagName === 'PICTURE' || el.querySelector('picture') || el.querySelector('img')) return;

      const text = el.textContent.trim();
      if (!text && !el.querySelector('a')) return;

      // ALL CAPS = eyebrow
      if (text === text.toUpperCase() && text.length > 3 && !el.querySelector('a') && !text.startsWith('•')) {
        const eyebrow = document.createElement('p');
        eyebrow.className = 'hero-eyebrow';
        eyebrow.textContent = text;
        inner.appendChild(eyebrow);
        return;
      }

      // Headings or bold text = main headline
      if (el.tagName.match(/^H[1-6]$/) || el.querySelector('strong')) {
        const h1 = document.createElement('h1');
        h1.className = 'hero-heading';
        h1.textContent = text;
        inner.appendChild(h1);
        return;
      }

      // Bullet points (collect them)
      if (text.startsWith('•') || text.startsWith('●') || text.startsWith('*')) {
        bulletItems.push(text.replace(/^[•●*]\s*/, ''));
        return;
      }

      // Links = buttons
      if (el.querySelector('a')) {
        // First flush any collected bullets
        if (bulletItems.length > 0) {
          const ul = document.createElement('ul');
          ul.className = 'hero-features';
          bulletItems.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
          });
          inner.appendChild(ul);
          bulletItems.length = 0;
        }

        const ctaDiv = inner.querySelector('.hero-ctas') || document.createElement('div');
        if (!ctaDiv.className) ctaDiv.className = 'hero-ctas';

        const links = el.querySelectorAll('a');
        links.forEach((link, idx) => {
          const btn = document.createElement('a');
          btn.href = link.href;
          btn.className = ctaDiv.children.length === 0 ? 'button primary' : 'button secondary';
          btn.textContent = link.textContent;
          ctaDiv.appendChild(btn);
        });

        if (!inner.querySelector('.hero-ctas')) {
          inner.appendChild(ctaDiv);
        }
        return;
      }

      // Regular paragraph (disclaimer text etc)
      if (text) {
        // First flush any collected bullets
        if (bulletItems.length > 0) {
          const ul = document.createElement('ul');
          ul.className = 'hero-features';
          bulletItems.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
          });
          inner.appendChild(ul);
          bulletItems.length = 0;
        }

        const p = document.createElement('p');
        p.className = 'hero-text';
        p.textContent = text;
        inner.appendChild(p);
      }
    });
  });

  // Flush remaining bullets
  if (bulletItems.length > 0) {
    const ul = document.createElement('ul');
    ul.className = 'hero-features';
    bulletItems.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    inner.appendChild(ul);
  }

  content.appendChild(inner);
  block.appendChild(content);
}
