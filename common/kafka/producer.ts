import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'restaurant-app',
  brokers: ['localhost:9092'],  // change if your Kafka broker address is different
});

export const producer = kafka.producer();

export async function initProducer() {
  await producer.connect();
  console.log('✅ Kafka Producer connected');
}

export async function sendMessage(topic: string, message: object) {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
}
