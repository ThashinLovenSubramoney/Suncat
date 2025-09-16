// src/theme.js
const THEME_KEY = 'suncat:theme'; // 'vivid' or 'muted'

function apply(theme) {
  const body = document.body;
  body.classList.toggle('theme-vivid', theme === 'vivid');
  body.classList.toggle('theme-muted', theme !== 'vivid');
}

export function initThemeFromStorage() {
  const saved = localStorage.getItem(THEME_KEY);
  const theme = saved === 'vivid' ? 'vivid' : 'muted';
  apply(theme);
}

export function setUnlocked(on = true) {
  const theme = on ? 'vivid' : 'muted';
  localStorage.setItem(THEME_KEY, theme);
  apply(theme);
}
