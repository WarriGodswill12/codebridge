export interface PageTheme {
  background: string;
  foreground: string;
  muted: string;
}

/**
 * Named global page themes. The scroll controller interpolates between
 * these when a section boundary triggers a transition. Add a new theme
 * here (and a boundary in scroll-theme-controller.tsx) to introduce
 * another global state later — this is not special-cased for "dark".
 */
export const themes: Record<string, PageTheme> = {
  light: { background: "#f6f5ef", foreground: "#000000", muted: "#56544a" },
  yellow: { background: "#ffd000", foreground: "#000000", muted: "#4a3d00" },
  dark: { background: "#000000", foreground: "#ffffff", muted: "#a3a08f" },
};
