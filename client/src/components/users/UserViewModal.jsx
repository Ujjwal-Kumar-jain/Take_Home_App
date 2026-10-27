import React from 'react';
import { Mail, Phone, Building, Calendar, Shield, Edit2 } from 'lucide-react';
import Modal from '../common/Modal.jsx';
import Badge from '../common/Badge.jsx';
import Button from '../common/Button.jsx';

export const UserViewModal = ({ isOpen, onClose, user, onEdit }) => {
  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Details"
      maxWidth="480px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onClose();
              onEdit(user);
            }}
            icon={Edit2}
          >
            Edit User
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* User Hero Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--accent-subtle)',
              color: 'var(--accent-color)',
              fontWeight: 700,
              fontSize: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--border-color)'
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{user.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Badge type="role" value={user.role} />
              <Badge type="status" value={user.status} />
            </div>
          </div>
        </div>

        {/* Detailed Fields List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
            <Mail size={16} color="var(--text-muted)" />
            <span style={{ color: 'var(--text-secondary)' }}>Email:</span>
            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{user.email}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
            <Building size={16} color="var(--text-muted)" />
            <span style={{ color: 'var(--text-secondary)' }}>Department:</span>
            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{user.department}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
            <Phone size={16} color="var(--text-muted)" />
            <span style={{ color: 'var(--text-secondary)' }}>Phone:</span>
            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
              {user.phone || 'Not provided'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
            <Calendar size={16} color="var(--text-muted)" />
            <span style={{ color: 'var(--text-secondary)' }}>Created:</span>
            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
              {new Date(user.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserViewModal;
