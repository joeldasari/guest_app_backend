import mongoose from "mongoose";

const hodSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const hodModel = mongoose.model("hodModel", hodSchema);
export default hodModel;
