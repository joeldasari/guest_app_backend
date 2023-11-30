import mongoose from "mongoose";
const rdSchema = mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  dates: [{ type: Number, required: true }],
});

const rdModel = mongoose.model("rdModel", rdSchema);
export { rdModel };
