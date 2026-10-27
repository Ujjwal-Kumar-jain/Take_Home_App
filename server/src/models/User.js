import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [60, 'Name cannot exceed 60 characters']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address'
      ]
    },
    role: {
      type: String,
      enum: {
        values: ['Admin', 'Manager', 'Developer', 'Designer'],
        message: '{VALUE} is not a valid user role'
      },
      default: 'Developer'
    },
    status: {
      type: String,
      enum: {
        values: ['Active', 'Inactive', 'Pending'],
        message: '{VALUE} is not a valid status'
      },
      default: 'Active'
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
      default: 'Engineering'
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Text index for name and department search optimization
userSchema.index({ name: 'text', department: 'text' });

export const User = mongoose.model('User', userSchema);
