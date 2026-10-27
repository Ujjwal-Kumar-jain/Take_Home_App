import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';

/**
 * Delete Confirmation Modal component.
 */
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete User',
  message = 'Are you sure you want to delete this user? This action cannot be undone.',
  userName = '',
  loading = false
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="460px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            Delete User
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div
          style={{
            padding: '0.65rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--status-danger-bg)',
            color: 'var(--status-danger-text)',
            flexShrink: 0
          }}
        >
          <AlertTriangle size={24} />
        </div>
        <div>
          <p style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.4rem' }}>
            {message}
          </p>
          {userName && (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Target user: <strong style={{ color: 'var(--text-primary)' }}>{userName}</strong>
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
