import mongoose from "mongoose";
const formSchema = mongoose.Schema({
  hodName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  bookingFor: {
    type: String,
    required: true,
  },
  guestPhoneNo: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  dates: [{ type: Number, required: true }],
  room: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
});

const formModel = mongoose.model("formModel", formSchema);
export { formModel };
