import React, { useRef, useState } from 'react';
import { Upload, Type, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.js';

export const FontUploader = () => {
  const { uploadedFont, isFontLoading, uploadCustomFont, removeCustomFont } = useTheme();
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage('');
    setSuccessMessage('');

    const res = await uploadCustomFont(file);
    if (!res.success) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage(`Font '${file.name}' loaded and applied!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }

    // Reset input so same file can be re-uploaded if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="theme-section">
      <div className="theme-section-title">Custom Font Face</div>
      <p className="theme-section-desc">
        Upload a font file (<strong>.ttf</strong>, <strong>.otf</strong>, or <strong>.woff</strong>). Applied app-wide via the browser FontFace API and persisted in local storage.
      </p>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".ttf,.otf,.woff,.woff2"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Upload Dropzone / Trigger */}
      <div
        className="font-dropzone"
        onClick={() => fileInputRef.current?.click()}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
          <div
            style={{
              padding: '0.5rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--accent-subtle)',
              color: 'var(--accent-color)'
            }}
          >
            <Upload size={18} />
          </div>
          <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>
            {isFontLoading ? 'Registering FontFace...' : 'Click to upload font'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Supports TTF, OTF, WOFF (Max 2.5MB)
          </div>
        </div>
      </div>

      {/* Error or Success notification */}
      {errorMessage && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontSize: '0.75rem', marginTop: '0.4rem' }}>
          <AlertCircle size={14} />
          <span>{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.75rem', marginTop: '0.4rem' }}>
          <CheckCircle2 size={14} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Active Font Card */}
      {uploadedFont ? (
        <div className="font-active-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Type size={18} color="var(--accent-color)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                {uploadedFont.name}
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                {uploadedFont.size} • Active Typeface
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn-icon"
            onClick={removeCustomFont}
            title="Reset to system font"
            style={{ color: '#ef4444' }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ) : (
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.25rem' }}>
          Default system font stack active.
        </div>
      )}

      {/* Live Sample Preview */}
      <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
          Font Preview:
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
          The quick brown fox jumps over the lazy dog. 0123456789
        </div>
      </div>
    </div>
  );
};

export default FontUploader;
