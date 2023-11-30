import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./routes/authRouter.js";
import { formRouter } from "./routes/formRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
import { rdRouter } from "./routes/rdRouter.js";
dotenv.config();

const port = process.env.PORT || 5500;
const uri = process.env.MONGODB_URI;

const app = express();

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB Connected");
    app.listen(port, () => {
      console.log(`Server Connected on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/form", formRouter);
app.use("/admin", adminRouter);
app.use("/rd", rdRouter);
