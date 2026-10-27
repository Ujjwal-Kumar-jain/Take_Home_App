/**
 * Safe localStorage wrapper with JSON parsing and fallback.
 */

const STORAGE_KEYS = {
  PRESET: 'um_theme_preset',
  BUTTON_COLOR: 'um_theme_btn_color',
  CUSTOM_FONT: 'um_theme_font'
};

export const getStoredPreset = (defaultPreset) => {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.PRESET);
    return val || defaultPreset;
  } catch (e) {
    console.warn('[Storage] Could not read preset from localStorage:', e);
    return defaultPreset;
  }
};

export const setStoredPreset = (presetId) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRESET, presetId);
  } catch (e) {
    console.warn('[Storage] Could not save preset to localStorage:', e);
  }
};

export const getStoredButtonColor = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.BUTTON_COLOR) || null;
  } catch (e) {
    console.warn('[Storage] Could not read button color from localStorage:', e);
    return null;
  }
};

export const setStoredButtonColor = (color) => {
  try {
    if (color) {
      localStorage.setItem(STORAGE_KEYS.BUTTON_COLOR, color);
    } else {
      localStorage.removeItem(STORAGE_KEYS.BUTTON_COLOR);
    }
  } catch (e) {
    console.warn('[Storage] Could not save button color to localStorage:', e);
  }
};

export const getStoredFont = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_FONT);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('[Storage] Could not read custom font from localStorage:', e);
    return null;
  }
};

export const setStoredFont = (fontData) => {
  try {
    if (fontData) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_FONT, JSON.stringify(fontData));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_FONT);
    }
  } catch (e) {
    console.warn('[Storage] Could not save font to localStorage (may exceed quota):', e);
  }
};
