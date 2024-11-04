import express, { Request, Response } from "express";
import bodyParser, { BodyParser } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

const memberRoutes = require("./routes/memberRoutes");
const visitorRoutes = require("./routes/visitorRoutes");

// Middelware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/members", memberRoutes);
app.use("/visitors", visitorRoutes);


// Test route to confirm database connection

// Test route to confirm server connection
app.get("/", (req, res) => {
  res.send("Hello World! API Server is up!!!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
