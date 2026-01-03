import express from 'express';
import { initProducer } from '../../common/kafka/producer';
import { initAerospike } from '../../common/aerospike/client';
import authRoutes from './routes/auth.routes';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

const start = async () => {
  await initProducer();
  await initAerospike();
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
  });
};

start();
