import mongoose from 'mongoose';

/**
 * Establishes connection to MongoDB (supports both Atlas and local instances).
 */
export const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI;
    if (!connUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(connUri);
    console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Failed to connect to MongoDB: ${error.message}`);
    // We log clearly but don't immediately crash if starting up in development
    // so the developer can see clear diagnostic messages
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
