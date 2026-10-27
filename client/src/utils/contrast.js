/**
 * Utility functions for color manipulation and contrast compliance (WCAG 2.1).
 */

/**
 * Calculates whether black or white text provides higher contrast against a hex background.
 * @param {string} hex - Color hex code (e.g. #2563eb or #fff)
 * @returns {string} '#ffffff' or '#0f172a'
 */
export const getContrastTextColor = (hex) => {
  if (!hex) return '#ffffff';

  // Normalize hex string
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((char) => char + char).join('');
  }

  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;

  // Standard luminance formula
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? '#0f172a' : '#ffffff';
};

/**
 * Darkens or lightens a hex color slightly for hover states.
 */
export const adjustHexBrightness = (hex, percent) => {
  if (!hex) return hex;
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((char) => char + char).join('');
  }

  const num = parseInt(cleanHex, 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};
