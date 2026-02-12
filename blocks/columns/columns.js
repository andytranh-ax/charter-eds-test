/*
 * COLUMNS BLOCK
 * =============
 * FILE: blocks/columns/columns.js
 *
 * HOW TO ADD: Create blocks/columns/columns.js in your repo
 *
 * WHAT THIS BLOCK EXPECTS IN GOOGLE DOCS:
 * Create a table with 2 columns. First row says "columns".
 * - Left column: An image
 * - Right column: Eyebrow (ALL CAPS), heading (bold), paragraph, link (button)
 *
 * NOTE: The default EDS boilerplate already has a "columns" block.
 * You can either replace it or rename this to "columns-feature".
 */
export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];

    cells.forEach((cell, index) => {
      // Image cell
      if (cell.querySelector('picture') || cell.querySelector('img')) {
        cell.className = 'columns-image';
      } else {
        // Text cell
        cell.className = 'columns-text';

        // Style ALL CAPS as eyebrow
        cell.querySelectorAll('p').forEach((p) => {
          const text = p.textContent.trim();
          if (text === text.toUpperCase() && text.length > 3 && !p.querySelector('a')) {
            p.className = 'columns-eyebrow';
          }
        });

        // Style links as buttons
        cell.querySelectorAll('a').forEach((a) => {
          a.className = 'button primary';
        });
      }
    });
  });
}
