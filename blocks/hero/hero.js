export default function decorate(block) {
  // Get the rows from the author's content
  const rows = [...block.children];

  // First row is the background image
  const imageRow = rows[0];
  const image = imageRow.querySelector('picture');

  if (image) {
    image.classList.add('hero-background');
    block.prepend(image);
    imageRow.remove();
  }

  // Remaining rows become the overlay content
  const overlay = document.createElement('div');
  overlay.classList.add('hero-overlay');

  // Move remaining content into overlay
  [...block.children].forEach((row) => {
    if (row.tagName !== 'PICTURE') {
      overlay.appendChild(row);
    }
  });

  block.appendChild(overlay);
}
