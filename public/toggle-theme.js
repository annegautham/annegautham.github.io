const primaryColorScheme = ""; // "light" | "dark"

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

function getPreferTheme() {
  // return theme value in local storage if it is set
  if (currentTheme) return currentTheme;

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme;

  // return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

let themeValue = getPreferTheme();

function setPreference() {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
}

function reflectPreference() {
  document.firstElementChild.setAttribute("data-theme", themeValue);

  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);

  // Get a reference to the body element
  const body = document.body;

  // Check if the body element exists before using getComputedStyle
  if (body) {
    // Get the computed styles for the body element
    const computedStyles = window.getComputedStyle(body);

    // Get the background color property
    const bgColor = computedStyles.backgroundColor;

    // Set the background color in <meta theme-color ... />
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
}

// set early so no page flashes / CSS is made aware
// Apply saved theme immediately on script load
const initialTheme = localStorage.getItem("theme");
if (initialTheme) {
  themeValue = initialTheme;
  // Set theme attribute immediately to prevent flash
  document.documentElement.setAttribute("data-theme", themeValue);
}
reflectPreference();

function setThemeFeature() {
  // set on load so screen readers can get the latest value on the button
  reflectPreference();

  // now this script can find and listen for clicks on the control
  document.querySelector("#theme-btn")?.addEventListener("click", () => {
    themeValue = themeValue === "light" ? "dark" : "light";
    setPreference();
  });
}

// Initialize immediately
setThemeFeature();

// Re-initialize on window load
window.addEventListener("load", setThemeFeature);

// Apply theme as early as possible to prevent flash
document.addEventListener("astro:before-preparation", () => {
  // Read theme from localStorage and set it immediately
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    themeValue = savedTheme;
    // Set the data-theme attribute on the HTML element immediately
    document.documentElement.setAttribute("data-theme", themeValue);
  }
});

// Apply theme BEFORE page swap to prevent flash
document.addEventListener("astro:page-load", () => {
  // Read theme from localStorage and apply immediately
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    themeValue = savedTheme;
    // Apply theme immediately without waiting for DOM
    reflectPreference();
  }
});

// Runs on view transitions navigation (after swap)
document.addEventListener("astro:after-swap", () => {
  // Re-initialize theme functionality after DOM swap
  setThemeFeature();
});

// Also handle before swap to preserve theme
document.addEventListener("astro:before-swap", () => {
  // Ensure theme is saved before page transition
  localStorage.setItem("theme", themeValue);
});

// Initialize on DOMContentLoaded as well for better compatibility
document.addEventListener("DOMContentLoaded", setThemeFeature);

// Handle page visibility changes (when user returns to tab)
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && savedTheme !== themeValue) {
      themeValue = savedTheme;
      reflectPreference();
    }
  }
});

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
