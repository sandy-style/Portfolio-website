import React, { useEffect, useState } from "react";
import { ExternalLink, Calendar, Pencil, Trash2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import UpdateProject from "./Update";
const ProjectCard = ({ project, token, fetchProject }) => {
  if (!project) return null;
  const {
    name,
    description,
    image,
    languages = [],
    gitHubUrl,
    liveUrl,
    createdAt,
  } = project;

  const removeHandler = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/admin/remove",
        { id },
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchProject();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [updateOpen, setUpdateOpen] = useState(false);

  return !updateOpen ? (
    <div className="group w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {liveUrl !== "Not yet deployed" && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-md opacity-0 transition-all duration-300 hover:bg-gray-100 group-hover:opacity-100"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        )}
      </div>

      <div className="p-5">
        <h2 className="mb-2 line-clamp-1 text-xl font-bold text-gray-900">
          {name}
        </h2>

        <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>

        {languages.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {languages.map((language, index) => (
              <span
                key={`${language}-${index}`}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
              >
                {language}
              </span>
            ))}
          </div>
        )}

        {createdAt && (
          <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={14} />
            <span>
              Created{" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        )}

        <div className="flex gap-2 border-t border-gray-100 pt-4">
          {gitHubUrl && (
            <a
              href={gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              <FaGithub size={16} />
              GitHub
            </a>
          )}

          {liveUrl !== "Not yet deployed" ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <ExternalLink size={16} />
              Live
            </a>
          ) : (
            <p className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              {liveUrl} !
            </p>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setUpdateOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Pencil size={16} />
            Update
          </button>

          <button
            onClick={() => removeHandler(project._id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      </div>
    </div>
  ) : (
    <UpdateProject
      project={project}
      fetchProject={fetchProject}
      setUpdateOpen={setUpdateOpen}
      token={token}
    />
  );
};

export default ProjectCard;
