import app from "./app";
import { config } from "dotenv";

config(); // Load .env variables

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
