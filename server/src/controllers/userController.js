import { User } from '../models/User.js';

/**
 * GET /api/users
 * Returns list of users with search, role/status filtering, and sorting.
 */
export const getUsers = async (req, res, next) => {
  try {
    const { search, role, status, sortBy = 'createdAt', order = 'desc' } = req.query;

    const query = {};

    // Filter by role if provided
    if (role && role !== 'All') {
      query.role = role;
    }

    // Filter by status if provided
    if (status && status !== 'All') {
      query.status = status;
    }

    // Case-insensitive search on name, email, or department
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ name: regex }, { email: regex }, { department: regex }];
    }

    const sortDirection = order === 'asc' ? 1 : -1;
    const users = await User.find(query).sort({ [sortBy]: sortDirection });

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/users/stats
 * Aggregates dashboard metrics: totals, active/inactive breakdown, role distribution, and weekly trends.
 */
export const getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'Active' });
    const inactiveUsers = await User.countDocuments({ status: 'Inactive' });
    const pendingUsers = await User.countDocuments({ status: 'Pending' });

    // Users registered within the last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newThisWeek = await User.countDocuments({ createdAt: { $gte: oneWeekAgo } });

    // Role distribution aggregation
    const roleStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    const roleBreakdown = {
      Admin: 0,
      Manager: 0,
      Developer: 0,
      Designer: 0
    };
    roleStats.forEach((stat) => {
      if (roleBreakdown[stat._id] !== undefined) {
        roleBreakdown[stat._id] = stat.count;
      }
    });

    // 5 most recently created users for the quick activity widget
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email role status department createdAt');

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        pendingUsers,
        newThisWeek,
        roleBreakdown,
        recentUsers
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/users/:id
 * Returns single user details by ID.
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/users
 * Creates a new user record.
 */
export const createUser = async (req, res, next) => {
  try {
    const { name, email, role, status, department, phone } = req.body;

    // Check if email already exists
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email address already exists',
        errors: {
          email: 'This email is already registered'
        }
      });
    }

    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: role || 'Developer',
      status: status || 'Active',
      department: department.trim(),
      phone: phone ? phone.trim() : ''
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/users/:id
 * Updates an existing user record.
 */
export const updateUser = async (req, res, next) => {
  try {
    const { name, email, role, status, department, phone } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // If email is being changed, ensure uniqueness
    if (email && email.toLowerCase().trim() !== user.email) {
      const emailTaken = await User.findOne({
        email: email.toLowerCase().trim(),
        _id: { $ne: user._id }
      });
      if (emailTaken) {
        return res.status(409).json({
          success: false,
          message: 'This email is already in use by another user',
          errors: {
            email: 'This email is already in use by another user'
          }
        });
      }
      user.email = email.toLowerCase().trim();
    }

    if (name !== undefined) user.name = name.trim();
    if (role !== undefined) user.role = role;
    if (status !== undefined) user.status = status;
    if (department !== undefined) user.department = department.trim();
    if (phone !== undefined) user.phone = phone.trim();

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/users/:id
 * Deletes user by ID.
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: `User '${user.name}' has been deleted successfully`,
      data: { id: user._id }
    });
  } catch (error) {
    next(error);
  }
};
