import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import UserTable from '../components/users/UserTable.jsx';
import FilterBar from '../components/users/FilterBar.jsx';
import UserFormModal from '../components/users/UserFormModal.jsx';
import UserViewModal from '../components/users/UserViewModal.jsx';
import ConfirmModal from '../components/common/ConfirmModal.jsx';
import Button from '../components/common/Button.jsx';
import { useToast } from '../components/common/Toast.jsx';

export const UsersPage = ({
  users,
  isLoading,
  filters,
  setFilters,
  createUser,
  updateUser,
  deleteUser,
  isFormOpen,
  setIsFormOpen
}) => {
  const { addToast } = useToast();

  // Modal states
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [selectedUserForView, setSelectedUserForView] = useState(null);
  const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      role: 'All',
      status: 'All',
      sortBy: 'createdAt',
      order: 'desc'
    });
  };

  // Open Create
  const handleOpenCreate = () => {
    setSelectedUserForEdit(null);
    setIsFormOpen(true);
  };

  // Open Edit
  const handleOpenEdit = (user) => {
    setSelectedUserForEdit(user);
    setIsFormOpen(true);
  };

  // Form Submission (Create or Edit)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedUserForEdit) {
        await updateUser(selectedUserForEdit._id, formData);
        addToast(`User '${formData.name}' updated successfully!`, 'success');
      } else {
        await createUser(formData);
        addToast(`User '${formData.name}' created successfully!`, 'success');
      }
      setIsFormOpen(false);
      setSelectedUserForEdit(null);
    } catch (err) {
      // Re-throw so form modal can show inline validation error
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete flow with confirmation dialog
  const handleConfirmDelete = async () => {
    if (!selectedUserForDelete) return;

    setIsDeleting(true);
    try {
      await deleteUser(selectedUserForDelete._id);
      addToast(`User '${selectedUserForDelete.name}' has been deleted.`, 'success');
      setSelectedUserForDelete(null);
    } catch (err) {
      addToast(err.message || 'Failed to delete user', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}
      >
        <div>
          <h1 style={{ marginBottom: '0.25rem' }}>User Directory</h1>
          <p>
            Manage team accounts, permissions, and directory entries stored in MongoDB.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleOpenCreate}
          icon={UserPlus}
        >
          Add New User
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* Users Table */}
      <UserTable
        users={users}
        isLoading={isLoading}
        onView={(user) => setSelectedUserForView(user)}
        onEdit={handleOpenEdit}
        onDelete={(user) => setSelectedUserForDelete(user)}
        onOpenCreateModal={handleOpenCreate}
      />

      {/* Create / Edit Form Modal */}
      <UserFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedUserForEdit(null);
        }}
        onSubmit={handleFormSubmit}
        initialUser={selectedUserForEdit}
        loading={isSubmitting}
      />

      {/* View User Modal (Read operation) */}
      <UserViewModal
        isOpen={Boolean(selectedUserForView)}
        onClose={() => setSelectedUserForView(null)}
        user={selectedUserForView}
        onEdit={handleOpenEdit}
      />

      {/* Delete Confirmation Modal (Delete with confirmation step) */}
      <ConfirmModal
        isOpen={Boolean(selectedUserForDelete)}
        onClose={() => setSelectedUserForDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Confirm User Deletion"
        message="Are you sure you want to permanently remove this user account from MongoDB?"
        userName={selectedUserForDelete?.name}
        loading={isDeleting}
      />
    </div>
  );
};

export default UsersPage;
