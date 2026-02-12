/*
 * COLUMNS BLOCK
 * Collects content into 2 columns: images on left, text on right
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Collect all content into two columns
  const leftCol = document.createElement('div');
  leftCol.className = 'columns-image';

  const rightCol = document.createElement('div');
  rightCol.className = 'columns-text';

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell, index) => {
      const picture = cell.querySelector('picture');
      const text = cell.textContent.trim();

      if (picture) {
        // Image goes to left column
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'columns-image-wrapper';
        imgWrapper.appendChild(picture.cloneNode(true));
        leftCol.appendChild(imgWrapper);
      } else if (text) {
        // Check for links (CTA)
        const link = cell.querySelector('a');
        if (link) {
          const btn = document.createElement('a');
          btn.href = link.href;
          btn.className = 'button primary';
          btn.textContent = link.textContent;
          rightCol.appendChild(btn);
          return;
        }

        // ALL CAPS = eyebrow
        if (text === text.toUpperCase() && text.length > 3) {
          const eyebrow = document.createElement('div');
          eyebrow.className = 'columns-eyebrow';
          eyebrow.textContent = text;
          rightCol.appendChild(eyebrow);
          return;
        }

        // Bold/strong = heading
        if (cell.querySelector('strong') || cell.querySelector('h1, h2, h3')) {
          const h2 = document.createElement('h2');
          h2.textContent = text;
          rightCol.appendChild(h2);
          return;
        }

        // Regular text = paragraph
        const p = document.createElement('p');
        p.textContent = text;
        rightCol.appendChild(p);
      }
    });
  });

  // Rebuild block with 2-column layout
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'columns-inner';
  wrapper.appendChild(leftCol);
  wrapper.appendChild(rightCol);

  block.appendChild(wrapper);
}
