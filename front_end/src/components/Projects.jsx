import { useEffect, useState } from "react";
import axios from "axios";
import { FolderOpen, RefreshCw } from "lucide-react";
import ProjectCard from "./ProjectCard";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function normalizeLanguages(languages) {
  if (!Array.isArray(languages)) {
    if (typeof languages === "string") {
      return languages
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  }

  return languages
    .flatMap((item) => {
      if (typeof item !== "string") return [];

      return item
        .split(",")
        .map((language) => language.trim())
        .filter(Boolean);
    })
    .filter(Boolean);
}

function normalizeProjects(data) {
  const raw = Array.isArray(data)
    ? data
    : (data?.projects ?? data?.data ?? data?.project ?? []);

  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.map((project) => ({
    ...project,

    // Backend uses `name`, frontend uses `title`
    title: project.name || "Untitled project",

    // Backend uses `liveUrl`
    livelink: project.liveUrl || "",

    // Backend uses `gitHubUrl`
    githublink: project.gitHubUrl || "",

    // Normalize languages
    languages: normalizeLanguages(project.languages),
  }));
}

function getImageUrl(image) {
  if (!image || typeof image !== "string") {
    return null;
  }

  // Cloudinary / external image
  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  // Relative backend image
  if (!backendUrl) {
    return image.startsWith("/") ? image : `/${image}`;
  }

  return `${backendUrl.replace(/\/+$/, "")}/${image.replace(/^\/+/, "")}`;
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  const loadProjects = async () => {
    setStatus("loading");
    setMessage("");

    if (!backendUrl) {
      setStatus("error");
      setMessage("VITE_BACKEND_URL is not configured yet.");
      return;
    }

    try {
      const response = await axios.get(
        `${backendUrl.replace(/\/+$/, "")}/api/admin/list`,
      );

      const normalized = normalizeProjects(response.data);

      setProjects(normalized);
      setStatus(normalized.length > 0 ? "success" : "empty");
    } catch (error) {
      console.error("Unable to load projects:", error);

      setStatus("error");
      setMessage(
        "Projects could not be loaded right now. Please check the backend connection.",
      );
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <section id="projects" className="bg-white py-24 sm:py-28">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="section-kicker">03 · Projects</p>

            <h2 className="section-title mt-4">Things I’ve built.</h2>

            <p className="mt-5 leading-7 text-slate-500">
              Projects are loaded directly from the portfolio backend, so this
              section stays connected to the work currently in the admin panel.
            </p>
          </div>

          {status === "error" && (
            <button
              type="button"
              onClick={loadProjects}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              <RefreshCw size={15} />
              Retry
            </button>
          )}
        </div>

        <div className="mt-12">
          {/* Loading */}
          {status === "loading" && (
            <div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              aria-label="Loading projects"
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="aspect-[16/9] animate-pulse bg-slate-200" />

                  <div className="space-y-3 p-6">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />

                    <div className="h-4 w-full animate-pulse rounded bg-slate-100" />

                    <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {status === "success" && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project._id || project.id || `${project.title}-${index}`}
                  project={project}
                  getImageUrl={getImageUrl}
                />
              ))}
            </div>
          )}

          {/* Empty */}
          {status === "empty" && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
              <FolderOpen className="mx-auto text-slate-400" size={30} />

              <h3 className="mt-4 font-[Manrope] font-extrabold text-[#17233a]">
                No projects yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Projects added through the portfolio admin panel will appear
                here.
              </p>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-14 text-center">
              <h3 className="font-[Manrope] font-extrabold text-[#17233a]">
                Unable to load projects
              </h3>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
