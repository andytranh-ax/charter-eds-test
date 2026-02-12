/**
 * Serviceability Bar Block
 * Address lookup form for checking service availability
 */
export default function decorate(block) {
  block.innerHTML = `
    <div class="serviceability-inner">
      <div class="serviceability-form">
        <input type="text" placeholder="Street Address" aria-label="Street Address" />
        <div class="divider"></div>
        <input type="text" placeholder="Suite/Unit" aria-label="Suite or Unit" />
        <div class="divider"></div>
        <input type="text" placeholder="Zip Code" aria-label="Zip Code" />
        <button class="serviceability-btn">Check availability</button>
      </div>
    </div>
  `;
}
