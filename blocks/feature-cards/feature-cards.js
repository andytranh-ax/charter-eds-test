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
        return; // Skip rest of processing for image cells
      }

      // Get text content directly from cell
      const text = cell.textContent.trim();
      if (!text && !cell.querySelector('a')) return;

      // Check for links (CTA)
      const link = cell.querySelector('a');
      if (link) {
        const btn = document.createElement('a');
        btn.href = link.href;
        btn.className = 'button primary';
        btn.textContent = link.textContent;
        contentDiv.appendChild(btn);
        return;
      }

      // ALL CAPS = eyebrow
      if (text === text.toUpperCase() && text.length > 3) {
        const eyebrow = document.createElement('div');
        eyebrow.className = 'feature-card-eyebrow';
        eyebrow.textContent = text;
        contentDiv.appendChild(eyebrow);
        return;
      }

      // Bold text or headings = title
      if (cell.querySelector('strong') || cell.querySelector('h1, h2, h3, h4, h5, h6')) {
        const h3 = document.createElement('h3');
        h3.textContent = text;
        contentDiv.appendChild(h3);
        return;
      }

      // Everything else = paragraph (description)
      if (text) {
        const p = document.createElement('p');
        p.textContent = text;
        contentDiv.appendChild(p);
      }
    });

    if (contentDiv.children.length > 0) {
      card.appendChild(contentDiv);
    }

    if (card.children.length > 0) {
      block.appendChild(card);
    }
  });
}
