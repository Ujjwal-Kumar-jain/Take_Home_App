import React, { useState } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import UsersPage from './pages/UsersPage.jsx';
import ThemeDrawer from './components/theming/ThemeDrawer.jsx';
import { useUsers } from './hooks/useUsers.js';

export const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    users,
    stats,
    isLoading,
    isStatsLoading,
    filters,
    setFilters,
    createUser,
    updateUser,
    deleteUser
  } = useUsers();

  const handleOpenCreateModal = () => {
    setActiveTab('users');
    setIsFormOpen(true);
  };

  return (
    <div className="app-container">
      {/* Persistent Navigation */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'dashboard' ? (
          <DashboardPage
            stats={stats}
            isStatsLoading={isStatsLoading}
            onNavigateToUsers={() => setActiveTab('users')}
            onOpenCreateModal={handleOpenCreateModal}
          />
        ) : (
          <UsersPage
            users={users}
            isLoading={isLoading}
            filters={filters}
            setFilters={setFilters}
            createUser={createUser}
            updateUser={updateUser}
            deleteUser={deleteUser}
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
          />
        )}
      </main>

      {/* Zero-Dependency Theming Engine Drawer */}
      <ThemeDrawer />
    </div>
  );
};

export default App;
