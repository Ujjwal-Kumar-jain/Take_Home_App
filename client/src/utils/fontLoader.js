/**
 * Native Font Loading API helper (FontFace).
 * Dynamically loads and registers user-uploaded web fonts (.ttf, .otf, .woff, .woff2)
 * into the browser document and binds them to the --font-family CSS variable.
 */

const SYSTEM_FONT_STACK = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const CUSTOM_FONT_FAMILY = 'UserUploadedFont';

// Keep track of registered FontFace so we can replace it cleanly
let activeFontFace = null;

/**
 * Loads a font from a base64 data URL using the browser FontFace API.
 * @param {string} base64DataUrl - Data URL containing base64 font bytes
 * @returns {Promise<boolean>}
 */
export const loadAndApplyFont = async (base64DataUrl) => {
  if (!base64DataUrl) {
    resetToSystemFont();
    return false;
  }

  try {
    // If FontFace API is supported by the browser
    if ('fonts' in document && typeof FontFace !== 'undefined') {
      const newFace = new FontFace(CUSTOM_FONT_FAMILY, `url("${base64DataUrl}")`, {
        style: 'normal',
        weight: 'normal'
      });

      const loadedFace = await newFace.load();

      // Remove previously injected custom face if present
      if (activeFontFace) {
        document.fonts.delete(activeFontFace);
      }

      document.fonts.add(loadedFace);
      activeFontFace = loadedFace;

      // Apply to :root custom property
      document.documentElement.style.setProperty(
        '--font-family',
        `'${CUSTOM_FONT_FAMILY}', ${SYSTEM_FONT_STACK}`
      );

      return true;
    } else {
      // Fallback for environments lacking FontFace API via dynamic @font-face style tag
      let styleTag = document.getElementById('custom-uploaded-font-style');
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'custom-uploaded-font-style';
        document.head.appendChild(styleTag);
      }
      styleTag.textContent = `
        @font-face {
          font-family: '${CUSTOM_FONT_FAMILY}';
          src: url("${base64DataUrl}");
        }
      `;
      document.documentElement.style.setProperty(
        '--font-family',
        `'${CUSTOM_FONT_FAMILY}', ${SYSTEM_FONT_STACK}`
      );
      return true;
    }
  } catch (error) {
    console.error('[FontLoader] Failed to load font via FontFace API:', error);
    resetToSystemFont();
    return false;
  }
};

/**
 * Resets the active typeface back to standard system font stack.
 */
export const resetToSystemFont = () => {
  if (activeFontFace && 'fonts' in document) {
    document.fonts.delete(activeFontFace);
    activeFontFace = null;
  }

  const fallbackStyle = document.getElementById('custom-uploaded-font-style');
  if (fallbackStyle) {
    fallbackStyle.remove();
  }

  document.documentElement.style.setProperty('--font-family', SYSTEM_FONT_STACK);
};

/**
 * Reads a File object and converts it to a base64 Data URL.
 * @param {File} file
 * @returns {Promise<string>}
 */
export const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
