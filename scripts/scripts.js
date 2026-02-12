import {
  sampleRUM,
  buildBlock,
  loadBlock,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
  getMetadata,
  toCamelCase,
  toClassName,
} from './aem.js';

// Demo password protection
const DEMO_PASSWORD = 'spectrum2024';

function checkDemoAccess() {
  if (sessionStorage.getItem('demo-access') === 'granted') return true;

  // Create password overlay
  const overlay = document.createElement('div');
  overlay.id = 'demo-gate';
  overlay.innerHTML = `
    <div class="demo-gate-card">
      <div class="demo-gate-logo">Spectrum <span>BUSINESS</span></div>
      <h2>Demo Preview</h2>
      <p>Enter password to view this demo</p>
      <form class="demo-gate-form">
        <input type="password" placeholder="Enter password" autocomplete="off" />
        <button type="submit">View Demo</button>
      </form>
      <div class="demo-gate-error"></div>
    </div>
  `;

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    #demo-gate {
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #0D1117 0%, #1a2332 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      padding: 24px;
    }
    .demo-gate-card {
      background: #fff;
      border-radius: 16px;
      padding: 48px 40px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
    }
    .demo-gate-logo {
      font-size: 28px;
      font-weight: 800;
      color: #0D1117;
      margin-bottom: 32px;
    }
    .demo-gate-logo span {
      display: block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 3px;
      margin-top: 2px;
    }
    .demo-gate-card h2 {
      font-size: 20px;
      font-weight: 700;
      color: #0D1117;
      margin: 0 0 8px 0;
    }
    .demo-gate-card p {
      font-size: 14px;
      color: #6c757d;
      margin: 0 0 24px 0;
    }
    .demo-gate-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .demo-gate-form input {
      padding: 14px 16px;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 16px;
      text-align: center;
      transition: border-color 0.2s;
    }
    .demo-gate-form input:focus {
      outline: none;
      border-color: #0051BF;
    }
    .demo-gate-form button {
      background: #0051BF;
      color: #fff;
      border: none;
      padding: 14px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .demo-gate-form button:hover {
      background: #003d8f;
    }
    .demo-gate-error {
      color: #dc3545;
      font-size: 13px;
      margin-top: 12px;
      min-height: 20px;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // Handle form
  const form = overlay.querySelector('form');
  const input = overlay.querySelector('input');
  const error = overlay.querySelector('.demo-gate-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value === DEMO_PASSWORD) {
      sessionStorage.setItem('demo-access', 'granted');
      overlay.remove();
      style.remove();
      document.body.style.overflow = '';
    } else {
      error.textContent = 'Incorrect password';
      input.value = '';
      input.focus();
    }
  });

  input.focus();
  return false;
}

checkDemoAccess();

const LCP_BLOCKS = ['hero'];

const AUDIENCES = {
  mobile: () => window.innerWidth < 600,
  desktop: () => window.innerWidth >= 600,
};

/**
 * Gets all the metadata elements that are in the given scope.
 * @param {String} scope The scope/prefix for the metadata
 * @returns an object with the metadata
 */
export function getAllMetadata(scope) {
  return [...document.head.querySelectorAll(`meta[property^="${scope}:"],meta[name^="${scope}-"]`)]
    .reduce((res, meta) => {
      const id = toClassName(meta.name
        ? meta.name.substring(scope.length + 1)
        : meta.getAttribute('property').split(':')[1]);
      res[id] = meta.getAttribute('content');
      return res;
    }, {});
}

/**
 * Loads the header block.
 * @param {Element} header The header element
 */
async function loadHeader(header) {
  const headerBlock = document.createElement('div');
  headerBlock.classList.add('header', 'block');
  headerBlock.dataset.blockName = 'header';
  header.append(headerBlock);
  await loadBlock(headerBlock);
}

/**
 * Loads the footer block.
 * @param {Element} footer The footer element
 */
async function loadFooter(footer) {
  const footerBlock = document.createElement('div');
  footerBlock.classList.add('footer', 'block');
  footerBlock.dataset.blockName = 'footer';
  footer.append(footerBlock);
  await loadBlock(footerBlock);
}

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * load fonts.css and set a cookie
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
export function decorateMain(main) {
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();

  // Experimentation plugin — eager phase
  if (getMetadata('experiment')
    || Object.keys(getAllMetadata('campaign')).length
    || Object.keys(getAllMetadata('audience')).length) {
    // eslint-disable-next-line import/no-relative-packages
    const { loadEager: runEager } = await import('../plugins/experimentation/src/index.js');
    await runEager(document, { audiences: AUDIENCES }, {
      getAllMetadata,
      getMetadata,
      loadCSS,
      loadScript: (src) => import(src),
      sampleRUM,
      toCamelCase,
      toClassName,
    });
  }

  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    // Run same-page section-level experiments (for A/B tests within same doc)
    const { runExperiments } = await import('./experimentation.js');
    runExperiments();
    document.body.classList.add('appear');
    await waitForLCP(LCP_BLOCKS);
  }

  try {
    /* if desktop (hierarchical) nav defined */
    if (window.innerWidth >= 900) loadFonts();
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  // Load header and footer
  const header = doc.querySelector('header');
  const footer = doc.querySelector('footer');
  loadHeader(header);
  loadFooter(footer);

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadCSS(`${window.hlx.codeBasePath}/styles/animations.css`);
  loadCSS(`${window.hlx.codeBasePath}/styles/refinements.css`);
  loadFonts();

  // Load animations
  import('./animations.js');

  sampleRUM('lazy');
  if (sampleRUM.observe) {
    sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
    sampleRUM.observe(main.querySelectorAll('picture > img'));
  }

  // Experimentation plugin — lazy phase (loads overlay UI)
  if (getMetadata('experiment')
    || Object.keys(getAllMetadata('campaign')).length
    || Object.keys(getAllMetadata('audience')).length) {
    // eslint-disable-next-line import/no-relative-packages
    const { loadLazy: runLazy } = await import('../plugins/experimentation/src/index.js');
    await runLazy(document, { audiences: AUDIENCES }, {
      getAllMetadata,
      getMetadata,
      loadCSS,
      loadScript: (src) => import(src),
      sampleRUM,
      toCamelCase,
      toClassName,
    });
  }
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
