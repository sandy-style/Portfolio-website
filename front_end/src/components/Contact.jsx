import { Github, Mail, MapPin, Phone } from "lucide-react";

const details = [
  {
    icon: Mail,
    label: "Email",
    value: "astaway2007@gmail.com",
    href: "mailto:astaway2007@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/sandy-style",
    href: "https://github.com/sandy-style",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "9866062619",
    href: "tel:+9779866062619",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pokhara, Nepal",
    href: null,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-24 sm:py-28">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[#edf3fa]">
          <div className="grid gap-12 p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
            <div>
              <p className="section-kicker">05 · Contact</p>
              <h2 className="mt-4 font-[Manrope] text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1] tracking-[-0.05em] text-[#142039]">
                Let’s stay in touch.
              </h2>
              <p className="mt-5 max-w-md leading-7 text-slate-600">
                If you want to talk about a project, development, or just exchange ideas about software, you can reach me here.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {details.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#46658b] shadow-sm">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{label}</span>
                      <span className="mt-1 block truncate text-sm font-bold text-[#263a57]">{value}</span>
                    </span>
                  </>
                );

                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
