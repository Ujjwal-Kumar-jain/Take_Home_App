/**
 * Centralized API service layer for User Management REST endpoints.
 * Handles base URL configuration, request formatting, and consistent error extraction.
 */

const BASE_URL = '/api/users';

/**
 * Generic fetch wrapper to handle JSON serialization and error parsing.
 */
async function request(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(endpoint, config);
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(result.message || 'API request failed');
      error.status = response.status;
      error.errors = result.errors || {};
      throw error;
    }

    return result;
  } catch (err) {
    if (!err.status) {
      err.message = 'Unable to connect to the backend server. Please verify the server is running.';
    }
    throw err;
  }
}

export const userApi = {
  /**
   * Fetches users list with optional search query, filters, and sort options.
   */
  async getAll(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.role && params.role !== 'All') query.append('role', params.role);
    if (params.status && params.status !== 'All') query.append('status', params.status);
    if (params.sortBy) query.append('sortBy', params.sortBy);
    if (params.order) query.append('order', params.order);

    const queryString = query.toString();
    const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

    const res = await request(url);
    return res.data || [];
  },

  /**
   * Fetches dashboard statistics (totals, breakdown, recent signups).
   */
  async getStats() {
    const res = await request(`${BASE_URL}/stats`);
    return res.data;
  },

  /**
   * Fetches a single user record by MongoDB ID.
   */
  async getById(id) {
    const res = await request(`${BASE_URL}/${id}`);
    return res.data;
  },

  /**
   * Creates a new user record.
   */
  async create(userData) {
    const res = await request(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    return res.data;
  },

  /**
   * Updates an existing user record.
   */
  async update(id, userData) {
    const res = await request(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
    return res.data;
  },

  /**
   * Deletes a user record by ID.
   */
  async delete(id) {
    const res = await request(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    return res.data;
  }
};
