import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { generateToken, authenticateToken, AuthenticatedRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

// In-memory user storage (replace with Prisma in production)
const users: Map<string, {
  id: string;
  email: string;
  password: string;
  name: string;
  userType: 'agency' | 'talent';
  avatar?: string;
  createdAt: Date;
}> = new Map();

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  userType: z.enum(['agency', 'talent']),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Register
router.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);

    // Check if user exists
    for (const user of users.values()) {
      if (user.email === data.email) {
        throw new AppError('Email already registered', 400);
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const userId = `user_${Date.now()}`;
    const newUser = {
      id: userId,
      email: data.email,
      password: hashedPassword,
      name: data.name,
      userType: data.userType,
      createdAt: new Date(),
    };

    users.set(userId, newUser);

    // Generate token
    const token = generateToken({
      userId,
      email: data.email,
      userType: data.userType,
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: userId,
          email: data.email,
          name: data.name,
          userType: data.userType,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);

    // Find user
    let foundUser = null;
    for (const user of users.values()) {
      if (user.email === data.email) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      throw new AppError('Invalid credentials', 401);
    }

    // Check password
    const validPassword = await bcrypt.compare(data.password, foundUser.password);
    if (!validPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate token
    const token = generateToken({
      userId: foundUser.id,
      email: foundUser.email,
      userType: foundUser.userType,
    });

    res.json({
      success: true,
      data: {
        user: {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          userType: foundUser.userType,
          avatar: foundUser.avatar,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = users.get(req.user!.userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Logout (client-side, just acknowledge)
router.post('/logout', (req, res) => {
  res.json({ success: true });
});

export { router as authRouter };
