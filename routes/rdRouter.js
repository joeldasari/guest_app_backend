import express from "express";
import { rdModel } from "../models/rdModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { room, dates } = req.body;
    const result = await rdModel.create({ room, dates });
    res.json({ result });
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    res.json(await rdModel.find({}));
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/availableRooms", async (req, res) => {
  try {
    const { dates } = req.body;
    const availableRooms = await rdModel.find({ dates: { $all: dates } });
    res.json(availableRooms);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/updatedRoom", async (req, res) => {
  try {
    const { room, dates } = req.body;
  } catch (err) {
    console.log(er.message);
  }
});

export { router as rdRouter };
