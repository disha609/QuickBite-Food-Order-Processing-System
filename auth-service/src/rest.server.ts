import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { connectDB } from './config/db';


dotenv.config();

const startServer = async () => {
  await connectDB();

  const app = express();
  const PORT = process.env.PORT || 4000;

  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', authRoutes);

  app.get('/', (req, res) => {
    res.send('Auth REST API is running');
  });

  app.listen(PORT, () => {
    console.log(`🚀 REST server running at http://localhost:${PORT}`);
  });
};

startServer();
