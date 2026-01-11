import express from "express";
const router = express.Router();
import asyncHandler from "../middlewares/asyncHandler.js";
import auth from '../middlewares/auth.js'
import {
  showTickets,
  joinQueue,
  hub,
  createQueue,
} from "../controllers/queue.controller.js";

router.get("/hub",asyncHandler(hub));

router.post("/queue",asyncHandler(createQueue));

router.get("/queue/:queueId", asyncHandler(showTickets));

router.post("/queue/:queueId/join", asyncHandler(joinQueue));

export default router;
