import React, { useEffect } from 'react';
import { X, Sparkles, RefreshCw } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.js';
import PresetSelector from './PresetSelector.jsx';
import ButtonColorPicker from './ButtonColorPicker.jsx';
import FontUploader from './FontUploader.jsx';
import Button from '../common/Button.jsx';

export const ThemeDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen, resetAllTheme } = useTheme();

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, setIsDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={() => setIsDrawerOpen(false)} />
      <aside className="theme-drawer" role="dialog" aria-label="Custom Theming Engine">
        {/* Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="var(--accent-color)" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Theme Studio</h2>
          </div>
          <button
            type="button"
            className="btn-icon"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close theme studio"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="drawer-content">
          <PresetSelector />
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
          <ButtonColorPicker />
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
          <FontUploader />
        </div>

        {/* Footer Reset */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={resetAllTheme}
            icon={RefreshCw}
          >
            Reset All
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsDrawerOpen(false)}
          >
            Done
          </Button>
        </div>
      </aside>
    </>
  );
};

export default ThemeDrawer;
