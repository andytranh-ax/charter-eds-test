/*
 * FAQ BLOCK (ACCORDION)
 * =====================
 * FILE: blocks/faq/faq.js
 *
 * HOW TO ADD: Create blocks/faq/faq.js in your repo
 *
 * WHAT THIS BLOCK EXPECTS IN GOOGLE DOCS:
 * Create a table with 2 columns. First row says "faq".
 * Each subsequent row is one FAQ item:
 *   - Left column: The question text
 *   - Right column: The answer text
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.className = 'faq';

  const list = document.createElement('div');
  list.className = 'faq-list';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const question = cells[0].textContent.trim();
    const answer = cells[1].innerHTML;

    if (!question) return;

    const item = document.createElement('div');
    item.className = 'faq-item';

    // Question button
    const btn = document.createElement('button');
    btn.className = 'faq-question';
    btn.innerHTML = `
      <span>${question}</span>
      <span class="faq-icon"></span>
    `;

    // Answer container
    const answerDiv = document.createElement('div');
    answerDiv.className = 'faq-answer';

    const answerContent = document.createElement('div');
    answerContent.className = 'faq-answer-content';
    answerContent.innerHTML = answer;

    answerDiv.appendChild(answerContent);

    // Click handler — toggle open/close
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all items first
      list.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('open');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
      }
    });

    item.appendChild(btn);
    item.appendChild(answerDiv);
    list.appendChild(item);
  });

  block.appendChild(list);
}
