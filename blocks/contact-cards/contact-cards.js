/*
 * CONTACT CARDS BLOCK
 * ===================
 * FILE: blocks/contact-cards/contact-cards.js
 *
 * HOW TO ADD: Create blocks/contact-cards/contact-cards.js in your repo
 *
 * WHAT THIS BLOCK EXPECTS IN GOOGLE DOCS:
 * Create a table with 3 columns. First row says "contact-cards".
 * Each column is one contact card with:
 *   - A heading (bold text for the title like "Call to order")
 *   - A paragraph (hours/description)
 *   - A link (phone number or action link)
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.className = 'contact-cards';

  // SVG icons for the three contact types
  const icons = {
    call: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    callback: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>',
    chat: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
  };

  const iconArray = [icons.call, icons.callback, icons.chat];
  let cardIndex = 0;

  rows.forEach((row) => {
    const cells = [...row.children];

    cells.forEach((cell) => {
      const card = document.createElement('div');
      card.className = 'contact-card';

      // Add icon
      const iconDiv = document.createElement('div');
      iconDiv.className = 'contact-card-icon';
      iconDiv.innerHTML = iconArray[cardIndex % 3] || iconArray[0];
      card.appendChild(iconDiv);

      // Process content
      const elements = [...cell.children];
      elements.forEach((el) => {
        const text = el.textContent.trim();

        // Headings
        if (el.tagName.match(/^H[1-6]$/) || el.querySelector('strong')) {
          const h3 = document.createElement('h3');
          h3.textContent = text;
          card.appendChild(h3);

          // Add divider after heading
          const divider = document.createElement('div');
          divider.className = 'contact-card-divider';
          card.appendChild(divider);
          return;
        }

        // Links
        if (el.querySelector('a')) {
          const link = el.querySelector('a');
          const a = document.createElement('a');
          a.href = link.href;
          a.className = 'contact-link';
          a.textContent = link.textContent + ' →';
          card.appendChild(a);
          return;
        }

        // Paragraphs
        if (text) {
          const p = document.createElement('p');
          p.textContent = text;
          card.appendChild(p);
        }
      });

      block.appendChild(card);
      cardIndex++;
    });
  });
}
