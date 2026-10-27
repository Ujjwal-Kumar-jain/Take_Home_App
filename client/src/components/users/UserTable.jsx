import React from 'react';
import { Eye, Edit2, Trash2, UserPlus, Users } from 'lucide-react';
import Badge from '../common/Badge.jsx';
import Button from '../common/Button.jsx';

export const UserTable = ({
  users = [],
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  onOpenCreateModal
}) => {
  if (isLoading) {
    return (
      <div className="table-container" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Loading users from MongoDB database...
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="table-container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}
        >
          <Users size={28} />
        </div>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>No users found</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', maxWidth: '380px', margin: '0 auto 1.25rem' }}>
          No records match your search criteria, or no users have been registered yet.
        </p>
        <Button variant="primary" onClick={onOpenCreateModal} icon={UserPlus}>
          Add New User
        </Button>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Registered</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {/* User Avatar + Name + Email */}
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

              {/* Role */}
              <td>
                <Badge type="role" value={user.role} />
              </td>

              {/* Department */}
              <td>{user.department}</td>

              {/* Phone */}
              <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {user.phone || '—'}
              </td>

              {/* Status */}
              <td>
                <Badge type="status" value={user.status} />
              </td>

              {/* Created Date */}
              <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

              {/* Actions */}
              <td>
                <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => onView(user)}
                    title="View details"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => onEdit(user)}
                    title="Edit user"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => onDelete(user)}
                    title="Delete user"
                    style={{ color: '#ef4444' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
