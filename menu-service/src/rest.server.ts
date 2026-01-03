import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './mongo';
import menuRoutes from './routes/menu.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRoutes); // ✅ You use the router, not controller function

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Menu REST server running on port ${PORT}`);
});
