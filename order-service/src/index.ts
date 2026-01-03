import express from 'express';
import connectDB from './mongo';
import orderRoutes from './routes/order.routes';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { initProducer } from '../../common/kafka/producer';
import { initAerospike } from '../../common/aerospike/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Register order routes
app.use('/api/order', orderRoutes);

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✅ MongoDB connected');

    // Initialize Kafka producer and Aerospike client
    await initProducer();
    await initAerospike();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Order service running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error starting order service:', error);
    process.exit(1);
  }
}

startServer();
