import { Braces, Database, GitBranch, Server, Terminal } from "lucide-react";

const groups = [
  {
    title: "Frontend",
    icon: Braces,
    items: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend",
    icon: Server,
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    icon: Database,
    items: ["MongoDB"],
  },
  {
    title: "Programming",
    icon: Terminal,
    items: ["C", "C++", "Data Structures & Algorithms"],
  },
  {
    title: "Development",
    icon: GitBranch,
    items: ["Git", "GitHub", "JWT / Authentication", "API Integration", "JSON", "HTTP"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-y border-slate-200/80 bg-[#f5f7fa] py-24 sm:py-28">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="section-kicker">02 · Skills</p>
          <h2 className="section-title mt-4">Tools I work with.</h2>
          <p className="mt-5 leading-7 text-slate-500">
            A growing toolkit centered around building web applications and strengthening the fundamentals behind them.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ title, icon: Icon, items }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#edf3fa] text-[#3f6496]">
                  <Icon size={18} />
                </span>
                <h3 className="font-[Manrope] font-extrabold text-[#17233a]">{title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
