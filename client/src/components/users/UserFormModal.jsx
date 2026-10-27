import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal.jsx';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';

const ROLE_OPTIONS = [
  { value: 'Developer', label: 'Developer' },
  { value: 'Designer', label: 'Designer' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Admin', label: 'Admin' }
];

const STATUS_OPTIONS = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Pending', label: 'Pending' }
];

const INITIAL_FORM = {
  name: '',
  email: '',
  role: 'Developer',
  status: 'Active',
  department: 'Engineering',
  phone: ''
};

export const UserFormModal = ({ isOpen, onClose, onSubmit, initialUser = null, loading = false }) => {
  const isEditing = Boolean(initialUser && initialUser._id);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialUser) {
      setFormData({
        name: initialUser.name || '',
        email: initialUser.email || '',
        role: initialUser.role || 'Developer',
        status: initialUser.status || 'Active',
        department: initialUser.department || 'Engineering',
        phone: initialUser.phone || ''
      });
    } else {
      setFormData(INITIAL_FORM);
    }
    setErrors({});
  }, [initialUser, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Client-side validation before triggering submit.
   */
  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.department.trim()) {
      errs.department = 'Department is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      // If server returned structured field errors (e.g. duplicate email)
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setErrors({ general: err.message || 'Operation failed' });
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit User Profile' : 'Add New User'}
      maxWidth="580px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {isEditing ? 'Save Changes' : 'Create User'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {errors.general && (
          <div
            style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--status-danger-bg)',
              color: 'var(--status-danger-text)',
              fontSize: '0.85rem',
              marginBottom: '1rem'
            }}
          >
            {errors.general}
          </div>
        )}

        <div className="form-grid">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            required
            error={errors.name}
            fullWidth
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. john.doe@company.io"
            required
            error={errors.email}
            fullWidth
          />

          <Input
            label="Role"
            name="role"
            as="select"
            value={formData.role}
            onChange={handleChange}
            options={ROLE_OPTIONS}
            error={errors.role}
          />

          <Input
            label="Status"
            name="status"
            as="select"
            value={formData.status}
            onChange={handleChange}
            options={STATUS_OPTIONS}
            error={errors.status}
          />

          <Input
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g. Engineering, Design, Product"
            required
            error={errors.department}
          />

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210 (Optional)"
            error={errors.phone}
          />
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;
