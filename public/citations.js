/**
 * Citation tooltip and bidirectional linking system
 */

class CitationManager {
  constructor() {
    this.references = new Map();
    this.init();
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.parseReferences();
    this.enhanceCitations();
    this.addBackLinks();
    this.createTooltip();
  }

  parseReferences() {
    // Find the References h2 within the article
    const article = document.querySelector("#article, article, .prose");
    if (!article) return;

    const headings = Array.from(article.querySelectorAll("h2"));
    const referencesHeading = headings.find(
      h => h.textContent.trim() === "References"
    );

    if (!referencesHeading) return;

    // Get the parent container
    const container = referencesHeading.parentElement;

    // Find all text content after References heading
    let currentElement = referencesHeading.nextElementSibling;

    while (currentElement && currentElement.tagName !== "H2") {
      const text = currentElement.textContent || "";

      // Match reference patterns like [1] Text... [2] Text...
      const refPattern = /\[(\d+)\]\s+([^\[]+?)(?=\[|\s*$)/g;
      let match;

      while ((match = refPattern.exec(text)) !== null) {
        const num = match[1];
        const refText = match[2].trim();
        this.references.set(num, refText);
      }

      currentElement = currentElement.nextElementSibling;
    }

    // Now reformat the references section
    if (!referencesHeading.nextElementSibling) return;

    // Remove all elements after References heading
    currentElement = referencesHeading.nextElementSibling;
    const elementsToRemove = [];

    while (currentElement && currentElement.tagName !== "H2") {
      elementsToRemove.push(currentElement);
      currentElement = currentElement.nextElementSibling;
    }

    elementsToRemove.forEach(el => el.remove());

    // Create formatted reference list
    const refContainer = document.createElement("div");
    refContainer.className = "references-container";

    // Sort references by number
    const sortedRefs = Array.from(this.references.entries()).sort(
      (a, b) => parseInt(a[0]) - parseInt(b[0])
    );

    sortedRefs.forEach(([num, text]) => {
      const refItem = document.createElement("div");
      refItem.id = `ref-${num}`;
      refItem.className = "reference-item";
      refItem.innerHTML = `<span class="ref-number" data-ref="${num}">[${num}]</span><span class="ref-text">${text}</span>`;
      refContainer.appendChild(refItem);
    });

    referencesHeading.after(refContainer);
  }

  enhanceCitations() {
    // Find all citation markers like [1], [2], etc. in text
    const citPattern = /\[(\d+)\]/g;
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: node => {
          // Skip if in reference section or already processed
          if (
            node.parentElement?.classList.contains("ref-text") ||
            node.parentElement?.classList.contains("ref-number") ||
            node.parentElement?.closest("h2")?.textContent === "References"
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return citPattern.test(node.textContent)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        },
      }
    );

    const nodesToProcess = [];
    let node;
    while ((node = walker.nextNode())) {
      nodesToProcess.push(node);
    }

    nodesToProcess.forEach(node => {
      const parent = node.parentElement;
      const text = node.textContent;
      const parts = [];
      let lastIndex = 0;
      let match;

      citPattern.lastIndex = 0;
      while ((match = citPattern.exec(text)) !== null) {
        // Add text before citation
        if (match.index > lastIndex) {
          parts.push(
            document.createTextNode(text.substring(lastIndex, match.index))
          );
        }

        // Create citation link
        const num = match[1];
        const citId = `cite-${num}-${Math.random().toString(36).substr(2, 9)}`;
        const link = document.createElement("a");
        link.href = `#ref-${num}`;
        link.className = "citation-link";
        link.id = citId;
        link.dataset.ref = num;
        link.dataset.citId = citId;
        link.textContent = `[${num}]`;

        // Add tooltip on hover
        link.addEventListener("mouseenter", e => this.showTooltip(e, num));
        link.addEventListener("mouseleave", () => this.hideTooltip());

        parts.push(link);
        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        parts.push(document.createTextNode(text.substring(lastIndex)));
      }

      // Replace the text node with new nodes
      parts.forEach(part => parent.insertBefore(part, node));
      parent.removeChild(node);
    });
  }

  addBackLinks() {
    // Add "↩" back links to references
    document.querySelectorAll(".ref-number").forEach(refNum => {
      const num = refNum.dataset.ref;
      const citations = document.querySelectorAll(
        `.citation-link[data-ref="${num}"]`
      );

      if (citations.length > 0) {
        const backLinks = document.createElement("span");
        backLinks.className = "back-links";

        citations.forEach((cite, idx) => {
          const backLink = document.createElement("a");
          backLink.href = `#${cite.id}`;
          backLink.className = "back-link";
          backLink.textContent = "↩";
          backLink.title = `Jump back to citation ${idx + 1}`;
          backLinks.appendChild(backLink);
          if (idx < citations.length - 1) {
            backLinks.appendChild(document.createTextNode(" "));
          }
        });

        refNum.appendChild(document.createTextNode(" "));
        refNum.appendChild(backLinks);
      }
    });
  }

  createTooltip() {
    this.tooltip = document.createElement("div");
    this.tooltip.className = "citation-tooltip";
    this.tooltip.style.cssText = `
      position: fixed;
      background: var(--color-fill, #fff);
      border: 1px solid var(--color-border, #ddd);
      border-radius: 6px;
      padding: 12px 16px;
      max-width: 400px;
      font-size: 0.875rem;
      line-height: 1.5;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease;
    `;
    document.body.appendChild(this.tooltip);
  }

  showTooltip(event, refNum) {
    const refText = this.references.get(refNum);
    if (!refText) return;

    this.tooltip.textContent = refText;
    this.tooltip.style.opacity = "1";

    // Position tooltip
    const rect = event.target.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();

    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY + 8;

    // Keep tooltip on screen
    if (left + tooltipRect.width > window.innerWidth) {
      left = window.innerWidth - tooltipRect.width - 16;
    }
    if (top + tooltipRect.height > window.innerHeight + window.scrollY) {
      top = rect.top + window.scrollY - tooltipRect.height - 8;
    }

    this.tooltip.style.left = `${left}px`;
    this.tooltip.style.top = `${top}px`;
  }

  hideTooltip() {
    this.tooltip.style.opacity = "0";
  }
}

// Initialize
new CitationManager();
