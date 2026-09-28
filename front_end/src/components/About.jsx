import { Code2, Gamepad2, GraduationCap, Lightbulb } from "lucide-react";

const points = [
  {
    icon: Code2,
    title: "Building",
    text: "Developing full-stack web applications with React, Node.js, Express, and MongoDB.",
  },
  {
    icon: GraduationCap,
    title: "Learning",
    text: "Studying DSA and strengthening the computer science fundamentals behind the code.",
  },
  {
    icon: Gamepad2,
    title: "Exploring",
    text: "Keeping application and game development as areas I want to explore more deeply.",
  },
  {
    icon: Lightbulb,
    title: "Long term",
    text: "Working toward becoming a strong software engineer and eventually building my own company.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-white py-24 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="section-kicker">01 · About</p>
            <h2 className="section-title mt-4">Still learning.<br />Taking it seriously.</h2>
          </div>

          <div>
            <p className="max-w-3xl text-[1.08rem] leading-8 text-slate-600">
              I am a MERN Stack Developer currently studying a Bachelor of Engineering in Information Technology at Pokhara University. My focus is on becoming better at building complete applications while understanding the engineering concepts underneath them.
            </p>
            <p className="mt-5 max-w-3xl text-[1.02rem] leading-8 text-slate-500">
              Alongside web development, I am studying Data Structures and Algorithms and exploring areas such as application development and game development. I am ambitious about going deeper into software engineering rather than stopping at a framework, and eventually I want to build something of my own.
            </p>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
              {points.map(({ icon: Icon, title, text }) => (
                <article key={title} className="bg-white p-6">
                  <Icon size={21} className="text-[#5273a4]" />
                  <h3 className="mt-4 font-[Manrope] font-extrabold text-[#17233a]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
