import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color, meta }) => {
  return (
    <div className="card stat-card">
      <div
        className="stat-icon-wrapper"
        style={{
          backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
          color: color
        }}
      >
        {Icon && <Icon size={24} />}
      </div>
      <div className="stat-info">
        <h3>{title}</h3>
        <div className="stat-number">{value ?? '—'}</div>
        {meta && <div className="stat-meta">{meta}</div>}
      </div>
    </div>
  );
};

export default StatCard;
