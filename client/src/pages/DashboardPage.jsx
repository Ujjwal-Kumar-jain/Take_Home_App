import React from 'react';
import { Users, UserCheck, UserX, UserPlus, Sparkles, ArrowRight, Clock } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard.jsx';
import RoleBreakdown from '../components/dashboard/RoleBreakdown.jsx';
import Badge from '../components/common/Badge.jsx';
import Button from '../components/common/Button.jsx';
import { useTheme } from '../hooks/useTheme.js';

export const DashboardPage = ({ stats, isStatsLoading, onNavigateToUsers, onOpenCreateModal }) => {
  const { setIsDrawerOpen } = useTheme();

  return (
    <div>
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div>
          <h1 style={{ marginBottom: '0.35rem' }}>Executive Dashboard</h1>
          <p>Real-time analytics and user directory overview persisted in MongoDB.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Button
            variant="secondary"
            onClick={() => setIsDrawerOpen(true)}
            icon={Sparkles}
          >
            Customize Theme
          </Button>

          <Button
            variant="primary"
            onClick={onOpenCreateModal}
            icon={UserPlus}
          >
            Add New User
          </Button>
        </div>
      </div>

      {/* 4 Key Metric Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Registered Users"
          value={stats?.totalUsers}
          icon={Users}
          color="#3b82f6"
          meta="Synchronized with MongoDB"
        />

        <StatCard
          title="Active Accounts"
          value={stats?.activeUsers}
          icon={UserCheck}
          color="#10b981"
          meta="Operational team members"
        />

        <StatCard
          title="Inactive / Pending"
          value={(stats?.inactiveUsers || 0) + (stats?.pendingUsers || 0)}
          icon={UserX}
          color="#f59e0b"
          meta="Requires verification or archived"
        />

        <StatCard
          title="New This Week"
          value={stats?.newThisWeek}
          icon={Clock}
          color="#8b5cf6"
          meta="Registered in last 7 days"
        />
      </div>

      {/* Role and Status Distribution */}
      <div style={{ marginBottom: '2rem' }}>
        <RoleBreakdown
          roleBreakdown={stats?.roleBreakdown}
          totalUsers={stats?.totalUsers}
          activeUsers={stats?.activeUsers}
          inactiveUsers={stats?.inactiveUsers}
        />
      </div>

      {/* Recent Activity List */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Recent Registrations</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Latest team members onboarded into the system</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onNavigateToUsers}
            icon={ArrowRight}
          >
            View All Users
          </Button>
        </div>

        {stats?.recentUsers && stats.recentUsers.length > 0 ? (
          <div className="table-container" style={{ border: 'none', boxShadow: 'none' }}>
            <table className="user-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-avatar-cell">
                        <div className="user-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="user-name-title">{user.name}</div>
                          <div className="user-email-subtitle">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge type="role" value={user.role} />
                    </td>
                    <td>{user.department}</td>
                    <td>
                      <Badge type="status" value={user.status} />
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            No users registered yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
