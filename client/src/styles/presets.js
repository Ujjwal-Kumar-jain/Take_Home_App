/**
 * Design Presets for the Theming Engine
 * Each preset coordinates colors, surfaces, borders, and shadows into a cohesive aesthetic.
 */
export const PRESETS = {
  blue: {
    id: 'blue',
    name: 'Oceanic Blue',
    description: 'Clean, professional light mode with high-contrast sapphire accents.',
    type: 'light',
    previewColor: '#2563eb',
    variables: {
      '--bg-primary': '#f8fafc',
      '--bg-surface': '#ffffff',
      '--bg-surface-elevated': '#ffffff',
      '--bg-subtle': '#f1f5f9',
      '--bg-hover': '#e2e8f0',

      '--text-primary': '#0f172a',
      '--text-secondary': '#475569',
      '--text-muted': '#94a3b8',

      '--border-color': '#e2e8f0',
      '--border-focus': '#2563eb',

      '--accent-color': '#2563eb',
      '--accent-hover': '#1d4ed8',
      '--accent-contrast': '#ffffff',
      '--accent-subtle': '#eff6ff',

      '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.07)',
      '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      '--shadow-drawer': '-4px 0 24px rgba(0, 0, 0, 0.15)'
    }
  },

  violet: {
    id: 'violet',
    name: 'Neon Violet',
    description: 'Deep modern dark theme with vivid purple accents and rich elevation.',
    type: 'dark',
    previewColor: '#8b5cf6',
    variables: {
      '--bg-primary': '#0e0c15',
      '--bg-surface': '#181524',
      '--bg-surface-elevated': '#221d33',
      '--bg-subtle': '#252038',
      '--bg-hover': '#322b4a',

      '--text-primary': '#f5f3ff',
      '--text-secondary': '#c4b5fd',
      '--text-muted': '#7c6fa0',

      '--border-color': '#2e2646',
      '--border-focus': '#a78bfa',

      '--accent-color': '#8b5cf6',
      '--accent-hover': '#7c3aed',
      '--accent-contrast': '#ffffff',
      '--accent-subtle': '#261b42',

      '--shadow-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.4)',
      '--shadow-md': '0 4px 8px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
      '--shadow-lg': '0 12px 20px -3px rgba(0, 0, 0, 0.6), 0 4px 8px -4px rgba(0, 0, 0, 0.5)',
      '--shadow-drawer': '-4px 0 28px rgba(0, 0, 0, 0.6)'
    }
  },

  darcula: {
    id: 'darcula',
    name: 'Darcula Slate',
    description: 'Developer favorite: warm charcoal surfaces with crisp amber & cyan details.',
    type: 'dark',
    previewColor: '#f59e0b',
    variables: {
      '--bg-primary': '#1e1f22',
      '--bg-surface': '#2b2d30',
      '--bg-surface-elevated': '#333538',
      '--bg-subtle': '#393b40',
      '--bg-hover': '#43454a',

      '--text-primary': '#dfe1e5',
      '--text-secondary': '#adb0b8',
      '--text-muted': '#6f737a',

      '--border-color': '#3e4147',
      '--border-focus': '#f59e0b',

      '--accent-color': '#f59e0b',
      '--accent-hover': '#d97706',
      '--accent-contrast': '#1e1f22',
      '--accent-subtle': '#3b2f15',

      '--shadow-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.45)',
      '--shadow-md': '0 4px 8px -1px rgba(0, 0, 0, 0.55)',
      '--shadow-lg': '0 12px 20px -3px rgba(0, 0, 0, 0.65)',
      '--shadow-drawer': '-4px 0 30px rgba(0, 0, 0, 0.7)'
    }
  },

  emerald: {
    id: 'emerald',
    name: 'Emerald Forest',
    description: 'Refreshing organic light palette with soft sage cards and vibrant pine green.',
    type: 'light',
    previewColor: '#059669',
    variables: {
      '--bg-primary': '#f0fdf4',
      '--bg-surface': '#ffffff',
      '--bg-surface-elevated': '#ffffff',
      '--bg-subtle': '#dcfce7',
      '--bg-hover': '#bbf7d0',

      '--text-primary': '#064e3b',
      '--text-secondary': '#047857',
      '--text-muted': '#6ee7b7',

      '--border-color': '#bbf7d0',
      '--border-focus': '#059669',

      '--accent-color': '#059669',
      '--accent-hover': '#047857',
      '--accent-contrast': '#ffffff',
      '--accent-subtle': '#ecfdf5',

      '--shadow-sm': '0 1px 2px 0 rgba(5, 150, 105, 0.08)',
      '--shadow-md': '0 4px 6px -1px rgba(5, 150, 105, 0.1)',
      '--shadow-lg': '0 10px 15px -3px rgba(5, 150, 105, 0.12)',
      '--shadow-drawer': '-4px 0 24px rgba(6, 78, 59, 0.15)'
    }
  }
};

export const DEFAULT_PRESET_ID = 'blue';
