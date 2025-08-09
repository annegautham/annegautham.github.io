/**
 * Color theme utilities for notes system
 * Supports both light and dark modes with predefined color palettes
 */

export type ColorTheme =
  | "red"
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "teal"
  | "pink"
  | "indigo";

interface ColorConfig {
  light: {
    bg: string;
    border: string;
    text: string;
    accent: string;
  };
  dark: {
    bg: string;
    border: string;
    text: string;
    accent: string;
  };
}

const colorThemes: Record<ColorTheme, ColorConfig> = {
  red: {
    light: {
      bg: "bg-red-200",
      border: "border-red-400",
      text: "text-black",
      accent: "text-red-800",
    },
    dark: {
      bg: "dark:bg-red-950/30",
      border: "dark:border-red-800/50",
      text: "dark:text-red-100",
      accent: "dark:text-red-400",
    },
  },
  blue: {
    light: {
      bg: "bg-blue-200",
      border: "border-blue-400",
      text: "text-black",
      accent: "text-blue-800",
    },
    dark: {
      bg: "dark:bg-blue-950/30",
      border: "dark:border-blue-800/50",
      text: "dark:text-blue-100",
      accent: "dark:text-blue-400",
    },
  },
  green: {
    light: {
      bg: "bg-green-200",
      border: "border-green-400",
      text: "text-black",
      accent: "text-green-800",
    },
    dark: {
      bg: "dark:bg-green-950/30",
      border: "dark:border-green-800/50",
      text: "dark:text-green-100",
      accent: "dark:text-green-400",
    },
  },
  purple: {
    light: {
      bg: "bg-purple-200",
      border: "border-purple-400",
      text: "text-black",
      accent: "text-purple-800",
    },
    dark: {
      bg: "dark:bg-purple-950/30",
      border: "dark:border-purple-800/50",
      text: "dark:text-purple-100",
      accent: "dark:text-purple-400",
    },
  },
  orange: {
    light: {
      bg: "bg-orange-200",
      border: "border-orange-400",
      text: "text-black",
      accent: "text-orange-800",
    },
    dark: {
      bg: "dark:bg-orange-950/30",
      border: "dark:border-orange-800/50",
      text: "dark:text-orange-100",
      accent: "dark:text-orange-400",
    },
  },
  teal: {
    light: {
      bg: "bg-teal-200",
      border: "border-teal-400",
      text: "text-black",
      accent: "text-teal-800",
    },
    dark: {
      bg: "dark:bg-teal-950/30",
      border: "dark:border-teal-800/50",
      text: "dark:text-teal-100",
      accent: "dark:text-teal-400",
    },
  },
  pink: {
    light: {
      bg: "bg-pink-200",
      border: "border-pink-400",
      text: "text-black",
      accent: "text-pink-800",
    },
    dark: {
      bg: "dark:bg-pink-950/30",
      border: "dark:border-pink-800/50",
      text: "dark:text-pink-100",
      accent: "dark:text-pink-400",
    },
  },
  indigo: {
    light: {
      bg: "bg-indigo-200",
      border: "border-indigo-400",
      text: "text-black",
      accent: "text-indigo-800",
    },
    dark: {
      bg: "dark:bg-indigo-950/30",
      border: "dark:border-indigo-800/50",
      text: "dark:text-indigo-100",
      accent: "dark:text-indigo-400",
    },
  },
};

/**
 * Get Tailwind CSS classes for a color theme - Light transparency with black text
 */
export function getColorClasses(color?: ColorTheme): string {
  if (!color) {
    return "bg-skin-card border-skin-line text-skin-base"; // Default theme
  }

  // Use transparency for light mode, solid for dark mode
  if (color === "purple") {
    return "bg-purple-200/60 border-purple-300 dark:bg-purple-950/30 dark:border-purple-800/50";
  }
  if (color === "blue") {
    return "bg-blue-200/60 border-blue-300 dark:bg-blue-950/30 dark:border-blue-800/50";
  }
  if (color === "red") {
    return "bg-red-200/60 border-red-300 dark:bg-red-950/30 dark:border-red-800/50";
  }
  if (color === "green") {
    return "bg-green-200/60 border-green-300 dark:bg-green-950/30 dark:border-green-800/50";
  }
  if (color === "orange") {
    return "bg-orange-200/60 border-orange-300 dark:bg-orange-950/30 dark:border-orange-800/50";
  }
  if (color === "teal") {
    return "bg-teal-200/60 border-teal-300 dark:bg-teal-950/30 dark:border-teal-800/50";
  }
  if (color === "pink") {
    return "bg-pink-200/60 border-pink-300 dark:bg-pink-950/30 dark:border-pink-800/50";
  }
  if (color === "indigo") {
    return "bg-indigo-200/60 border-indigo-300 dark:bg-indigo-950/30 dark:border-indigo-800/50";
  }

  // Fallback (should never reach here with current ColorTheme type)
  return "bg-skin-card border-skin-line text-skin-base";
}

/**
 * Get accent color classes for highlights, links, etc.
 */
export function getAccentClasses(color?: ColorTheme): string {
  if (!color) {
    return "text-skin-accent hover:text-skin-accent/80";
  }

  const theme = colorThemes[color];
  return [
    theme.light.accent,
    theme.dark.accent,
    `hover:${theme.light.accent}/80`,
    `dark:hover:${theme.dark.accent}/80`,
  ].join(" ");
}

/**
 * Get tag color classes
 */
export function getTagClasses(tag: string): string {
  // Assign colors based on tag content for consistency
  const tagColors: Record<string, ColorTheme> = {
    "self-studied": "green",
    northwestern: "purple",
    university: "blue",
    research: "orange",
    coursework: "indigo",
    personal: "pink",
    work: "teal",
    project: "red",
  };

  const normalizedTag = tag.toLowerCase().replace(/[\s-_]/g, "");

  // Find matching color or default to a hash-based color
  for (const [key, color] of Object.entries(tagColors)) {
    if (normalizedTag.includes(key.replace(/[\s-_]/g, ""))) {
      return getTagColorClasses(color);
    }
  }

  // Fallback: use hash to pick consistent color
  const colors: ColorTheme[] = [
    "blue",
    "green",
    "purple",
    "orange",
    "teal",
    "pink",
    "indigo",
  ];
  const hash = tag.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const color = colors[hash % colors.length];

  return getTagColorClasses(color);
}

function getTagColorClasses(color: ColorTheme): string {
  const theme = colorThemes[color];
  return [
    theme.light.bg,
    theme.dark.bg,
    theme.light.border,
    theme.dark.border,
    theme.light.accent,
    theme.dark.accent,
  ].join(" ");
}
