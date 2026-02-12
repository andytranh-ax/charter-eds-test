/**
 * Compare Block
 * Interactive price and feature comparison visualization
 */

export default function decorate(block) {
  // Competitor pricing data (estimated based on published rates)
  const data = {
    tiers: [
      { name: '300 Mbps', speed: 300 },
      { name: '600 Mbps', speed: 600 },
      { name: '1 Gig', speed: 1000 },
    ],
    providers: [
      {
        name: 'Spectrum Business',
        isHighlighted: true,
        prices: [69.99, 104.99, 164.99],
        features: {
          'No annual contract': true,
          'No data caps': true,
          'Free modem included': true,
          'Static IP available': true,
          '24/7 U.S.-based support': true,
          'Free professional installation': true,
        },
      },
      {
        name: 'AT&T Business',
        prices: [80, 140, 180],
        features: {
          'No annual contract': false,
          'No data caps': false,
          'Free modem included': false,
          'Static IP available': true,
          '24/7 U.S.-based support': true,
          'Free professional installation': false,
        },
      },
      {
        name: 'Comcast Business',
        prices: [84.99, 134.99, 189.99],
        features: {
          'No annual contract': false,
          'No data caps': false,
          'Free modem included': false,
          'Static IP available': true,
          '24/7 U.S.-based support': true,
          'Free professional installation': false,
        },
      },
    ],
  };

  // Build the UI
  block.innerHTML = '';
  block.className = 'compare';

  // Speed tier selector
  const tierSelector = document.createElement('div');
  tierSelector.className = 'compare-tier-selector';
  tierSelector.innerHTML = `
    <span class="compare-tier-label">Select speed:</span>
    <div class="compare-tier-tabs">
      ${data.tiers.map((tier, i) => `
        <button class="compare-tier-tab ${i === 0 ? 'active' : ''}" data-tier="${i}">
          ${tier.name}
        </button>
      `).join('')}
    </div>
  `;
  block.appendChild(tierSelector);

  // Price comparison bars
  const priceComparison = document.createElement('div');
  priceComparison.className = 'compare-prices';

  function renderPrices(tierIndex) {
    const maxPrice = Math.max(...data.providers.map(p => p.prices[tierIndex]));
    const spectrum = data.providers.find(p => p.isHighlighted);
    const spectrumPrice = spectrum.prices[tierIndex];

    priceComparison.innerHTML = data.providers.map(provider => {
      const price = provider.prices[tierIndex];
      const barWidth = (price / maxPrice) * 100;
      const savings = price - spectrumPrice;
      const isSpectrum = provider.isHighlighted;

      return `
        <div class="compare-price-row ${isSpectrum ? 'is-spectrum' : ''}">
          <div class="compare-provider-name">${provider.name}</div>
          <div class="compare-bar-container">
            <div class="compare-bar" style="width: 0%" data-width="${barWidth}">
              <span class="compare-price">$${price.toFixed(2)}<span class="compare-period">/mo</span></span>
            </div>
          </div>
          ${!isSpectrum && savings > 0 ? `
            <div class="compare-savings">+$${savings.toFixed(2)}/mo more</div>
          ` : ''}
          ${isSpectrum ? `
            <div class="compare-best">Best Value</div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Animate bars
    requestAnimationFrame(() => {
      priceComparison.querySelectorAll('.compare-bar').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    });
  }

  renderPrices(0);
  block.appendChild(priceComparison);

  // Annual savings calculator
  const savingsCalc = document.createElement('div');
  savingsCalc.className = 'compare-savings-calc';

  function renderSavings(tierIndex) {
    const spectrum = data.providers.find(p => p.isHighlighted);
    const spectrumPrice = spectrum.prices[tierIndex];
    const competitors = data.providers.filter(p => !p.isHighlighted);
    const avgCompetitorPrice = competitors.reduce((sum, p) => sum + p.prices[tierIndex], 0) / competitors.length;
    const monthlySavings = avgCompetitorPrice - spectrumPrice;
    const annualSavings = Math.round(monthlySavings * 12);

    savingsCalc.innerHTML = `
      <div class="compare-savings-card">
        <div class="compare-savings-label">Estimated annual savings with Spectrum Business</div>
        <div class="compare-savings-amount">
          <span class="compare-savings-dollar">$</span>
          <span class="compare-savings-number" data-value="${annualSavings}">0</span>
        </div>
        <div class="compare-savings-subtext">vs. average competitor pricing at comparable speeds*</div>
      </div>
    `;

    // Animate counter
    const numberEl = savingsCalc.querySelector('.compare-savings-number');
    animateNumber(numberEl, annualSavings);
  }

  renderSavings(0);
  block.appendChild(savingsCalc);

  // Feature comparison matrix
  const featureMatrix = document.createElement('div');
  featureMatrix.className = 'compare-features';

  const allFeatures = Object.keys(data.providers[0].features);
  featureMatrix.innerHTML = `
    <div class="compare-features-header">
      <div class="compare-feature-label">Features included</div>
      ${data.providers.map(p => `
        <div class="compare-provider-header ${p.isHighlighted ? 'is-spectrum' : ''}">${p.name}</div>
      `).join('')}
    </div>
    ${allFeatures.map(feature => `
      <div class="compare-feature-row">
        <div class="compare-feature-name">${feature}</div>
        ${data.providers.map(p => `
          <div class="compare-feature-check ${p.isHighlighted ? 'is-spectrum' : ''}">
            ${p.features[feature] ? `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            ` : `
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            `}
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;
  block.appendChild(featureMatrix);

  // Disclaimer
  const disclaimer = document.createElement('div');
  disclaimer.className = 'compare-disclaimer';
  disclaimer.innerHTML = `
    <p>*Pricing comparison based on publicly available rates as of ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
    Actual pricing may vary by location and promotional offers. Equipment fees, taxes, and other charges may apply.
    Contact providers directly for current pricing and availability in your area.</p>
  `;
  block.appendChild(disclaimer);

  // Event listeners for tier tabs
  tierSelector.querySelectorAll('.compare-tier-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tierSelector.querySelectorAll('.compare-tier-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tierIndex = parseInt(tab.dataset.tier, 10);
      renderPrices(tierIndex);
      renderSavings(tierIndex);
    });
  });
}

// Animate number counting up
function animateNumber(element, target) {
  const duration = 1000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * easeOut);

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
