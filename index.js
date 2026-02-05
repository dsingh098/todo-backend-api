import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/userroutes.js";
import todoRouter from "./routes/todoroutes.js";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();
app.use(cookieParser())


const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use("/auth", authRouter)
app.use("/todo", todoRouter)

// Connect DB 
connectDb();

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
