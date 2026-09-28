import { ArrowDownRight, ArrowRight } from "lucide-react";
import heroImage from "../assets/hero.jpg";

export default function Hero() {
  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative overflow-hidden border-b border-slate-200/80 bg-[#f7f9fc] pt-[74px]">
      <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-[#dce8f7]/55 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-[#e8edf4]/70 blur-3xl" aria-hidden="true" />

      <div className="section-shell grid min-h-[calc(100vh-74px)] items-center gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20 lg:gap-20">
        <div className="reveal max-w-2xl">
          <p className="section-kicker mb-5">MERN Stack Developer · Pokhara, Nepal</p>
          <h1 className="font-[Manrope] text-[clamp(3rem,7vw,5.7rem)] font-extrabold leading-[0.94] tracking-[-0.065em] text-[#142039]">
            Sandesh
            <br />
            <span className="text-[#5273a4]">Poudel.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-slate-700 sm:text-xl">
            I build practical web applications while going deeper into the software engineering ideas behind them.
          </p>
          <p className="mt-4 max-w-xl text-[0.98rem] leading-7 text-slate-500">
            Currently focused on the MERN stack, JavaScript, and DSA, with a long-term interest in application and game development.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => goTo("projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-[#19365f] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_22px_rgba(25,54,95,0.18)] transition hover:bg-[#244a7f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5273a4] focus-visible:ring-offset-2"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => goTo("about")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-[#1c355c] transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5273a4] focus-visible:ring-offset-2"
            >
              About Me
            </button>
            <button
              type="button"
              onClick={() => goTo("contact")}
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-slate-600 transition hover:text-[#1d4f91]"
            >
              Contact <ArrowDownRight size={16} />
            </button>
          </div>
        </div>

        <div className="reveal flex justify-center md:justify-end" style={{ animationDelay: "100ms" }}>
          <div className="relative h-[min(70vw,430px)] w-[min(70vw,430px)]">
            <div className="absolute inset-0 rounded-full border border-[#b8c9df] bg-white p-3 shadow-[0_28px_80px_rgba(28,53,92,0.14)]">
              <div className="h-full w-full overflow-hidden rounded-full bg-slate-100">
                <img
                  src={heroImage}
                  alt="Sandesh Poudel"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-3 left-6 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold tracking-wide text-slate-600 shadow-lg">
              MERN Stack Developer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
