import React from 'react';

/**
 * Reusable Badge component for roles and statuses.
 */
export const Badge = ({ type = 'status', value }) => {
  if (!value) return null;

  if (type === 'status') {
    const statusKey = value.toLowerCase();
    const statusClass = `badge-${statusKey}`;
    return (
      <span className={`badge ${statusClass}`}>
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }}
        />
        {value}
      </span>
    );
  }

  // Role badge
  return <span className="badge badge-role">{value}</span>;
};

export default Badge;
