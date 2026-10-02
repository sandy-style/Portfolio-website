import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/database.js";
import dns from "dns";
import uploadRouter from "./routes/uploadRoute.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
// fix mongodb connection error;
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const port = process.env.PORT;

//connect database
try {
  connectDb();
} catch (error) {
  console.log(error);
}
connectCloudinary();

app.use(express.json());
app.use(cors());
app.use("/api/admin", uploadRouter);
app.use("/api/admin", userRouter);

app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
  console.log(port);
});
