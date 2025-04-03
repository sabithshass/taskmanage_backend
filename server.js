import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import morgan from "morgan";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev")); 

app.use("/api/tasks", taskRoutes);

app.get('/', (req, res) => {
    res.send('API is running....');
  });
  

  app.use("/", (_, res) =>
    res.status(404).json({ code: 404, message: "page not found" })
  );


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
