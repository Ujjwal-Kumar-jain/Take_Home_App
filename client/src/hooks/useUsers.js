import { useState, useEffect, useCallback } from 'react';
import { userApi } from '../services/api.js';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    role: 'All',
    status: 'All',
    sortBy: 'createdAt',
    order: 'desc'
  });

  /**
   * Fetches the users table data using current filters.
   */
  const loadUsers = useCallback(async (customFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const activeFilters = customFilters !== undefined ? customFilters : filters;
      const data = await userApi.getAll(activeFilters);
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  /**
   * Fetches latest dashboard statistics.
   */
  const loadStats = useCallback(async () => {
    setIsStatsLoading(true);
    try {
      const data = await userApi.getStats();
      setStats(data);
    } catch (err) {
      console.error('[useUsers] Failed to fetch stats:', err);
    } finally {
      setIsStatsLoading(false);
    }
  }, []);

  // Fetch users when filters change
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Initial stats fetch
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  /**
   * Creates a user, updates local state, and refreshes dashboard stats.
   */
  const createUser = async (userData) => {
    const newUser = await userApi.create(userData);
    setUsers((prev) => [newUser, ...prev]);
    loadStats();
    return newUser;
  };

  /**
   * Updates a user and syncs with state.
   */
  const updateUser = async (id, userData) => {
    const updated = await userApi.update(id, userData);
    setUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));
    loadStats();
    return updated;
  };

  /**
   * Deletes a user and syncs with state.
   */
  const deleteUser = async (id) => {
    await userApi.delete(id);
    setUsers((prev) => prev.filter((u) => u._id !== id));
    loadStats();
  };

  return {
    users,
    stats,
    isLoading,
    isStatsLoading,
    error,
    filters,
    setFilters,
    loadUsers,
    loadStats,
    createUser,
    updateUser,
    deleteUser
  };
};

export default useUsers;
