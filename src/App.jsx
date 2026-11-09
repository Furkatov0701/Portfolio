import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const getInitialMode = () => {
  const saved = localStorage.getItem("theme");
  return saved ? saved === "dark" : true;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(getInitialMode);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 60, disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", darkMode ? "#0d182e" : "#fff7ed");
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
        darkMode ? "bg-linear-to-br from-gray-900 via-[#0d182e] to-gray-900" : "bg-linear-to-br from-orange-50 via-white to-blue-50"
      }`}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((d) => !d)} />
      <main>
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default App;
