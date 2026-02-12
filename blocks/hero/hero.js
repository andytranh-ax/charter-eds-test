/**
 * Hero Block
 * Transforms table content into a styled hero section
 */
export default function decorate(block) {
  // Find the image
  const picture = block.querySelector('picture');

  // Create hero structure
  const bg = document.createElement('div');
  bg.className = 'hero-bg';

  const content = document.createElement('div');
  content.className = 'hero-content';

  const inner = document.createElement('div');
  inner.className = 'hero-inner';

  // Process each row
  [...block.children].forEach((row) => {
    const cell = row.children[0];
    if (!cell) return;

    // Check for image
    const img = cell.querySelector('picture');
    if (img) {
      bg.appendChild(img.cloneNode(true));
      return;
    }

    const text = cell.textContent.trim();
    if (!text) return;

    // Check for links (CTAs)
    const links = cell.querySelectorAll('a');
    if (links.length > 0) {
      const ctas = document.createElement('div');
      ctas.className = 'hero-ctas';
      links.forEach((link, i) => {
        const btn = document.createElement('a');
        btn.href = link.href;
        btn.className = i === 0 ? 'button primary' : 'button secondary';
        btn.textContent = link.textContent;
        ctas.appendChild(btn);
      });
      inner.appendChild(ctas);
      return;
    }

    // ALL CAPS = eyebrow
    if (text === text.toUpperCase() && text.length > 3 && !text.startsWith('•')) {
      const eyebrow = document.createElement('p');
      eyebrow.className = 'hero-eyebrow';
      eyebrow.textContent = text;
      inner.appendChild(eyebrow);
      return;
    }

    // Bold/strong = headline
    if (cell.querySelector('strong')) {
      const h1 = document.createElement('h1');
      h1.className = 'hero-heading';
      h1.textContent = text;
      inner.appendChild(h1);
      return;
    }

    // Bullet point
    if (text.startsWith('•')) {
      let ul = inner.querySelector('.hero-features');
      if (!ul) {
        ul = document.createElement('ul');
        ul.className = 'hero-features';
        inner.appendChild(ul);
      }
      const li = document.createElement('li');
      li.textContent = text.replace(/^•\s*/, '');
      ul.appendChild(li);
      return;
    }

    // Regular text = disclaimer
    const p = document.createElement('p');
    p.className = 'hero-text';
    p.textContent = text;
    inner.appendChild(p);
  });

  // Clear and rebuild
  block.textContent = '';
  if (bg.children.length > 0) block.appendChild(bg);
  content.appendChild(inner);
  block.appendChild(content);
}
