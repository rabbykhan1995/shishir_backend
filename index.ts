import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./utils/db.config";
import app from "./app";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
