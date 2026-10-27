const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_ROLES = ['Admin', 'Manager', 'Developer', 'Designer'];
const VALID_STATUSES = ['Active', 'Inactive', 'Pending'];

/**
 * Validates request payload for creating a new user.
 */
export const validateCreateUser = (req, res, next) => {
  const { name, email, role, status, department, phone } = req.body;
  const errors = {};

  if (!name || !name.trim()) {
    errors.name = 'Full name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (name.trim().length > 60) {
    errors.name = 'Name cannot exceed 60 characters';
  }

  if (!email || !email.trim()) {
    errors.email = 'Email address is required';
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (role && !VALID_ROLES.includes(role)) {
    errors.role = `Role must be one of: ${VALID_ROLES.join(', ')}`;
  }

  if (status && !VALID_STATUSES.includes(status)) {
    errors.status = `Status must be one of: ${VALID_STATUSES.join(', ')}`;
  }

  if (!department || !department.trim()) {
    errors.department = 'Department is required';
  }

  if (phone && phone.trim().length > 25) {
    errors.phone = 'Phone number is too long';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

/**
 * Validates request payload for updating an existing user.
 */
export const validateUpdateUser = (req, res, next) => {
  const { name, email, role, status, department, phone } = req.body;
  const errors = {};

  if (name !== undefined) {
    if (!name.trim()) {
      errors.name = 'Full name cannot be blank';
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (name.trim().length > 60) {
      errors.name = 'Name cannot exceed 60 characters';
    }
  }

  if (email !== undefined) {
    if (!email.trim()) {
      errors.email = 'Email address cannot be blank';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Please provide a valid email address';
    }
  }

  if (role !== undefined && !VALID_ROLES.includes(role)) {
    errors.role = `Role must be one of: ${VALID_ROLES.join(', ')}`;
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.status = `Status must be one of: ${VALID_STATUSES.join(', ')}`;
  }

  if (department !== undefined && !department.trim()) {
    errors.department = 'Department cannot be blank';
  }

  if (phone !== undefined && phone.trim().length > 25) {
    errors.phone = 'Phone number is too long';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};
