import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.js';

export const PresetSelector = () => {
  const { presets, activePresetId, selectPreset } = useTheme();

  return (
    <div className="theme-section">
      <div className="theme-section-title">Design Presets</div>
      <p className="theme-section-desc">
        Select a curated color scheme. Presets coordinate background, surface, text, and accent tokens.
      </p>

      <div className="preset-grid">
        {Object.values(presets).map((preset) => {
          const isActive = preset.id === activePresetId;
          return (
            <button
              key={preset.id}
              type="button"
              className={`preset-card ${isActive ? 'active' : ''}`}
              onClick={() => selectPreset(preset.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  className="preset-swatch"
                  style={{ backgroundColor: preset.previewColor }}
                />
                {isActive && <Check size={16} color="var(--accent-color)" />}
              </div>
              <div className="preset-name">{preset.name}</div>
              <div className="preset-badge">{preset.type} theme</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PresetSelector;
