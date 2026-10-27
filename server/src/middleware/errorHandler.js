/**
 * Global error handling middleware for Express.
 * Converts Mongoose and operational errors into structured API responses.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.url} -`, err.message);

  // Mongoose duplicate key error (e.g. email already registered)
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `A user with this ${duplicateField} already exists`,
      errors: {
        [duplicateField]: `This ${duplicateField} is already registered`
      }
    });
  }

  // Mongoose invalid ObjectId error
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(404).json({
      success: false,
      message: 'User not found with the provided ID'
    });
  }

  // Mongoose schema validation error fallback
  if (err.name === 'ValidationError') {
    const validationErrors = {};
    for (const [field, fieldError] of Object.entries(err.errors)) {
      validationErrors[field] = fieldError.message;
    }
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validationErrors
    });
  }

  // Generic internal server error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected internal server error occurred'
  });
};
