import { motion } from "framer-motion";
import { MapPin, Code2, Rocket, Sparkles } from "lucide-react";
import about from "../assets/about.webp";
import TiltCard from "./TiltCard";
import { profile, stats } from "../data/portfolio";

const highlights = [
  { icon: Code2, title: "Clean Code", text: "Readable, reusable components" },
  { icon: Rocket, title: "Performance", text: "Fast loading on every device" },
  { icon: Sparkles, title: "3D & Motion", text: "Interactive, animated UI" },
];

const About = ({ darkMode }) => {
  const card = darkMode ? "bg-white/5 border-white/10" : "bg-white/80 border-orange-100";
  return (
    <section id="about" className="relative min-h-svh overflow-hidden flex items-center justify-center px-4 sm:px-6 py-20">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-12 items-center">
        {/* Rasm — 3D kartada */}
        <figure data-aos="fade-up" className="flex justify-center">
          <TiltCard className="group rounded-3xl" max={15}>
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96" style={{ transformStyle: "preserve-3d" }}>
              <div
                className="absolute -inset-8 lg:-inset-16 bg-linear-to-br from-[#f97316] via-[#fb923c] to-[#f59e0b] star-shape star-spin opacity-80"
                style={{ transform: "translateZ(-40px)" }}
              />
              <img
                src={about}
                alt="About me"
                className="absolute inset-0 h-full w-full object-cover rounded-3xl drop-shadow-2xl"
                style={{ transform: "translateZ(40px)" }}
              />
              <div
                className={`absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-md ${card} ${darkMode ? "text-white" : "text-gray-800"}`}
                style={{ transform: "translateZ(70px)" }}
              >
                <MapPin className="h-4 w-4 text-orange-500" /> {profile.location}
              </div>
            </div>
          </TiltCard>
        </figure>

        <article data-aos="fade-left" className="text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 text-transparent bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text">
            About Me
          </h2>
          <p
            className={`text-sm sm:text-base lg:text-lg mb-8 leading-relaxed bg-linear-to-r from-orange-900/10 to-orange-900/5 p-4 sm:p-6 rounded-2xl backdrop-blur-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            {profile.about}
          </p>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -6 }}
                data-aos="zoom-in"
                data-aos-delay={300 + i * 100}
                className={`rounded-2xl border p-3 sm:p-4 text-center ${card}`}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-400">{s.value}</div>
                <div className={`text-xs sm:text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className={`flex sm:flex-col items-center sm:items-start gap-3 rounded-2xl border p-4 text-left ${card}`}>
                <Icon className="h-6 w-6 shrink-0 text-orange-500" />
                <div>
                  <div className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{title}</div>
                  <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{text}</div>
                </div>
              </div>
            ))}
          </div>

          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-amber-500 py-3 px-8 text-base sm:text-lg font-semibold text-white shadow-lg shadow-orange-500/30 hover:shadow-[0_0_40px_rgba(255,165,0,0.7)]"
          >
            See My Work
          </motion.a>
        </article>
      </div>
    </section>
  );
};

export default About;
