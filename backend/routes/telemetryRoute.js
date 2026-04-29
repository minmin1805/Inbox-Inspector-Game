import express from "express";
import { createTelemetryEvent } from "../controllers/telemetryController.js";

const router = express.Router();

router.post("/events", createTelemetryEvent);

export default router;
