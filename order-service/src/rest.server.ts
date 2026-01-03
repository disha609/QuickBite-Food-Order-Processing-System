import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongo';   // your Mongo connection file
import orderRoutes from './routes/order.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();  // make sure this is awaited
    console.log(`✅ MongoDB connected`);
    
    app.use(cors());
    app.use(express.json());
    
    app.use('/api/orders', orderRoutes);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

startServer();
