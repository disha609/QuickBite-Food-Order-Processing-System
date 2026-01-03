import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongo } from "./mongo";
import userRoutes from "./routes/user.routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.REST_PORT || 4001;
connectMongo().then(() => {
  app.listen(PORT, () => console.log(`REST server on port ${PORT}`));
});
