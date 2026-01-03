import { Request, Response } from 'express';
import { AuthService } from '../auth.service';

import { producer } from '../../../common/kafka/producer';

const USER_REGISTERED_EVENT = 'user_registered';
const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await authService.register(username, password);

  if (result.success && result.user) {
    try {
      await producer.send({
        topic: USER_REGISTERED_EVENT,
        messages: [
          {
            key: (result.user._id as string), // ✅ type assertion
            value: JSON.stringify({
              userId: result.user._id,
              username: result.user.username, // ✅ using username instead of email
            }),
          },
        ],
      });
      console.log('✅ Kafka event USER_REGISTERED_EVENT sent');
    } catch (error) {
      console.error('❌ Error sending Kafka event:', error);
    }
  }

  res.status(result.success ? 200 : 400).json(result);
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await authService.login(username, password);
  res.status(result.success ? 200 : 401).json(result);
};
