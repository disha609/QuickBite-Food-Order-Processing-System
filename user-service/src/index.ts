import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes";
import cors from "cors";
import { initProducer } from "../../common/kafka/producer";
import { initAerospike } from "../../common/aerospike/client";
import { startKafkaConsumer } from "./kafkaConsumer";
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/restaurant-quickservice";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/users", userRoutes);

app.get("/", (_req, res) => {
  res.send("✅ User Service is running");
});

const start = async () => {
  await initProducer();
  await initAerospike();
  await startKafkaConsumer();

  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => {
    console.log(`🚀 User service listening on port ${PORT}`);
  });
};

start();
