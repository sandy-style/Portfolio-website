import mongoose from "mongoose";
const uploadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    languages: [{ type: String, trim: true }],
    gitHubUrl: { type: String, required: true, trim: true },
    liveUrl: { type: String, trim: true },
  },
  { timestamps: true },
);
const uploadModel =
  mongoose.models.upload || mongoose.model("Upload", uploadSchema);

export default uploadModel;
