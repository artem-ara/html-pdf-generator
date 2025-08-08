// Expose a global templates registry
window.PDF_TEMPLATES = window.PDF_TEMPLATES || {};

// Load templates dynamically from page HTML files
(async function loadTemplates() {
  try {
    // Load templates for pages 1-11
    for (let i = 1; i <= 11; i++) {
      const pageNum = i;
      const pageKey = `page${pageNum}`;
      
      try {
        // Using fetch to load template HTML files
        const response = await fetch(`page-${pageNum}.html`);
        
        if (response.ok) {
          const html = await response.text();
          window.PDF_TEMPLATES[pageKey] = html;
          console.log(`Loaded template for ${pageKey}`);
        } else {
          console.error(`Failed to load template for ${pageKey}: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        console.error(`Error loading template for ${pageKey}:`, err);
      }
    }
    
    // Notify when all templates are loaded
    console.log('All templates loaded successfully');
    
    // Dispatch an event when templates are loaded
    const event = new CustomEvent('templatesLoaded');
    window.dispatchEvent(event);
  } catch (error) {
    console.error('Error loading templates:', error);
  }
})();
