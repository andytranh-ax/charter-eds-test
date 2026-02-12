/*
 * HERO BLOCK
 * ==========
 * FILE: blocks/hero/hero.js
 *
 * HOW TO ADD THIS TO YOUR REPO:
 * 1. In your GitHub repo, go to the "blocks" folder
 * 2. Click "Add file" > "Create new file"
 * 3. Type "hero/hero.js" as the filename (this creates the folder AND file)
 * 4. Paste this entire file content
 * 5. Commit the change
 *
 * WHAT THIS BLOCK EXPECTS IN GOOGLE DOCS:
 * Create a table with 1 column. First row says "hero".
 * Remaining rows contain your content:
 *   Row 1: An image (paste or insert an image)
 *   Row 2: Eyebrow text in ALL CAPS (like "SPECTRUM BUSINESS INTERNET®")
 *   Row 3: Main headline (make it bold or Heading 1)
 *   Row 4: Bullet list of features
 *   Row 5: Small disclaimer text
 *   Row 6: Links that become buttons (use Google Docs link format)
 */
export default function decorate(block) {
  // Get all the rows (children) of the block
  const rows = [...block.children];

  // Find the image, headings, lists, paragraphs, and links
  const image = block.querySelector('img');
  const headings = block.querySelectorAll('h1, h2, h3');
  const lists = block.querySelectorAll('ul');
  const paragraphs = block.querySelectorAll('p');
  const links = block.querySelectorAll('a');

  // Build the hero structure
  block.innerHTML = '';

  // Background image container
  if (image) {
    const bgDiv = document.createElement('div');
    bgDiv.className = 'hero-bg';
    image.loading = 'eager';
    bgDiv.appendChild(image);
    block.appendChild(bgDiv);
  }

  // Content container
  const content = document.createElement('div');
  content.className = 'hero-content';

  const inner = document.createElement('div');
  inner.className = 'hero-inner';

  // Add all non-image content to the inner container
  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      // Skip cells that only contain the image
      if (cell.querySelector('img') && cell.children.length === 1) return;
      if (cell.querySelector('img') && cell.textContent.trim() === '') return;

      // Process the content
      const cloned = cell.cloneNode(true);

      // Remove any images from text cells
      cloned.querySelectorAll('picture').forEach((pic) => pic.remove());
      cloned.querySelectorAll('img').forEach((img) => img.remove());

      // If there's content left, add it
      if (cloned.textContent.trim() || cloned.querySelector('a')) {
        // Style headings
        cloned.querySelectorAll('h1, h2, h3').forEach((h) => {
          h.className = 'hero-heading';
        });

        // Check for all-caps text (eyebrow)
        cloned.querySelectorAll('p').forEach((p) => {
          const text = p.textContent.trim();
          if (text === text.toUpperCase() && text.length > 3 && !p.querySelector('a')) {
            p.className = 'hero-eyebrow';
          }
        });

        // Style bullet lists
        cloned.querySelectorAll('ul').forEach((ul) => {
          ul.className = 'hero-features';
        });

        // Style links as buttons
        cloned.querySelectorAll('a').forEach((a, index) => {
          a.className = index === 0 ? 'button primary' : 'button secondary hero-btn-outline';
        });

        // Wrap buttons in a CTA container
        const buttonLinks = cloned.querySelectorAll('a.button');
        if (buttonLinks.length > 0) {
          const ctaDiv = document.createElement('div');
          ctaDiv.className = 'hero-ctas';
          buttonLinks.forEach((btn) => ctaDiv.appendChild(btn));
          // Remove empty parent paragraphs
          cloned.querySelectorAll('p').forEach((p) => {
            if (!p.textContent.trim() && !p.querySelector('a')) p.remove();
          });
          cloned.appendChild(ctaDiv);
        }

        inner.append(...cloned.childNodes);
      }
    });
  });

  content.appendChild(inner);
  block.appendChild(content);
}
