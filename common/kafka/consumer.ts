import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'restaurant-app',
  brokers: ['localhost:9092'],
});

export function createConsumer(groupId: string) {
  return kafka.consumer({ groupId });
}
