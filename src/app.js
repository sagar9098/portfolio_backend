import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import siteRoutes from "./routes/siteRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/site", siteRoutes);
app.use(errorHandler);

export default app;
