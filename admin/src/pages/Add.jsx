import React from "react";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gitHubUrl, setGitHubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [languages, setLanguages] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("languages", JSON.stringify(languages));
      formData.append("gitHubUrl", gitHubUrl);
      formData.append("image1", image);
      formData.append("liveUrl", liveUrl);
      const response = await axios.post(
        backendUrl + "/api/admin/upload",
        formData,
        { headers: { token } },
      );
      if (response.data.success) {
        setImage("");
        setName("");
        setDescription("");
        setGitHubUrl("");
        setLiveUrl("");
        setLanguages("");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <form
          onSubmit={submitHandler}
          className="rounded-xl border bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="mb-7">
            <h1 className="mb-1 text-3xl font-semibold text-gray-900">
              Add Project
            </h1>
            <p className="text-sm text-gray-500">
              Add a new project to your portfolio.
            </p>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Project Image
            </label>

            <label className="flex h-43 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 hover:border-red-500">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Project preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <ImagePlus className="mb-2 text-red-600" size={28} />
                  <span className="text-sm text-gray-500">Upload image</span>
                </div>
              )}

              <input
                required
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
                value={name}
                placeholder="Project name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="5"
                value={description}
                placeholder="Project description"
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  GitHub URL
                </label>
                <input
                  onChange={(e) => setGitHubUrl(e.target.value)}
                  required
                  value={gitHubUrl}
                  type="text"
                  placeholder="GitHub URL"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Live URL
                </label>
                <input
                  onChange={(e) => setLiveUrl(e.target.value)}
                  type="text"
                  value={liveUrl}
                  placeholder="Live project URL"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Languages
              </label>
              <input
                onChange={(e) => setLanguages(e.target.value)}
                type="text"
                value={languages}
                required
                placeholder="e.g. React, JavaScript, Node.js"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto sm:px-8"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Uploading...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
