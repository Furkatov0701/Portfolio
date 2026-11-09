import { ExternalLink } from "lucide-react";
import SectionTitle from "./SectionTitle";
import TiltCard from "./TiltCard";
import Cube3D from "./Cube3D";
import { projects } from "../data/portfolio";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.27 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

const Projects = ({ darkMode }) => {
  const card = darkMode ? "bg-gray-900/70 border-white/10" : "bg-white border-orange-100";
  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="My Projects" subtitle="A selection of things I've built recently." darkMode={darkMode} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((p, i) => (
            <div key={p.title} data-aos="fade-up" data-aos-delay={(i % 3) * 120}>
              <TiltCard className={`group flex h-full flex-col overflow-hidden rounded-3xl border shadow-xl ${card}`}>
                {/* 3D prevyu */}
                <div className={`relative flex h-44 items-center justify-center bg-linear-to-br ${p.gradient}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                  <div style={{ transform: "translateZ(60px)" }}>
                    <Cube3D gradient={p.gradient} label={String(i + 1).padStart(2, "0")} size={84} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6" style={{ transform: "translateZ(30px)" }}>
                  <h3 className={`mb-2 text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{p.title}</h3>
                  <p className={`mb-4 flex-1 text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{p.description}</p>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-500">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-orange-500 py-2 text-sm font-semibold transition-colors hover:bg-orange-500 hover:text-white ${darkMode ? "text-white" : "text-gray-800"}`}
                    >
                      <GithubIcon className="h-4 w-4" /> Code
                    </a>
                    <a
                      href={p.demo}
                      target={p.demo.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-500 py-2 text-sm font-semibold text-white"
                    >
                      <ExternalLink className="h-4 w-4" /> Demo
                    </a>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
