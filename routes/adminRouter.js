import express from "express";
import bcrypt from "bcrypt";
import { adminModel } from "../models/adminModel.js";
import jwt from "jsonwebtoken";
const router = express.Router();

// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const response = await adminModel.create({
//       email,
//       password: hashedPassword,
//     });
//     res.json({ response });
//   } catch (err) {
//     console.log(err.message);
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await adminModel.findOne({ email });
  if (findUser) {
    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (comparePassword) {
      const token = jwt.sign({ id: findUser._id }, "admin");
      return res.json({ token, adminID: findUser._id });
    }
    return res.json({ message: "Incorrect password, please try again" });
  }
  res.json({ message: "User doesn't exists" });
});

export { router as adminRouter };
