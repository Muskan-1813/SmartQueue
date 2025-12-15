import express from "express";
import cors from 'cors';
import authRoutes from './routes/auth.js'
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.listen(port, () => {
  console.log("listening on port" + `http://localhost:${port}`);
});
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.get("/api", (req, res) => {
  res.status(201).json("landing page");
});
app.use("/api",authRoutes);