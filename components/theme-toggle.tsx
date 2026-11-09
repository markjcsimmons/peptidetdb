"use client";

/**
 * Switches between light and dark and remembers the choice in localStorage. Until someone clicks, the
 * site follows the system setting. The icon is chosen by CSS (see .theme-sun / .theme-moon), so there
 * is no flash and no hydration mismatch.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const explicit = root.dataset.theme;
    const dark = explicit ? explicit === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = dark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice just will not persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark theme"
      title="Toggle dark theme"
      className="inline-flex h-11 w-11 items-center justify-center rounded-tile text-muted hover:text-fg"
    >
      <svg className="theme-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className="theme-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
