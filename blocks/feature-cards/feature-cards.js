/*
 * FEATURE CARDS BLOCK
 * ===================
 * Expects a table where each COLUMN is a card.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const numCols = rows[0] ? rows[0].children.length : 0;
  if (numCols === 0) return;

  // Collect content by column
  const columns = [];
  for (let i = 0; i < numCols; i++) {
    columns[i] = [];
  }

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell, colIndex) => {
      if (colIndex < numCols) {
        columns[colIndex].push(cell);
      }
    });
  });

  // Clear and rebuild
  block.innerHTML = '';
  block.className = 'feature-cards';

  columns.forEach((columnCells) => {
    const card = document.createElement('div');
    card.className = 'feature-card';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'feature-card-content';

    columnCells.forEach((cell) => {
      // Check for image
      const picture = cell.querySelector('picture');
      if (picture) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'feature-card-image';
        imageDiv.appendChild(picture.cloneNode(true));
        card.insertBefore(imageDiv, card.firstChild);
      }

      const elements = [...cell.children];
      elements.forEach((el) => {
        if (el.tagName === 'PICTURE' || el.querySelector('picture')) return;

        const text = el.textContent.trim();
        if (!text && !el.querySelector('a')) return;

        // ALL CAPS = eyebrow
        if (text === text.toUpperCase() && text.length > 3 && !el.querySelector('a')) {
          const eyebrow = document.createElement('div');
          eyebrow.className = 'feature-card-eyebrow';
          eyebrow.textContent = text;
          contentDiv.appendChild(eyebrow);
          return;
        }

        // Bold text or headings = title
        if (el.tagName.match(/^H[1-6]$/) || el.querySelector('strong')) {
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
    });

    if (contentDiv.children.length > 0) {
      card.appendChild(contentDiv);
    }

    if (card.children.length > 0) {
      block.appendChild(card);
    }
  });
}
