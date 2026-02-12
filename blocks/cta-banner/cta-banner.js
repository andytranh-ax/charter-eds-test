/*
 * CTA BANNER BLOCK
 * ================
 * FILE: blocks/cta-banner/cta-banner.js
 *
 * HOW TO ADD: Create blocks/cta-banner/cta-banner.js in your repo
 *
 * WHAT THIS BLOCK EXPECTS IN GOOGLE DOCS:
 * Create a 1-column table. First row says "cta-banner".
 * Second row contains:
 *   - A heading (bold or heading style)
 *   - A paragraph of description text
 *   - One or more links (become buttons)
 */
export default function decorate(block) {
  const content = block.querySelector('div > div');
  if (!content) return;

  // Wrap everything in centered container
  const wrapper = document.createElement('div');
  wrapper.className = 'cta-banner-inner';

  // Move all content into wrapper
  while (content.firstChild) {
    wrapper.appendChild(content.firstChild);
  }

  // Style buttons
  const links = wrapper.querySelectorAll('a');
  if (links.length > 0) {
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'cta-banner-actions';

    links.forEach((link, index) => {
      // Remove from parent paragraph
      const parent = link.parentElement;
      link.className = index === 0 ? 'button primary' : 'button secondary';
      ctaDiv.appendChild(link);
      // Remove empty paragraph
      if (parent && parent.tagName === 'P' && !parent.textContent.trim()) {
        parent.remove();
      }
    });

    wrapper.appendChild(ctaDiv);
  }

  block.innerHTML = '';
  block.appendChild(wrapper);
}
