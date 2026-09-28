import jwt from "jsonwebtoken";
import statusModel from "../models/statusModel.js";

const adminLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (
      userName != process.env.ADMIN_NAME ||
      password != process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid Attempt" });
    }
    const adminStatus = await statusModel.findOne({});
    if (adminStatus?.status) {
      return res.json({ success: false, message: "Admin is already logged !" });
    }
    const token = jwt.sign(userName + password, process.env.JWT_SECRET);
    if (!adminStatus) {
      await statusModel.create({ status: true });
    } else {
      adminStatus.status = true;
      await adminStatus.save();
    }

    return res.json({ success: true, message: "Welcome! Admin 🫡", token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

const adminLogout = async (req, res) => {
  try {
    const adminStatus = await statusModel.findOne({});
    if (!adminStatus) {
      return res.json({ success: false, message: "Status does not exist" });
    }
    adminStatus.status = false;
    await adminStatus.save();
    return res.json({ success: true, message: "logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: true, message: error });
  }
};

export { adminLogin, adminLogout };
