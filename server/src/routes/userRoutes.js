import express from 'express';
import {
  getUsers,
  getUserStats,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import {
  validateCreateUser,
  validateUpdateUser
} from '../middleware/validate.js';

const router = express.Router();

// Dashboard statistics
router.get('/stats', getUserStats);

// List and Create users
router.route('/')
  .get(getUsers)
  .post(validateCreateUser, createUser);

// Single User Operations
router.route('/:id')
  .get(getUserById)
  .put(validateUpdateUser, updateUser)
  .delete(deleteUser);

export default router;
