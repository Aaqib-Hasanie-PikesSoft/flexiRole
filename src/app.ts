import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { swaggerUi, swaggerDocs } from "./swagger";
import generalRouter from "./router";

dotenv.config();

const app = express();

import { sequelize } from "./database";

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api", generalRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the FlexiRole API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
