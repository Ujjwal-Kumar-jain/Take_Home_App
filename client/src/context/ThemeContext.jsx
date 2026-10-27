import React, { createContext, useContext, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { PRESETS, DEFAULT_PRESET_ID } from '../styles/presets.js';
import {
  getStoredPreset,
  setStoredPreset,
  getStoredButtonColor,
  setStoredButtonColor,
  getStoredFont,
  setStoredFont
} from '../utils/storage.js';
import { loadAndApplyFont, resetToSystemFont, readFileAsBase64 } from '../utils/fontLoader.js';
import { getContrastTextColor, adjustHexBrightness } from '../utils/contrast.js';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Rehydrate initial state synchronously from localStorage
  const [activePresetId, setActivePresetId] = useState(() => getStoredPreset(DEFAULT_PRESET_ID));
  const [customButtonColor, setCustomButtonColor] = useState(() => getStoredButtonColor());
  const [uploadedFont, setUploadedFont] = useState(() => getStoredFont());
  const [isFontLoading, setIsFontLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activePreset = PRESETS[activePresetId] || PRESETS[DEFAULT_PRESET_ID];

  /**
   * Applies CSS variables for the current preset and button color override.
   */
  const applyVariables = useCallback(() => {
    const root = document.documentElement;

    // 1. Apply preset design tokens
    if (activePreset && activePreset.variables) {
      Object.entries(activePreset.variables).forEach(([prop, val]) => {
        root.style.setProperty(prop, val);
      });
    }

    // 2. Apply button color override if specified, otherwise sync with active preset accent
    if (customButtonColor) {
      root.style.setProperty('--btn-primary-bg', customButtonColor);
      root.style.setProperty('--btn-primary-hover', adjustHexBrightness(customButtonColor, -12));
      root.style.setProperty('--btn-primary-text', getContrastTextColor(customButtonColor));
    } else if (activePreset && activePreset.variables) {
      root.style.setProperty('--btn-primary-bg', activePreset.variables['--accent-color']);
      root.style.setProperty('--btn-primary-hover', activePreset.variables['--accent-hover']);
      root.style.setProperty('--btn-primary-text', activePreset.variables['--accent-contrast']);
    }
  }, [activePreset, customButtonColor]);

  // Synchronously apply variables before browser paint
  useLayoutEffect(() => {
    applyVariables();
  }, [applyVariables]);

  // Rehydrate custom font on mount and whenever uploadedFont state updates
  useEffect(() => {
    if (uploadedFont && uploadedFont.dataUrl) {
      setIsFontLoading(true);
      loadAndApplyFont(uploadedFont.dataUrl)
        .catch((err) => console.error('[Theme] Font load error:', err))
        .finally(() => setIsFontLoading(false));
    } else {
      resetToSystemFont();
    }
  }, [uploadedFont]);

  /**
   * Switches the active theme preset.
   */
  const selectPreset = (presetId) => {
    if (PRESETS[presetId]) {
      setActivePresetId(presetId);
      setStoredPreset(presetId);
    }
  };

  /**
   * Overrides the button/accent color independently of the selected preset.
   */
  const updateButtonColor = (colorHex) => {
    setCustomButtonColor(colorHex);
    setStoredButtonColor(colorHex);
  };

  /**
   * Resets button color back to active preset default.
   */
  const resetButtonColor = () => {
    setCustomButtonColor(null);
    setStoredButtonColor(null);
  };

  /**
   * Uploads, validates, registers via FontFace, and persists a custom font file.
   */
  const uploadCustomFont = async (file) => {
    if (!file) return { success: false, error: 'No file selected' };

    // File validation: format & size (< 2.5MB)
    const validExtensions = ['.ttf', '.otf', '.woff', '.woff2'];
    const fileName = file.name.toLowerCase();
    const isValidExt = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValidExt) {
      return {
        success: false,
        error: 'Please upload a valid font file (.ttf, .otf, .woff, or .woff2)'
      };
    }

    if (file.size > 2.5 * 1024 * 1024) {
      return {
        success: false,
        error: 'Font file size exceeds 2.5MB limit for safe local storage'
      };
    }

    setIsFontLoading(true);
    try {
      const dataUrl = await readFileAsBase64(file);
      const fontMeta = {
        name: file.name.replace(/\.[^/.]+$/, ''),
        fileName: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        dataUrl
      };

      await loadAndApplyFont(dataUrl);
      setUploadedFont(fontMeta);
      setStoredFont(fontMeta);

      return { success: true };
    } catch (err) {
      console.error('[Theme] Failed to process font upload:', err);
      return {
        success: false,
        error: 'Failed to process and register font'
      };
    } finally {
      setIsFontLoading(false);
    }
  };

  /**
   * Removes custom font and restores system default font.
   */
  const removeCustomFont = () => {
    setUploadedFont(null);
    setStoredFont(null);
    resetToSystemFont();
  };

  /**
   * Reset everything to factory defaults.
   */
  const resetAllTheme = () => {
    setActivePresetId(DEFAULT_PRESET_ID);
    setStoredPreset(DEFAULT_PRESET_ID);
    resetButtonColor();
    removeCustomFont();
  };

  const value = {
    presets: PRESETS,
    activePresetId,
    activePreset,
    customButtonColor,
    uploadedFont,
    isFontLoading,
    isDrawerOpen,
    setIsDrawerOpen,
    selectPreset,
    updateButtonColor,
    resetButtonColor,
    uploadCustomFont,
    removeCustomFont,
    resetAllTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
