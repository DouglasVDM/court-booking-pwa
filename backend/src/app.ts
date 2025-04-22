import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

import bookingRoutes from "./routes/booking.routes";
import memberRoutes from "./routes/member.routes";
import bookingTypeRoutes from "./routes/bookingType.routes";
import courtRoutes from "./routes/court.routes";  
import endTimeRoutes from "./routes/endTime.routes";
import startTimeRoutes from "./routes/startTime.routes";
import visitorRoutes from "./routes/visitor.routes";

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/booking-types", bookingTypeRoutes);
app.use("/api/courts", courtRoutes);
app.use("/api/end-times", endTimeRoutes);
app.use("/api/start-times", startTimeRoutes);
app.use("/api/visitors",visitorRoutes);

// Health check
app.get("/", (_req, res) => {
  res.send("Tennis Club API is running 🚀");
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unexpected error:", err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

export default app;
