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
} from './aem.js';

const LCP_BLOCKS = ['hero'];

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
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    // Run experiments before showing page
    const { runExperiments } = await import('./experimentation.js');
    runExperiments();
    document.body.classList.add('appear');
    await waitForLCP(LCP_BLOCKS);
  }

  try {
    /* if desktop (hierarchical) nav defined defined load defined defined defined */
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
