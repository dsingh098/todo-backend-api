import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/userroutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/", authRouter)

// Connect DB first
connectDb();

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
