import { lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DownloadIcon, Mail, ChevronDown } from "lucide-react";
import CV from "../assets/CV.png";
import hero from "../assets/hero.png";
import hi from "../assets/hi.png";
import Lazy3D from "./Lazy3D";
import SocialLinks from "./SocialLinks";
import { profile } from "../data/portfolio";
import { useIsMobile, useReducedMotion } from "../hooks";

const HeroScene = lazy(() => import("./three/HeroScene"));

/** Kasblarni navbat bilan yozib chiqadigan effekt */
function useTypewriter(words, disabled) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (disabled) return;
    let w = 0, i = words[0].length, deleting = true, timer;
    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      setText(word.slice(0, i));
      let delay = deleting ? 45 : 90;
      if (!deleting && i === word.length) { deleting = true; delay = 1600; }
      else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 1600);
    return () => clearTimeout(timer);
  }, [words, disabled]);
  return text;
}

const Hero = ({ darkMode }) => {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const role = useTypewriter(profile.roles, reduced);

  const fallback = (
    <div className="relative flex h-full w-full items-center justify-center">
      <img src={hero} alt="Hero" className="w-4/5 max-w-sm h-auto object-contain" />
    </div>
  );

  return (
    <section id="home" className="relative overflow-hidden min-h-svh flex items-center pt-28 pb-16 lg:pt-24">
      {/* Fon bezaklari */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-4 sm:px-8 lg:px-14">
        {/* Matn */}
        <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <SocialLinks darkMode={darkMode} className="mb-6 sm:mb-7" />

          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Hi, I'm{" "}
            <span className="text-transparent bg-linear-to-r from-orange-400 via-amber-400 to-orange-600 bg-clip-text">
              {profile.name}
            </span>
          </h1>

          <p className="mb-5 h-8 text-lg sm:text-2xl font-semibold text-orange-500" data-aos="fade-up" data-aos-delay="400">
            {role}
            <span className="ml-0.5 inline-block w-0.5 h-6 align-middle bg-orange-500 animate-pulse" />
          </p>

          <p
            className={`mb-8 leading-relaxed max-w-md sm:max-w-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {profile.intro}
          </p>

          <div className="flex w-full flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4" data-aos="fade-up" data-aos-delay="600">
            <motion.a
              href={CV}
              download="CV.png"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-white shadow-lg shadow-orange-500/30 transition-shadow hover:shadow-[0_0_40px_rgba(255,165,0,0.7)]"
            >
              <DownloadIcon className="mr-2 h-5 w-5" /> Download CV
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center justify-center rounded-full border-2 border-orange-500 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold transition-colors hover:bg-orange-500 hover:text-white ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              <Mail className="mr-2 h-5 w-5" /> Contact Me
            </motion.a>
          </div>
        </div>

        {/* 3D sahna */}
        <div className="relative order-1 lg:order-2 h-[340px] sm:h-[440px] lg:h-[560px] w-full fade-in">
          <Lazy3D className="absolute inset-0" fallback={fallback}>
            {(active) => <HeroScene darkMode={darkMode} isMobile={isMobile} active={active} />}
          </Lazy3D>
          <img
            src={hi}
            alt=""
            aria-hidden
            className="pointer-events-none absolute top-2 left-4 sm:left-12 z-10 h-14 w-14 sm:h-20 sm:w-20 object-contain animate-bounce opacity-90"
          />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex animate-bounce ${darkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </section>
  );
};

export default Hero;
