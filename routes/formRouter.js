import express from "express";
import { formModel } from "../models/submitForm.js";
import { rdModel } from "../models/rdModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await formModel.create(req.body);
    res.json(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    return res.json(await formModel.find({}));
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/accepted/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { status, dates, room } = req.body;
    const updatedStatus = await formModel.findByIdAndUpdate(
      { _id: req.params.id },
      { status },
      { new: true }
    );
    const updatedRoom = await rdModel.updateOne(
      { room: room },
      { $pull: { dates: { $in: dates } } }
    );
    res.json(updatedStatus);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/rejected/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const result = await formModel.findByIdAndUpdate(
      { _id: req.params.id },
      { status },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/acceptedList", async (req, res) => {
  try {
    const result = await formModel.find({ status: 1 });
    res.json(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/rejectedList", async (req, res) => {
  try {
    const result = await formModel.find({ status: 2 });
    res.json(result);
  } catch (err) {
    console.log(err.message);
  }
});

export { router as formRouter };
