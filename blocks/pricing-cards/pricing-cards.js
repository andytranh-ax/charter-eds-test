/*
 * PRICING CARDS BLOCK
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
  block.className = 'pricing-cards';

  // Create a card for each column
  columns.forEach((columnCells) => {
    const card = document.createElement('div');
    card.className = 'pricing-card';

    columnCells.forEach((cell) => {
      const text = cell.textContent.trim();
      if (!text && !cell.querySelector('a')) return;

      // Check for links first (CTA buttons)
      const link = cell.querySelector('a');
      if (link) {
        const btn = document.createElement('a');
        btn.href = link.href;
        btn.className = 'button primary';
        btn.textContent = link.textContent;
        card.appendChild(btn);
        return;
      }

      // Bullet characters in text (feature list)
      if (text.includes('•') || text.includes('●')) {
        let features = card.querySelector('.pricing-card-features');
        if (!features) {
          features = document.createElement('ul');
          features.className = 'pricing-card-features';
          card.appendChild(features);
        }
        const bulletLines = text.split(/[•●]/).filter((line) => line.trim());
        bulletLines.forEach((bulletText) => {
          const li = document.createElement('li');
          li.textContent = bulletText.trim();
          features.appendChild(li);
        });
        return;
      }

      // Bundle info (check BEFORE price)
      if ((text.toLowerCase().includes('bundle') || text.toLowerCase().includes('save') || text.toLowerCase().includes('guarantee'))) {
        const bundle = document.createElement('div');
        bundle.className = 'pricing-card-bundle';
        bundle.textContent = text;
        card.appendChild(bundle);
        return;
      }

      // Price detection
      if (text.includes('$')) {
        const priceMatch = text.match(/\$(\d+)/);
        if (priceMatch) {
          const parts = text.split('$');
          if (parts[0].trim()) {
            const label = document.createElement('div');
            label.className = 'pricing-card-label';
            label.textContent = parts[0].trim();
            card.appendChild(label);
          }

          const priceDiv = document.createElement('div');
          priceDiv.className = 'pricing-card-price';
          priceDiv.innerHTML = `
            <span class="dollar">$</span>
            <span class="amount">${priceMatch[1]}</span>
            <span class="period">/mo</span>
          `;
          card.appendChild(priceDiv);
          return;
        }
      }

      // ALL CAPS text = eyebrow
      if (text === text.toUpperCase() && text.length > 5 && !text.includes('$')) {
        const eyebrow = document.createElement('div');
        eyebrow.className = 'pricing-card-eyebrow';
        eyebrow.textContent = text;
        card.appendChild(eyebrow);
        return;
      }

      // Speed tier detection
      if (text.match(/^up to \d+/i) || text.match(/\d+\s*(mbps|gig)/i)) {
        const speed = document.createElement('div');
        speed.className = 'pricing-card-speed';
        speed.textContent = text;
        card.appendChild(speed);

        const divider = document.createElement('div');
        divider.className = 'pricing-card-divider';
        card.appendChild(divider);
        return;
      }
    });

    if (card.children.length > 0) {
      block.appendChild(card);
    }
  });
}
