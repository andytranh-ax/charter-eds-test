/*
 * FEATURE CARDS BLOCK
 * ===================
 * FILE: blocks/feature-cards/feature-cards.js
 *
 * HOW TO ADD: Create blocks/feature-cards/feature-cards.js in your repo
 *
 * WHAT THIS BLOCK EXPECTS IN GOOGLE DOCS:
 * Create a table with 2 columns. First row says "feature-cards".
 * Each column is one card with:
 *   - An image at the top
 *   - Eyebrow text in ALL CAPS
 *   - A bold heading
 *   - Description paragraph
 *   - A link (becomes a button)
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.className = 'feature-cards';

  rows.forEach((row) => {
    const cells = [...row.children];

    cells.forEach((cell) => {
      const card = document.createElement('div');
      card.className = 'feature-card';

      // Find image
      const picture = cell.querySelector('picture');
      if (picture) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'feature-card-image';
        imageDiv.appendChild(picture.cloneNode(true));
        card.appendChild(imageDiv);
      }

      // Content container
      const contentDiv = document.createElement('div');
      contentDiv.className = 'feature-card-content';

      const elements = [...cell.children];
      elements.forEach((el) => {
        // Skip picture elements (already handled)
        if (el.tagName === 'PICTURE' || (el.querySelector && el.querySelector('picture'))) return;

        const text = el.textContent.trim();
        if (!text && !el.querySelector('a')) return;

        // ALL CAPS = eyebrow
        if (el.tagName === 'P' && text === text.toUpperCase() && text.length > 3 && !el.querySelector('a')) {
          const eyebrow = document.createElement('div');
          eyebrow.className = 'feature-card-eyebrow';
          eyebrow.textContent = text;
          contentDiv.appendChild(eyebrow);
          return;
        }

        // Headings
        if (el.tagName.match(/^H[1-6]$/) || (el.querySelector('strong') && !el.querySelector('a'))) {
          const h3 = document.createElement('h3');
          h3.textContent = text;
          contentDiv.appendChild(h3);
          return;
        }

        // Links = button
        if (el.querySelector('a')) {
          const link = el.querySelector('a');
          const btn = document.createElement('a');
          btn.href = link.href;
          btn.className = 'button primary';
          btn.textContent = link.textContent;
          contentDiv.appendChild(btn);
          return;
        }

        // Everything else = paragraph
        if (text) {
          const p = document.createElement('p');
          p.textContent = text;
          contentDiv.appendChild(p);
        }
      });

      card.appendChild(contentDiv);
      block.appendChild(card);
    });
  });
}
