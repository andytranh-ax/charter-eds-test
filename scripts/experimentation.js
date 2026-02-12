/**
 * EDS Experimentation Plugin
 * Handles A/B testing via section metadata
 */

// Get or create a persistent visitor ID
function getVisitorId() {
  let visitorId = localStorage.getItem('eds-visitor-id');
  if (!visitorId) {
    visitorId = Math.random().toString(36).substring(2);
    localStorage.setItem('eds-visitor-id', visitorId);
  }
  return visitorId;
}

// Simple hash function to consistently assign variants
function hashToVariant(visitorId, experimentId, variantCount) {
  let hash = 0;
  const str = visitorId + experimentId;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % variantCount;
}

// Get experiment assignment from URL param (for testing) or hash
function getExperimentAssignment(experimentId, variants) {
  // Check URL params for forced variant (testing)
  const urlParams = new URLSearchParams(window.location.search);
  const forcedVariant = urlParams.get(`experiment-${experimentId}`);
  if (forcedVariant && variants.includes(forcedVariant)) {
    console.log(`[Experiment] ${experimentId}: Forced variant "${forcedVariant}" via URL`);
    return forcedVariant;
  }

  // Otherwise, hash-based assignment
  const visitorId = getVisitorId();
  const variantIndex = hashToVariant(visitorId, experimentId, variants.length);
  const assignedVariant = variants[variantIndex];
  console.log(`[Experiment] ${experimentId}: Assigned variant "${assignedVariant}"`);
  return assignedVariant;
}

// Run experimentation
export function runExperiments() {
  // Find all sections with experiment metadata
  const sections = document.querySelectorAll('.section[data-experiment]');

  // Group sections by experiment
  const experiments = {};
  sections.forEach(section => {
    const experimentId = section.dataset.experiment;
    const variant = section.dataset.variant || 'control';

    if (!experiments[experimentId]) {
      experiments[experimentId] = {};
    }
    experiments[experimentId][variant] = section;
  });

  // Process each experiment
  Object.entries(experiments).forEach(([experimentId, variants]) => {
    const variantNames = Object.keys(variants);
    if (variantNames.length < 2) return; // Need at least 2 variants

    const assignedVariant = getExperimentAssignment(experimentId, variantNames);

    // Show assigned variant, hide others
    variantNames.forEach(variantName => {
      const section = variants[variantName];
      if (variantName === assignedVariant) {
        section.style.display = '';
        section.dataset.experimentActive = 'true';
      } else {
        section.style.display = 'none';
      }
    });

    // Track experiment view (you can send this to analytics)
    console.log(`[Experiment] Showing: ${experimentId} / ${assignedVariant}`);
  });
}

export default { runExperiments };
