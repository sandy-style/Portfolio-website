import { ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project, getImageUrl }) {
  const imageUrl = getImageUrl(project.image);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(25,45,75,0.04)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(25,45,75,0.08)]">
      <div className="aspect-[16/9] overflow-hidden bg-slate-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title || "Project"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm font-semibold text-slate-400">
            Project preview unavailable
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-[Manrope] text-xl font-extrabold tracking-[-0.02em] text-[#17233a]">
          {project.title || "Untitled project"}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {project.description || "No project description provided."}
        </p>

        {Array.isArray(project.languages) && project.languages.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.languages.map((language) => (
              <span
                key={language}
                className="rounded-full bg-[#eef3f8] px-2.5 py-1 text-[0.7rem] font-bold text-[#46658b]"
              >
                {language}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
          {project.livelink && (
            <a
              href={project.livelink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#315987] hover:text-[#17385f]"
            >
              Live Demo <ExternalLink size={14} />
            </a>
          )}
          {project.githublink && (
            <a
              href={project.githublink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-slate-900"
            >
              GitHub <Github size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
