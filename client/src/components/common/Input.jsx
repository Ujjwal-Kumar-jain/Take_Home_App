import React from 'react';

/**
 * Reusable Form Input / Select field with clean error feedback.
 */
export const Input = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  options = [],
  as = 'input',
  fullWidth = false,
  helperText
}) => {
  const inputId = id || name;

  return (
    <div className={`form-group ${fullWidth ? 'form-group-full' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </label>
      )}

      {as === 'select' ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-select ${error ? 'error' : ''}`}
        >
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const text = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {text}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-input ${error ? 'error' : ''}`}
        />
      )}

      {error && <span className="form-error">{error}</span>}
      {!error && helperText && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{helperText}</span>
      )}
    </div>
  );
};

export default Input;
