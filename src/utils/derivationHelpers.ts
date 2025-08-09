/**
 * Utility functions for creating animated derivations
 */

export interface DerivationStep {
  equation: string;
  explanation?: string;
  highlight?: string[];
}

export interface DerivationConfig {
  title: string;
  steps: string[];
  className?: string;
}

/**
 * Format a step with equation and optional explanation
 */
export function formatStep(equation: string, explanation?: string): string {
  let html = `<div class="equation-wrapper">$$${equation}$$</div>`;

  if (explanation) {
    html += `<div class="step-explanation text-sm text-skin-muted mt-2 italic">${explanation}</div>`;
  }

  return html;
}

/**
 * Create a derivation from a simple array of equations
 */
export function createSimpleDerivation(
  title: string,
  equations: string[],
  explanations?: string[]
): DerivationConfig {
  const steps = equations.map((eq, index) =>
    formatStep(eq, explanations?.[index])
  );

  return {
    title,
    steps,
  };
}

/**
 * Physics-specific derivation helpers
 */
export const PhysicsDerivations = {
  /**
   * Drude conductivity derivation
   */
  drudeDerivation(): DerivationConfig {
    return createSimpleDerivation(
      "Deriving Drude Conductivity",
      [
        "\\mathbf{j} = -ne \\mathbf{v}",
        "\\mathbf{v}_{\\text{avg}} = -\\frac{e \\tau}{m} \\mathbf{E}",
        "\\mathbf{j} = -ne \\left(-\\frac{e \\tau}{m} \\mathbf{E}\\right)",
        "\\mathbf{j} = \\frac{ne^2 \\tau}{m} \\mathbf{E}",
        "\\sigma = \\frac{ne^2 \\tau}{m}",
      ],
      [
        "Current density from electron motion",
        "Average drift velocity in electric field",
        "Substitute drift velocity into current",
        "Simplify the expression",
        "Define conductivity σ",
      ]
    );
  },

  /**
   * Hall effect derivation
   */
  hallEffectDerivation(): DerivationConfig {
    return createSimpleDerivation(
      "Hall Effect Analysis",
      [
        "\\mathbf{F} = -\\frac{e}{c} \\mathbf{v} \\times \\mathbf{H}",
        "\\frac{d\\mathbf{p}}{dt} = -e\\mathbf{E} - \\frac{e}{c} \\mathbf{v} \\times \\mathbf{H} - \\frac{\\mathbf{p}}{\\tau}",
        "0 = -eE_x - \\omega_c p_y - \\frac{p_x}{\\tau}",
        "0 = -eE_y + \\omega_c p_x - \\frac{p_y}{\\tau}",
        "R_H = \\frac{E_y}{j_x H} = -\\frac{1}{nec}",
      ],
      [
        "Lorentz force on moving electrons",
        "Newton's second law with all forces",
        "x-component in steady state",
        "y-component in steady state",
        "Hall coefficient from transverse field",
      ]
    );
  },

  /**
   * Plasma frequency derivation
   */
  plasmaFrequencyDerivation(): DerivationConfig {
    return createSimpleDerivation(
      "Plasma Frequency Derivation",
      [
        "\\nabla \\cdot \\mathbf{E} = 4\\pi \\rho",
        "\\mathbf{j} = \\sigma(\\omega) \\mathbf{E}",
        "\\nabla \\cdot \\mathbf{j} = i\\omega \\rho",
        "\\epsilon(\\omega) = 1 + \\frac{4\\pi i \\sigma}{\\omega}",
        "\\epsilon(\\omega) = 1 - \\frac{\\omega_p^2}{\\omega^2}",
        "\\omega_p^2 = \\frac{4\\pi ne^2}{m}",
      ],
      [
        "Gauss's law",
        "Ohm's law with frequency dependence",
        "Continuity equation",
        "Complex dielectric function",
        "High frequency limit",
        "Plasma frequency definition",
      ]
    );
  },
};

/**
 * Math expression helpers
 */
export const MathHelpers = {
  /**
   * Wrap equation in display math
   */
  displayMath(equation: string): string {
    return `$$${equation}$$`;
  },

  /**
   * Wrap equation in inline math
   */
  inlineMath(equation: string): string {
    return `$${equation}$`;
  },

  /**
   * Create aligned equations
   */
  alignedEquations(equations: string[]): string {
    const aligned = equations.map(eq => eq.replace(/=/g, "&=")).join(" \\\\\n");
    return `$$\\begin{aligned}\n${aligned}\n\\end{aligned}$$`;
  },
};
