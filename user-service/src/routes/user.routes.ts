import { Router, RequestHandler } from "express";

import { verifyToken, AuthenticatedRequest } from '../../../common/middleware/verifyToken';
import {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Here, cast getProfile to `any` to bypass typing conflict (quick fix)
router.get("/profile", verifyToken as unknown as RequestHandler, getProfile);


export default router;
