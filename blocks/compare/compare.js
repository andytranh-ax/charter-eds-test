/**
 * Compare Block
 * Industry-leading price and feature comparison
 */

export default function decorate(block) {
  const data = {
    tiers: [
      { name: '300 Mbps', speed: 300, desc: 'Small teams' },
      { name: '600 Mbps', speed: 600, desc: 'Growing business' },
      { name: '1 Gig', speed: 1000, desc: 'High demand' },
    ],
    providers: [
      {
        name: 'Spectrum Business',
        logo: 'spectrum',
        isHighlighted: true,
        prices: [69.99, 104.99, 164.99],
        rating: 4.5,
        features: {
          'No annual contracts': true,
          'No data caps': true,
          'Free modem & router': true,
          'Free installation': true,
          'Static IP available': true,
          '24/7 U.S.-based support': true,
        },
      },
      {
        name: 'AT&T Business',
        logo: 'att',
        prices: [80, 140, 180],
        rating: 3.8,
        features: {
          'No annual contracts': false,
          'No data caps': false,
          'Free modem & router': false,
          'Free installation': false,
          'Static IP available': true,
          '24/7 U.S.-based support': true,
        },
      },
      {
        name: 'Comcast Business',
        logo: 'comcast',
        prices: [84.99, 134.99, 189.99],
        rating: 3.5,
        features: {
          'No annual contracts': false,
          'No data caps': false,
          'Free modem & router': false,
          'Free installation': false,
          'Static IP available': true,
          '24/7 U.S.-based support': true,
        },
      },
      {
        name: 'Verizon Business',
        logo: 'verizon',
        prices: [89.99, 149.99, 199.99],
        rating: 4.0,
        features: {
          'No annual contracts': false,
          'No data caps': true,
          'Free modem & router': false,
          'Free installation': false,
          'Static IP available': true,
          '24/7 U.S.-based support': true,
        },
      },
    ],
    testimonials: [
      {
        quote: "Switching to Spectrum saved us over $400 a year with better speeds and no contracts.",
        author: "Maria Chen",
        role: "Owner, Chen's Bakery",
        location: "Austin, TX"
      },
      {
        quote: "The free installation and equipment made the switch easy. Should have done it sooner.",
        author: "James Wilson",
        role: "IT Manager, Wilson & Partners",
        location: "Denver, CO"
      },
      {
        quote: "Our download speeds doubled and our bill went down. That's a win-win for any small business.",
        author: "David Park",
        role: "Founder, Park Digital Agency",
        location: "Seattle, WA"
      },
      {
        quote: "24/7 support that actually answers? Game changer when you're running a restaurant.",
        author: "Sofia Rodriguez",
        role: "Owner, Casa Sofia",
        location: "Miami, FL"
      },
      {
        quote: "No data caps means our team can video conference all day without worrying about overages.",
        author: "Michael Thompson",
        role: "CEO, Thompson Consulting",
        location: "Chicago, IL"
      },
      {
        quote: "We switched 3 locations and the consistency across all sites has been remarkable.",
        author: "Jennifer Lee",
        role: "Operations Director, Lee Medical Group",
        location: "Phoenix, AZ"
      },
    ],
  };

  block.innerHTML = '';
  block.className = 'compare';

  // Service categories for filter and typewriter
  const services = ['Internet', 'Phone', 'Mobile', 'TV'];

  // ========================================
  // PAGE TITLE WITH TYPEWRITER + FILTER
  // ========================================
  // Find and transform the page H1 from the doc
  const pageSection = block.closest('.section');
  const pageH1 = pageSection?.previousElementSibling?.querySelector('h1')
    || document.querySelector('main h1');

  if (pageH1) {
    // Create wrapper for title + filter
    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'compare-page-header';

    // Transform title to have typewriter on last word
    const titleText = pageH1.textContent.trim();
    const words = titleText.split(' ');
    const lastWord = words.pop(); // "Internet"
    const staticPart = words.join(' '); // "Compare Business"

    pageH1.innerHTML = `${staticPart} <span class="typewriter-wrapper"><span class="typewriter-text">${lastWord}</span><span class="typewriter-cursor">|</span></span>`;
    pageH1.className = 'compare-page-title';

    // Create filter dropdown
    const filterHtml = `
      <div class="compare-filter">
        <button class="compare-filter-btn" aria-expanded="false" aria-haspopup="true">
          <span class="compare-filter-label">Comparing</span>
          <span class="compare-filter-value">Internet</span>
          <svg class="compare-filter-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="compare-filter-dropdown">
          ${services.map((service, i) => `
            <button class="compare-filter-option ${i === 0 ? 'is-selected' : ''}" data-service="${service}">
              ${service}
              ${i === 0 ? '<span class="compare-filter-current">Current</span>' : ''}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // Wrap title and add filter
    pageH1.parentNode.insertBefore(titleWrapper, pageH1);
    titleWrapper.appendChild(pageH1);
    titleWrapper.insertAdjacentHTML('beforeend', filterHtml);
  }

  // Typewriter effect
  const typewriterText = document.querySelector('.typewriter-text');
  let currentServiceIndex = 0;
  let isDeleting = false;
  let charIndex = services[0].length;
  let isPaused = false;

  function typeWriter() {
    if (!typewriterText) return;
    const currentWord = services[currentServiceIndex];

    if (isPaused) {
      setTimeout(typeWriter, 100);
      return;
    }

    if (!isDeleting) {
      typewriterText.textContent = currentWord.substring(0, charIndex);
      charIndex++;

      if (charIndex > currentWord.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
        }, 2000);
      }
    } else {
      typewriterText.textContent = currentWord.substring(0, charIndex);
      charIndex--;

      if (charIndex < 0) {
        isDeleting = false;
        currentServiceIndex = (currentServiceIndex + 1) % services.length;
        charIndex = 0;
      }
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
  }

  setTimeout(typeWriter, 2500);

  // Filter dropdown toggle (in page header)
  const filterBtn = document.querySelector('.compare-filter-btn');
  const filterDropdown = document.querySelector('.compare-filter-dropdown');
  const filterValue = document.querySelector('.compare-filter-value');

  // ========================================
  // HERO SECTION
  // ========================================
  const heroWrapper = document.createElement('div');
  heroWrapper.className = 'compare-hero-wrapper';

  const hero = document.createElement('section');
  hero.className = 'compare-hero';
  hero.innerHTML = `
    <div class="compare-hero-content">
      <span class="compare-hero-badge">Price Comparison</span>
      <h2 class="compare-hero-title">See How Much You Could Save for <span class="compare-hero-service">Business Internet</span></h2>
      <p class="compare-hero-subtitle">See how Spectrum Business stacks up against major competitors. Real prices. Real savings. No surprises.</p>
    </div>
    <div class="compare-hero-stat">
      <span class="compare-hero-stat-number">$<span class="count-up" data-value="432">0</span></span>
      <span class="compare-hero-stat-label">Avg. annual savings</span>
    </div>
  `;
  heroWrapper.appendChild(hero);
  block.appendChild(heroWrapper);

  // ========================================
  // SAVINGS BUBBLES - Float up from hero edge
  // ========================================
  const bubblesContainer = document.createElement('div');
  bubblesContainer.className = 'compare-bubbles';
  heroWrapper.appendChild(bubblesContainer);

  const savingsAmounts = [15, 22, 18, 31, 27, 19, 24, 36, 28, 33, 21, 29, 17, 25, 32];

  function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'compare-bubble';

    // Random position along the width
    const leftPos = 10 + Math.random() * 80;
    bubble.style.left = `${leftPos}%`;

    // Random savings amount
    const amount = savingsAmounts[Math.floor(Math.random() * savingsAmounts.length)];
    bubble.innerHTML = `<span class="bubble-amount">$${amount}</span>`;

    bubblesContainer.appendChild(bubble);

    // Remove after animation completes
    bubble.addEventListener('animationend', () => {
      bubble.remove();
    });
  }

  // Spawn bubbles periodically
  setInterval(createBubble, 2000);
  // Initial bubbles staggered
  setTimeout(createBubble, 500);
  setTimeout(createBubble, 1200);

  if (filterBtn && filterDropdown) {
    filterBtn.addEventListener('click', () => {
      const isOpen = filterBtn.getAttribute('aria-expanded') === 'true';
      filterBtn.setAttribute('aria-expanded', !isOpen);
      filterDropdown.classList.toggle('is-open', !isOpen);
    });

    // Filter option selection
    filterDropdown.querySelectorAll('.compare-filter-option').forEach(option => {
      option.addEventListener('click', () => {
        const service = option.dataset.service;

        // Update selected state
        filterDropdown.querySelectorAll('.compare-filter-option').forEach(opt => {
          opt.classList.remove('is-selected');
          opt.querySelector('.compare-filter-current')?.remove();
        });
        option.classList.add('is-selected');
        option.insertAdjacentHTML('beforeend', '<span class="compare-filter-current">Current</span>');

        // Update button text
        filterValue.textContent = service;

        // Update hero section service text
        const heroService = document.querySelector('.compare-hero-service');
        if (heroService) {
          heroService.textContent = `Business ${service}`;
        }

        // Update savings section header
        const savingsService = document.querySelector('.compare-savings-service');
        if (savingsService) {
          savingsService.textContent = `Business ${service}`;
        }

        // Sync typewriter to selected service
        currentServiceIndex = services.indexOf(service);
        charIndex = service.length;
        isDeleting = false;
        isPaused = true;
        if (typewriterText) typewriterText.textContent = service;
        setTimeout(() => { isPaused = false; }, 2000);

        // Close dropdown
        filterBtn.setAttribute('aria-expanded', 'false');
        filterDropdown.classList.remove('is-open');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
        filterBtn.setAttribute('aria-expanded', 'false');
        filterDropdown.classList.remove('is-open');
      }
    });
  }

  // Animate hero stat
  setTimeout(() => {
    const countEl = hero.querySelector('.count-up');
    if (countEl) animateNumber(countEl, parseInt(countEl.dataset.value, 10));
  }, 500);

  // ========================================
  // SPEED TIER SELECTOR
  // ========================================
  const tierSection = document.createElement('section');
  tierSection.className = 'compare-tier-section';
  tierSection.innerHTML = `
    <div class="compare-section-header">
      <h2>Select Your Speed</h2>
      <p>Choose a speed tier to compare pricing</p>
    </div>
    <div class="compare-tier-selector">
      ${data.tiers.map((tier, i) => `
        <button class="compare-tier-card ${i === 1 ? 'active' : ''}" data-tier="${i}">
          <span class="compare-tier-speed">${tier.name}</span>
          <span class="compare-tier-desc">${tier.desc}</span>
        </button>
      `).join('')}
    </div>
  `;
  block.appendChild(tierSection);

  // ========================================
  // PRICE COMPARISON CARDS
  // ========================================
  const priceSection = document.createElement('section');
  priceSection.className = 'compare-price-section';

  function renderPriceCards(tierIndex) {
    const spectrum = data.providers.find(p => p.isHighlighted);
    const spectrumPrice = spectrum.prices[tierIndex];

    priceSection.innerHTML = `
      <div class="compare-price-grid">
        ${data.providers.map(provider => {
          const price = provider.prices[tierIndex];
          const savings = price - spectrumPrice;
          const isSpectrum = provider.isHighlighted;
          const savingsPercent = Math.round((savings / price) * 100);

          return `
            <div class="compare-price-card ${isSpectrum ? 'is-spectrum' : ''}" data-animate>
              ${isSpectrum ? '<div class="compare-price-badge">Best Value</div>' : ''}
              <div class="compare-price-header">
                <div class="compare-provider-logo" data-provider="${provider.logo}">
                  <span>${provider.name}</span>
                </div>
              </div>
              <div class="compare-price-body">
                <div class="compare-price-amount">
                  <span class="compare-price-currency">$</span>
                  <span class="compare-price-value">${price.toFixed(2).split('.')[0]}</span>
                  <span class="compare-price-cents">.${price.toFixed(2).split('.')[1]}</span>
                  <span class="compare-price-period">/mo</span>
                </div>
                ${!isSpectrum && savings > 0 ? `
                  <div class="compare-price-extra">
                    <span class="compare-extra-amount">+$${savings.toFixed(2)}/mo</span>
                    <span class="compare-extra-percent">${savingsPercent}% more</span>
                  </div>
                ` : ''}
                ${isSpectrum ? `
                  <div class="compare-price-savings">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-1 15l-5-5 1.41-1.41L9 12.17l7.59-7.59L18 6l-9 9z" fill="currentColor"/>
                    </svg>
                    <span>Lowest price guaranteed</span>
                  </div>
                ` : ''}
              </div>
              <div class="compare-price-features">
                ${Object.entries(provider.features).slice(0, 3).map(([feature, has]) => `
                  <div class="compare-feature-item ${has ? 'has-feature' : 'no-feature'}">
                    ${has ? `
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    ` : `
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                    `}
                    <span>${feature}</span>
                  </div>
                `).join('')}
              </div>
              ${isSpectrum ? `
                <a href="tel:8664414044" class="compare-cta-button">
                  Call 866-441-4044
                </a>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  renderPriceCards(1); // Default to middle tier
  block.appendChild(priceSection);

  // ========================================
  // ANNUAL SAVINGS VISUALIZATION
  // ========================================
  const savingsSection = document.createElement('section');
  savingsSection.className = 'compare-savings-section';

  function renderSavings(tierIndex) {
    const spectrum = data.providers.find(p => p.isHighlighted);
    const spectrumPrice = spectrum.prices[tierIndex];
    const competitors = data.providers.filter(p => !p.isHighlighted);

    const savingsData = competitors.map(c => ({
      name: c.name,
      monthly: c.prices[tierIndex] - spectrumPrice,
      annual: Math.round((c.prices[tierIndex] - spectrumPrice) * 12)
    }));

    const avgAnnual = Math.round(savingsData.reduce((sum, s) => sum + s.annual, 0) / savingsData.length);

    // Get current service from filter
    const currentService = document.querySelector('.compare-filter-value')?.textContent || 'Internet';

    savingsSection.innerHTML = `
      <div class="compare-savings-container">
        <div class="compare-savings-main">
          <div class="compare-savings-header">
            <h2>Your Annual Savings on <span class="compare-savings-service">Business ${currentService}</span></h2>
            <p>See how much you could save by switching to Spectrum Business</p>
          </div>
          <div class="compare-savings-display">
            <div class="compare-savings-amount">
              <span class="compare-savings-dollar">$</span>
              <span class="compare-savings-number" data-value="${avgAnnual}">0</span>
              <span class="compare-savings-year">/year</span>
            </div>
            <span class="compare-savings-context">average savings vs. competitors</span>
          </div>
        </div>
        <div class="compare-savings-breakdown">
          <div class="compare-savings-title">Savings by provider</div>
          ${savingsData.map(s => `
            <div class="compare-savings-row">
              <span class="compare-savings-provider">vs. ${s.name}</span>
              <div class="compare-savings-bar-container">
                <div class="compare-savings-bar" style="--width: ${(s.annual / Math.max(...savingsData.map(x => x.annual))) * 100}%"></div>
              </div>
              <span class="compare-savings-value">$${s.annual}/yr</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Animate savings number when visible
    const numberEl = savingsSection.querySelector('.compare-savings-number');
    if (numberEl && savingsSection.classList.contains('in-view')) {
      // Already visible, animate immediately
      setTimeout(() => animateNumber(numberEl, avgAnnual), 300);
    }
    // Otherwise, the intersection observer will trigger it
  }

  renderSavings(1);
  block.appendChild(savingsSection);

  // Intersection Observer for savings counter - only animate when visible
  const savingsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        savingsSection.classList.add('in-view');
        const numberEl = savingsSection.querySelector('.compare-savings-number');
        const targetValue = parseInt(numberEl?.dataset.value, 10);
        if (numberEl && targetValue) {
          animateNumber(numberEl, targetValue);
        }
      }
    });
  }, { threshold: 0.3 });

  savingsObserver.observe(savingsSection);

  // ========================================
  // FEATURE COMPARISON TABLE
  // ========================================
  const featureSection = document.createElement('section');
  featureSection.className = 'compare-feature-section';

  const allFeatures = Object.keys(data.providers[0].features);
  featureSection.innerHTML = `
    <div class="compare-section-header">
      <h2>Full Feature Comparison</h2>
      <p>See all the benefits included with each provider</p>
    </div>
    <div class="compare-feature-table">
      <div class="compare-feature-header">
        <div class="compare-feature-label">Features</div>
        ${data.providers.map(p => `
          <div class="compare-feature-provider ${p.isHighlighted ? 'is-spectrum' : ''}">
            ${p.name}
          </div>
        `).join('')}
      </div>
      ${allFeatures.map(feature => `
        <div class="compare-feature-row">
          <div class="compare-feature-name">
            ${getFeatureIcon(feature)}
            <span>${feature}</span>
          </div>
          ${data.providers.map(p => `
            <div class="compare-feature-cell ${p.isHighlighted ? 'is-spectrum' : ''}">
              ${p.features[feature] ? `
                <span class="feature-yes">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="currentColor" fill-opacity="0.1"/>
                    <path d="M14.167 7L8.5 12.667 5.833 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              ` : `
                <span class="feature-no">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="currentColor" fill-opacity="0.1"/>
                    <path d="M13 7L7 13M7 7l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </span>
              `}
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;
  block.appendChild(featureSection);

  // ========================================
  // TESTIMONIALS - INFINITE MARQUEE
  // ========================================
  const testimonialSection = document.createElement('section');
  testimonialSection.className = 'compare-testimonial-section';

  const testimonialCards = data.testimonials.map(t => `
    <div class="compare-testimonial-card">
      <div class="compare-testimonial-quote">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" class="quote-icon">
          <path d="M13.333 14.667H8V10c0-2.945 2.388-5.333 5.333-5.333h1.334V8h-1.334A2.667 2.667 0 0010.667 10.667v1.333h2.666v2.667zm10.667 0H18.667V10c0-2.945 2.388-5.333 5.333-5.333h1.333V8H24A2.667 2.667 0 0021.333 10.667v1.333H24v2.667z" fill="currentColor"/>
        </svg>
        <p>"${t.quote}"</p>
      </div>
      <div class="compare-testimonial-author">
        <div class="compare-author-avatar">${t.author.split(' ').map(n => n[0]).join('')}</div>
        <div class="compare-author-info">
          <span class="compare-author-name">${t.author}</span>
          <span class="compare-author-role">${t.role}</span>
          <span class="compare-author-location">${t.location}</span>
        </div>
      </div>
    </div>
  `).join('');

  testimonialSection.innerHTML = `
    <div class="compare-section-header">
      <h2>What Business Owners Say</h2>
      <p>Real customers who made the switch</p>
    </div>
    <div class="compare-testimonial-marquee">
      <div class="compare-testimonial-track">
        ${testimonialCards}
        ${testimonialCards}
      </div>
    </div>
  `;
  block.appendChild(testimonialSection);

  // Pause on hover
  const marquee = testimonialSection.querySelector('.compare-testimonial-marquee');
  marquee.addEventListener('mouseenter', () => {
    marquee.classList.add('is-paused');
  });
  marquee.addEventListener('mouseleave', () => {
    marquee.classList.remove('is-paused');
  });

  // ========================================
  // CTA SECTION (with disclaimer integrated)
  // ========================================
  const ctaSection = document.createElement('section');
  ctaSection.className = 'compare-cta-section';
  ctaSection.innerHTML = `
    <div class="compare-cta-content">
      <h2>Ready to Start Saving?</h2>
      <p>Switch to Spectrum Business Internet today. No contracts, no data caps, no surprises.</p>
      <div class="compare-cta-actions">
        <a href="tel:8664414044" class="compare-cta-primary">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M18.333 14.1v2.5a1.667 1.667 0 01-1.816 1.667 16.492 16.492 0 01-7.192-2.559 16.25 16.25 0 01-5-5 16.492 16.492 0 01-2.558-7.225A1.667 1.667 0 013.4 1.667h2.5a1.667 1.667 0 011.667 1.433c.105.8.3 1.586.583 2.342a1.667 1.667 0 01-.375 1.758l-1.058 1.058a13.333 13.333 0 005 5l1.058-1.058a1.667 1.667 0 011.758-.375c.756.284 1.542.478 2.342.583a1.667 1.667 0 011.458 1.692z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Call 866-441-4044
        </a>
        <a href="/check-availability" class="compare-cta-secondary">Check Availability</a>
      </div>
      <p class="compare-cta-disclaimer">
        Pricing based on publicly available rates as of ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
        Actual pricing may vary by location. Equipment fees, taxes, and other charges may apply.
      </p>
    </div>
  `;
  block.appendChild(ctaSection);

  // ========================================
  // EVENT LISTENERS
  // ========================================
  tierSection.querySelectorAll('.compare-tier-card').forEach(card => {
    card.addEventListener('click', () => {
      tierSection.querySelectorAll('.compare-tier-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const tierIndex = parseInt(card.dataset.tier, 10);
      renderPriceCards(tierIndex);
      renderSavings(tierIndex);
    });
  });

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  block.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-ready');
    observer.observe(section);
  });
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function animateNumber(element, target) {
  const duration = 1200;
  const start = performance.now();
  const startValue = Math.floor(target * 1.3);

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(startValue - (startValue - target) * easeOut);

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function getFeatureIcon(feature) {
  const icons = {
    'No annual contracts': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 18.333a8.333 8.333 0 100-16.666 8.333 8.333 0 000 16.666z" stroke="currentColor" stroke-width="1.5"/><path d="M12.5 7.5l-5 5M7.5 7.5l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    'No data caps': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 1.667v16.666M1.667 10h16.666" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    'Free modem & router': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2.5" y="5" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="6" cy="10" r="1" fill="currentColor"/><circle cx="10" cy="10" r="1" fill="currentColor"/></svg>`,
    'Free installation': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 1.667l8.333 6.666v10H1.667v-10L10 1.667z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
    'Static IP available': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.333" stroke="currentColor" stroke-width="1.5"/><path d="M10 5v5l3.333 1.667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    '24/7 U.S.-based support': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 8.333a5 5 0 00-10 0v4.167a3.333 3.333 0 003.333 3.333h3.334A3.333 3.333 0 0015 12.5V8.333z" stroke="currentColor" stroke-width="1.5"/><path d="M7.5 10h.008M12.5 10h.008" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  };

  return icons[feature] || `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/></svg>`;
}
