import express from 'express';
import { initProducer } from '../../common/kafka/producer';
import { initAerospike } from '../../common/aerospike/client';
import menuRoutes from './routes/menu.routes';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

dotenv.config();

const app = express();
app.use(express.json());

async function start() {
  await initAerospike();
  await initProducer();

  app.use('/api/menu', menuRoutes);

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Menu service running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start Menu Service:', err);
});
