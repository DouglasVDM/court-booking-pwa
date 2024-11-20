import express, { Request, Response } from "express";
import bodyParser, { BodyParser } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

const memberRoutes = require("./routes/memberRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const courtRoutes = require("./routes/courtRoutes");
const bookingTypeRoutes = require("./routes/bookingTypeRoutes");

// Middelware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet()); // Using Helmet to secure headers
app.use(morgan("dev")); // 'dev' is a predefined format that gives concise colored output

// Routes
app.use("/members", memberRoutes);
app.use("/visitors", visitorRoutes);
app.use("/courts", courtRoutes);
app.use("/bookingTypes", bookingTypeRoutes);

// Test route to confirm server connection
app.get("/", (req, res) => {
  res.send("Hello World! API Server is up!!!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
