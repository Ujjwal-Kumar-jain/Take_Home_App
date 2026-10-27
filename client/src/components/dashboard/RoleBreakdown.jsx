import React from 'react';
import Badge from '../common/Badge.jsx';

export const RoleBreakdown = ({ roleBreakdown = {}, totalUsers = 0, activeUsers = 0, inactiveUsers = 0 }) => {
  const roles = [
    { name: 'Developer', count: roleBreakdown.Developer || 0, color: '#3b82f6' },
    { name: 'Designer', count: roleBreakdown.Designer || 0, color: '#ec4899' },
    { name: 'Manager', count: roleBreakdown.Manager || 0, color: '#8b5cf6' },
    { name: 'Admin', count: roleBreakdown.Admin || 0, color: '#f59e0b' }
  ];

  const activePercent = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
      {/* Role Distribution Card */}
      <div className="card">
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Role Distribution</h3>
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Breakdown of staff roles across all departments
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {roles.map((r) => {
            const pct = totalUsers > 0 ? Math.round((r.count / totalUsers) * 100) : 0;
            return (
              <div key={r.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{r.name}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    <strong>{r.count}</strong> ({pct}%)
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      backgroundColor: r.color,
                      borderRadius: '4px',
                      transition: 'width 0.4s ease'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Account Health / Status Ratio */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Account Health & Activity</h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Current activity status across the organization
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
              {activePercent}%
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              of total accounts are currently <Badge type="status" value="Active" />
            </div>
          </div>

          {/* Ratio bar */}
          <div style={{ height: '12px', display: 'flex', borderRadius: '6px', overflow: 'hidden', marginBottom: '1.25rem' }}>
            <div
              style={{
                width: `${activePercent}%`,
                backgroundColor: '#10b981',
                transition: 'width 0.4s ease'
              }}
              title={`Active: ${activeUsers}`}
            />
            <div
              style={{
                width: `${100 - activePercent}%`,
                backgroundColor: '#94a3b8',
                transition: 'width 0.4s ease'
              }}
              title={`Inactive/Pending: ${totalUsers - activeUsers}`}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              Active: <strong>{activeUsers}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#94a3b8' }} />
              Inactive / Pending: <strong>{totalUsers - activeUsers}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleBreakdown;
