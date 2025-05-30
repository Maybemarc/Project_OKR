import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import orgRoutes from "./routes/orgRoutes.js"
import okrRoutes from "./routes/okrRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'https://project-okr.vercel.app', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/org",orgRoutes)
app.use("/api/okrs",okrRoutes)
app.use("/api/admin",adminRoutes)

app.get("/",(req,res)=> {
  res.send({message:"hello"})
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});