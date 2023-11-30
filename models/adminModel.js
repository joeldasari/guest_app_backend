import mongoose from "mongoose";
const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const adminModel = mongoose.model("adminModel", adminSchema);
export { adminModel };
