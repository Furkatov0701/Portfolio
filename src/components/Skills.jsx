import { lazy } from "react";
import { motion } from "framer-motion";
import Lazy3D from "./Lazy3D";
import SectionTitle from "./SectionTitle";
import TiltCard from "./TiltCard";
import { skills, techCloud } from "../data/portfolio";
import { useIsMobile, useIsTouch } from "../hooks";

const SkillSphere = lazy(() => import("./three/SkillSphere"));

const Skills = ({ darkMode }) => {
  const isMobile = useIsMobile();
  const isTouch = useIsTouch();
  const card = darkMode ? "bg-white/5 border-white/10" : "bg-white/80 border-orange-100";

  const fallback = (
    <div className="flex h-full flex-wrap content-center justify-center gap-2 p-4">
      {techCloud.map((t) => (
        <span key={t} className="rounded-full border border-orange-400/40 px-3 py-1 text-sm text-orange-400">{t}</span>
      ))}
    </div>
  );

  return (
    <section id="skills" className="relative overflow-hidden py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="My Skills"
          subtitle={isTouch ? "Technologies I work with every day." : "Technologies I work with every day. Drag the sphere to rotate it!"}
          darkMode={darkMode}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <div className="fade-in relative h-[340px] sm:h-[420px] lg:h-[500px] cursor-grab active:cursor-grabbing">
            <Lazy3D className="absolute inset-0" fallback={fallback}>
              {(active) => <SkillSphere words={techCloud} darkMode={darkMode} isMobile={isMobile} isTouch={isTouch} active={active} />}
            </Lazy3D>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((s, i) => (
              <div key={s.name} data-aos="fade-up" data-aos-delay={i * 60}>
                <TiltCard className={`group rounded-2xl border p-4 ${card}`} max={10}>
                  <div className="mb-3 flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: s.color, color: s.color }} />
                      <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{s.name}</span>
                    </span>
                    <span className="text-sm font-bold text-orange-400">{s.level}%</span>
                  </div>
                  <div className={`h-2 w-full overflow-hidden rounded-full ${darkMode ? "bg-gray-700" : "bg-orange-100"}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: "easeOut" }}
                      className="h-full rounded-full bg-linear-to-r from-orange-500 to-amber-400"
                    />
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
