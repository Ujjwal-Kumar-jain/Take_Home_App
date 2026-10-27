import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

const ROLES = ['All', 'Admin', 'Manager', 'Developer', 'Designer'];
const STATUSES = ['All', 'Active', 'Inactive', 'Pending'];

export const FilterBar = ({ filters, onFilterChange, onResetFilters }) => {
  const isFiltered = filters.search || filters.role !== 'All' || filters.status !== 'All';

  return (
    <div className="filter-bar">
      {/* Search Input */}
      <div className="search-input-wrapper">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="form-input search-input"
          placeholder="Search by name, email, department..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>

      {/* Role and Status dropdowns */}
      <div className="filter-group">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Role:</span>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.5rem 0.75rem' }}
            value={filters.role}
            onChange={(e) => onFilterChange('role', e.target.value)}
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r === 'All' ? 'All Roles' : r}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status:</span>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.5rem 0.75rem' }}
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Statuses' : s}
              </option>
            ))}
          </select>
        </div>

        {isFiltered && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onResetFilters}
            title="Reset filters"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
