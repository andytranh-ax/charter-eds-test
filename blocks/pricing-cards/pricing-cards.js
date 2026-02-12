/*
 * PRICING CARDS BLOCK
 * ===================
 * FILE: blocks/pricing-cards/pricing-cards.js
 *
 * HOW TO ADD THIS TO YOUR REPO:
 * 1. In your GitHub repo, go to the "blocks" folder
 * 2. Click "Add file" > "Create new file"
 * 3. Type "pricing-cards/pricing-cards.js" as the filename
 * 4. Paste this entire file content
 * 5. Commit the change
 *
 * WHAT THIS BLOCK EXPECTS IN GOOGLE DOCS:
 * Create a table with 3 columns. First row says "pricing-cards".
 * Each column is one pricing card.
 * Inside each column, put the content in this order:
 *   - Eyebrow text in ALL CAPS (like "SPECTRUM BUSINESS INTERNET PREMIER")
 *   - Speed headline (like "Up to 500 Mbps") — make it bold or a heading
 *   - Price line (like "$65/mo")
 *   - Bundle text (like "Bundle and save up to $25/mo")
 *   - Bullet list of features
 *   - A link that becomes the "Order now" button
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.className = 'pricing-cards';

  // Each row might contain multiple columns (cards side by side)
  // Or each row might be a separate card — handle both
  rows.forEach((row) => {
    const cells = [...row.children];

    cells.forEach((cell) => {
      const card = document.createElement('div');
      card.className = 'pricing-card';

      // Get all the content elements
      const elements = [...cell.children];

      elements.forEach((el) => {
        const text = el.textContent.trim();

        // ALL CAPS text = eyebrow
        if (el.tagName === 'P' && text === text.toUpperCase() && text.length > 5 && !el.querySelector('a')) {
          const eyebrow = document.createElement('div');
          eyebrow.className = 'pricing-card-eyebrow';
          eyebrow.textContent = text;
          card.appendChild(eyebrow);
          return;
        }

        // Headings = speed tier (also detect bold text or "Up to X" pattern)
        if (el.tagName.match(/^H[1-6]$/) ||
            (el.querySelector('strong') && text.toLowerCase().includes('mbps')) ||
            text.match(/^up to \d+/i) ||
            text.match(/\d+\s*(mbps|gig)/i)) {
          const speed = document.createElement('div');
          speed.className = 'pricing-card-speed';
          speed.textContent = text;
          card.appendChild(speed);

          // Add divider after speed
          const divider = document.createElement('div');
          divider.className = 'pricing-card-divider';
          card.appendChild(divider);
          return;
        }

        // Bold text with $ = price
        if (text.includes('$') && !el.querySelector('a')) {
          // Check if it looks like a main price line
          const priceMatch = text.match(/\$(\d+)/);
          if (priceMatch) {
            // Check if there's a label before the price
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

            // Check for remaining text after price (bundle info)
            const afterPrice = text.split(/\/mo\.?\s*/)[1];
            if (afterPrice) {
              const bundle = document.createElement('div');
              bundle.className = 'pricing-card-bundle';
              bundle.textContent = afterPrice;
              card.appendChild(bundle);
            }
            return;
          }
        }

        // Text mentioning "bundle" or "save" = bundle info
        if ((text.toLowerCase().includes('bundle') || text.toLowerCase().includes('save'))
            && !el.querySelector('a') && !text.includes('$')) {
          const bundle = document.createElement('div');
          bundle.className = 'pricing-card-bundle';
          bundle.textContent = text;
          card.appendChild(bundle);
          return;
        }

        // Unordered list = features
        if (el.tagName === 'UL') {
          const features = el.cloneNode(true);
          features.className = 'pricing-card-features';
          // Add checkmark styling via CSS (no need to modify list items)
          card.appendChild(features);
          return;
        }

        // Paragraph with bullet characters (•, ●, *) = features list
        if (el.tagName === 'P' && (text.includes('•') || text.includes('●'))) {
          // Check if we already have a features list, if not create one
          let features = card.querySelector('.pricing-card-features');
          if (!features) {
            features = document.createElement('ul');
            features.className = 'pricing-card-features';
            card.appendChild(features);
          }
          // Handle multiple bullets in one paragraph (split by bullet char)
          const bulletLines = text.split(/[•●]/).filter((line) => line.trim());
          bulletLines.forEach((bulletText) => {
            const li = document.createElement('li');
            li.textContent = bulletText.trim();
            features.appendChild(li);
          });
          return;
        }

        // Links = CTA button
        if (el.querySelector('a')) {
          const link = el.querySelector('a');
          const btn = document.createElement('a');
          btn.href = link.href;
          btn.className = 'button primary';
          btn.textContent = link.textContent;
          card.appendChild(btn);
          return;
        }

        // Everything else = regular paragraph
        if (text) {
          const p = el.cloneNode(true);
          p.className = 'pricing-card-text';
          card.appendChild(p);
        }
      });

      block.appendChild(card);
    });
  });
}
