export default function Footer() {
  const links = [
    ["Home", "home"],
    ["About", "about"],
    ["Skills", "skills"],
    ["Projects", "projects"],
    ["Education", "education"],
    ["Contact", "contact"],
  ];

  return (
    <footer className="border-t border-slate-200 bg-[#142039] text-white">
      <div className="section-shell py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-[Manrope] text-lg font-extrabold tracking-[-0.02em]">
              Sandesh Poudel<span className="text-[#9ab3d5]">.</span>
            </p>
            <p className="mt-1 text-sm text-slate-300">MERN Stack Developer</p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="text-sm font-semibold text-slate-300 transition hover:text-white">
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sandesh Poudel. All rights reserved.</p>
          <a href="mailto:astaway2007@gmail.com" className="transition hover:text-white">
            astaway2007@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
