/**
 * Scroll-triggered equation animation utility
 * Add this to any page with equations you want to animate
 */

class ScrollTriggeredDerivations {
  constructor() {
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
    this.createObserver();
    this.setupEquations();
  }

  createObserver() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateEquation(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-10% 0px -20% 0px",
      }
    );
  }

  setupEquations() {
    // Find all equations and wrap them for animation
    const equations = document.querySelectorAll(
      "mjx-container, .math-display, .katex-display"
    );

    equations.forEach((eq, index) => {
      if (!eq.closest(".animated-equation")) {
        this.wrapEquation(eq, index);
      }
    });
  }

  wrapEquation(equation, index) {
    // Create wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "animated-equation";
    wrapper.style.cssText = `
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      transition-delay: ${index * 0.1}s;
    `;

    // Wrap the equation
    equation.parentNode.insertBefore(wrapper, equation);
    wrapper.appendChild(equation);

    // Observe for animation
    this.observer.observe(wrapper);
  }

  animateEquation(wrapper) {
    // Animate in
    wrapper.style.opacity = "1";
    wrapper.style.transform = "translateY(0)";

    // Add highlight effect
    setTimeout(() => {
      const equation = wrapper.querySelector(
        "mjx-container, .math-display, .katex-display"
      );
      if (equation) {
        equation.style.filter = "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))";
        setTimeout(() => {
          equation.style.filter = "none";
        }, 1000);
      }
    }, 400);

    // Unobserve to prevent re-triggering
    this.observer.unobserve(wrapper);
  }

  // Manual trigger for testing
  animateAll() {
    const equations = document.querySelectorAll(".animated-equation");
    equations.forEach((eq, index) => {
      setTimeout(() => {
        this.animateEquation(eq);
      }, index * 200);
    });
  }
}

// Auto-initialize
const scrollDerivations = new ScrollTriggeredDerivations();

// Expose for debugging
window.scrollDerivations = scrollDerivations;

// Add some CSS for better equation styling
const style = document.createElement("style");
style.textContent = `
  .animated-equation {
    margin: 1.5rem 0;
    padding: 1rem;
    border-left: 3px solid transparent;
    transition: border-color 0.3s ease;
  }

  .animated-equation:hover {
    border-left-color: rgb(59, 130, 246);
    background: rgba(59, 130, 246, 0.05);
  }

  /* Enhanced math styling */
  mjx-container {
    margin: 0.5rem 0 !important;
  }

  .math-display {
    text-align: center;
    margin: 1rem 0;
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .animated-equation:hover {
      background: rgba(59, 130, 246, 0.1);
    }
  }
`;
document.head.appendChild(style);
