import express from "express";
import hodModel from "../models/hodModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

const secret = process.env.SECRET;

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const result = await hodModel.findOne({ email });
  if (result) {
    return res.json({ message: "User already exists, please Login" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await hodModel.create({ email, password: hashedPassword });
    res.json({ message: "Registered Successfully" });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await hodModel.findOne({ email });
  if (findUser) {
    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (comparePassword) {
      const token = jwt.sign({ id: findUser._id }, secret);
      return res.json({ token, hodID: findUser._id });
    }
    return res.json({ message: "Incorrect password, please try again" });
  }
  res.json({ message: "User doesn't exists" });
});

export { router as authRouter };
