import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.js';
import Button from '../common/Button.jsx';

const POPULAR_SWATCHES = [
  '#2563eb', // Sapphire Blue
  '#8b5cf6', // Electric Violet
  '#059669', // Emerald
  '#e11d48', // Rose / Crimson
  '#f59e0b', // Amber
  '#0891b2', // Cyan
  '#4f46e5', // Indigo
  '#111827'  // Jet Black
];

export const ButtonColorPicker = () => {
  const {
    customButtonColor,
    activePreset,
    updateButtonColor,
    resetButtonColor
  } = useTheme();

  // Current effective button color
  const effectiveColor = customButtonColor || activePreset.variables['--accent-color'];

  return (
    <div className="theme-section">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="theme-section-title">Button Accent Color</div>
        {customButtonColor && (
          <button
            type="button"
            onClick={resetButtonColor}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <RotateCcw size={12} /> Reset to Preset
          </button>
        )}
      </div>

      <p className="theme-section-desc">
        Independently override the button color across the entire application. Contrast text is dynamically computed.
      </p>

      {/* Color picker row */}
      <div className="color-picker-row">
        <input
          type="color"
          className="color-input-native"
          value={effectiveColor}
          onChange={(e) => updateButtonColor(e.target.value)}
          title="Pick custom button color"
        />

        <div style={{ flex: 1 }}>
          <input
            type="text"
            className="form-input"
            style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}
            value={effectiveColor}
            onChange={(e) => {
              const val = e.target.value;
              if (val.startsWith('#') && (val.length === 4 || val.length === 7)) {
                updateButtonColor(val);
              }
            }}
            placeholder="#2563eb"
          />
        </div>
      </div>

      {/* Quick Swatches */}
      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          Quick Swatches:
        </div>
        <div className="swatches-grid">
          {POPULAR_SWATCHES.map((swatch) => (
            <button
              key={swatch}
              type="button"
              className={`swatch-btn ${effectiveColor.toLowerCase() === swatch.toLowerCase() ? 'active' : ''}`}
              style={{ backgroundColor: swatch }}
              onClick={() => updateButtonColor(swatch)}
              title={swatch}
            />
          ))}
        </div>
      </div>

      {/* Live Preview Button */}
      <div style={{ marginTop: '0.5rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          Live Button Preview:
        </div>
        <Button variant="primary" style={{ width: '100%' }}>
          Primary Button Sample
        </Button>
      </div>
    </div>
  );
};

export default ButtonColorPicker;
