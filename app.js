import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import urlRoutes from "./route/urlRoutes.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();
const swaggerDocument = YAML.load("./swagger/swagger.yaml");

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", urlRoutes);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

export default app;
