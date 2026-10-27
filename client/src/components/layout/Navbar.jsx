import React from 'react';
import { Users, LayoutDashboard, Palette, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.js';
import Button from '../common/Button.jsx';

export const Navbar = ({ activeTab, onTabChange }) => {
  const { setIsDrawerOpen, activePreset } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="brand" onClick={() => onTabChange('dashboard')}>
          <div className="brand-icon">
            <Users size={20} />
          </div>
          <div>
            <div style={{ lineHeight: 1.1 }}>UserHub</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 400 }}>
              Management & Theming Engine
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-links">
          <button
            type="button"
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onTabChange('dashboard')}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </button>
          <button
            type="button"
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => onTabChange('users')}
          >
            <Users size={16} />
            <span>Users Listing</span>
          </button>
        </nav>

        {/* Theming Engine Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsDrawerOpen(true)}
            icon={Palette}
          >
            <span>Theme: <strong>{activePreset.name}</strong></span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
