import jwt from 'jsonwebtoken';
import { User } from './models/User';  // Adjust path if needed
import { hashPassword, comparePassword } from './utils';
import { producer } from '../../common/kafka/producer';  // Adjust path
import { USER_REGISTERED_EVENT } from '../../common/kafka/user.events'; // Adjust path

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export class AuthService {
  async register(username: string, password: string) {
    const existing = await User.findOne({ username });
    if (existing) {
      return { success: false, message: 'User already exists', token: '' };
    }

    const passwordHash = await hashPassword(password);
    const user = new User({ username, password: passwordHash });
    await user.save();

    // <-- Add Kafka event send here
    try {
      await producer.send({
        topic: USER_REGISTERED_EVENT,
        messages: [
          {
            key: (user._id as any).toString(),
            value: JSON.stringify({
              userId: user._id,
              username: user.username,
            }),
          },
        ],
      });
      console.log('✅ Kafka event USER_REGISTERED_EVENT sent');
    } catch (error) {
      console.error('❌ Error sending Kafka event:', error);
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    return {
      success: true,
      message: 'User registered',
      token,
      user, // include user object here so controller can use it
    };
  }

  async login(username: string, password: string) {
    const user = await User.findOne({ username });
    if (!user) {
      return { success: false, message: 'User not found', token: '' };
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return { success: false, message: 'Invalid password', token: '' };
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return { success: true, message: 'Login successful', token };
  }
}
