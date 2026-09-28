import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  status: { type: Boolean, default: false },
});

const statusModel =
  mongoose.models.status || mongoose.model("status", statusSchema);

export default statusModel;
