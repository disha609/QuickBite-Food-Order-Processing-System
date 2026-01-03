import { createConsumer } from '../../common/kafka/consumer';
import {User} from './models/user.model';

export const startKafkaConsumer = async () => {
  const consumer = createConsumer('user-service-group');
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-created' });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { userId, email, name } = JSON.parse(message.value.toString());
      const exists = await User.findById(userId);
      if (!exists) {
        await User.create({ _id: userId, email, name });
        console.log(`User created via Kafka: ${email}`);
      }
    }
  });
};
