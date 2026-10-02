import uploadModel from "../models/uploadModel.js";
import { v2 as cloudinary } from "cloudinary";
const uploadProject = async (req, res) => {
  try {
    const { name, description, gitHubUrl } = req.body;
    let { liveUrl, languages } = req.body;
    if (!name || !description || !languages || !gitHubUrl) {
      return res.json({
        success: false,
        message: "Please fill the upload details properly.",
      });
    }
    if (!liveUrl) {
      liveUrl = "Not yet deployed";
    }
    languages = JSON.parse(languages);
    const image = req.files?.image1?.[0];
    if (!image) {
      return res.json({
        success: false,
        message: "Please upload project image. ",
      });
    }

    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    const imageUrl = result.secure_url;

    const uploadData = {
      name,
      description,
      image: imageUrl,
      languages,
      gitHubUrl,
      liveUrl,
    };
    const upload = new uploadModel(uploadData);
    await upload.save();
    return res.json({
      success: true,
      message: "Project uploaded successfully.",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id, name, description, languages, gitHubUrl, liveUrl } = req.body;
    if (!id) {
      return res.json({ success: false, message: "Project Id is required" });
    }
    const project = await uploadModel.findById(id);
    if (!project) {
      return res.json({ success: false, message: "Project not found" });
    }
    project.name = name || project.name;
    project.description = description || project.description;
    project.gitHubUrl = gitHubUrl || project.gitHubUrl;
    project.languages = languages || project.languages;
    project.liveUrl = liveUrl || project.liveUrl;
    let imageUrl = project.image;
    const image = req.files?.image1?.[0];
    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    }
    project.image = imageUrl;
    project.save();
    return res.json({ success: true, message: "Project updated succesfully." });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const listProject = async (req, res) => {
  try {
    const project = await uploadModel.find({}).sort({ date: -1 });
    return res.json({ success: true, project });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

const removeProject = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ success: false, message: "Project Id required!" });
    }

    const project = await uploadModel.findOneAndDelete(id);
    if (!project) {
      return res.json({ success: false, message: "Project not found" });
    }
    res.json({ success: true, message: "Project removed successfully." });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};
export { uploadProject, updateProject, listProject, removeProject };
