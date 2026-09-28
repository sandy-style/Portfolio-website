import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Education", "education"],
  ["Contact", "contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/95 shadow-[0_8px_30px_rgba(20,32,57,0.06)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="section-shell flex h-[74px] items-center justify-between">
        <button
          type="button"
          onClick={() => goTo("home")}
          className="font-[Manrope] text-[1.02rem] font-extrabold tracking-[-0.03em] text-[#142039]"
          aria-label="Go to home"
        >
          Sandesh Poudel<span className="text-[#5273a4]">.</span>
        </button>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Primary navigation"
        >
          {links.map(([label, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => goTo(id)}
              className="text-[0.87rem] font-semibold text-slate-600 transition hover:text-[#1d4f91] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5273a4]/40"
            >
              {label}
            </button>
          ))}
          <a
            href="/Sandesh-Poudel-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-[0.84rem] font-bold text-[#1c355c] transition hover:border-[#7894bc] hover:bg-slate-50"
          >
            Resume
          </a>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-slate-200 bg-white px-5 py-4 shadow-lg md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="section-shell flex flex-col gap-1">
            {links.map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => goTo(id)}
                className="rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {label}
              </button>
            ))}
            <a
              href="/Sandesh-Poudel-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-[0.84rem] font-bold text-[#1c355c] transition hover:border-[#7894bc] hover:bg-slate-50"
            >
              Resume
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
