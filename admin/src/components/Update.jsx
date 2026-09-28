import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const UpdateProject = ({ project, setUpdateOpen, token, fetchProject }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [languages, setLanguages] = useState(project.languages);
  const [gitHubUrl, setGitHubUrl] = useState(project.gitHubUrl);
  const [image, setImage] = useState("");
  const [liveUrl, setLiveUrl] = useState(project.liveUrl);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("id", project._id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("languages", languages);
      formData.append("liveUrl", liveUrl);
      formData.append("gitHubUrl", gitHubUrl);
      if (image) formData.append("image1", image);

      const response = await axios.post(
        backendUrl + "/api/admin/update",
        formData,
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(response.data.message);

        setUpdateOpen(false);
        fetchProject();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-50 p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-gray-900">Update Project</h1>
          <p className="text-sm text-gray-500">
            Update your project information
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={description}
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Languages
              </label>
              <input
                type="text"
                name="languages"
                onChange={(e) => setLanguages(e.target.value)}
                value={languages}
                placeholder="React, Node.js, MongoDB"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-400">
                Separate languages with commas
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <input
                type="url"
                onChange={(e) => setGitHubUrl(e.target.value)}
                name="gitHubUrl"
                value={gitHubUrl}
                placeholder="https://github.com/username/project"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Live URL
              </label>
              <input
                onChange={(e) => setLiveUrl(e.target.value)}
                name="liveUrl"
                value={liveUrl}
                placeholder="https://yourproject.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Project Image
              </label>

              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt={project?.name || "Project"}
                  className="mb-3 h-40 w-full rounded-lg object-cover"
                />
              ) : (
                <img
                  src={project?.image}
                  className="mb-3 h-40 w-full rounded-lg object-cover"
                  alt=""
                />
              )}

              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="w-full text-sm"
              />
            </div>

            <div className="flex gap-3 border-t pt-4">
              <button
                type="button"
                onClick={() => setUpdateOpen(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                {loading ? "updating..." : "Update Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
