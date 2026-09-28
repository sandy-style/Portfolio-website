import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Engineering in Information Technology (BEIT)",
    institution: "Pokhara University",
    status: "Currently studying",
    grade: null,
  },
  {
    degree: "NEB (+2)",
    institution: null,
    status: "Completed · 2081 BS",
    grade: "A+",
  },
  {
    degree: "SEE",
    institution: null,
    status: "Completed · 2078 BS",
    grade: "A",
  },
];

export default function Education() {
  return (
    <section id="education" className="border-y border-slate-200/80 bg-[#f5f7fa] py-24 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="section-kicker">04 · Education</p>
            <h2 className="section-title mt-4">Where I’m learning.</h2>
            <p className="mt-5 max-w-md leading-7 text-slate-500">
              My academic path alongside the practical work I’m doing in software development.
            </p>
          </div>

          <div className="space-y-3">
            {education.map((item) => (
              <article key={item.degree} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#edf3fa] text-[#46658b] sm:grid">
                  <GraduationCap size={21} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <h3 className="font-[Manrope] text-lg font-extrabold tracking-[-0.02em] text-[#17233a]">
                        {item.degree}
                      </h3>
                      {item.institution && (
                        <p className="mt-1 text-sm font-semibold text-[#5273a4]">{item.institution}</p>
                      )}
                    </div>
                    {item.grade && (
                      <span className="h-fit rounded-full bg-[#edf3fa] px-3 py-1 text-xs font-extrabold text-[#46658b]">
                        Grade {item.grade}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-slate-500">{item.status}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
