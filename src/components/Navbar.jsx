import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Sun, Moon, X, Menu } from "lucide-react";
import { profile } from "../data/portfolio";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [active, setActive] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  // Qaysi bo'lim ekranda ekanini kuzatib, menyuda belgilaydi
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Mobil menyu ochiq bo'lsa: Esc bilan yopish
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const navBg = darkMode ? "bg-gray-900/70 border-white/10" : "bg-white/70 border-orange-100";
  const text = darkMode ? "text-gray-300" : "text-gray-800";

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-linear-to-r from-orange-500 to-amber-400" />

      <div className={`fixed inset-x-0 z-50 flex justify-center px-3 transition-all duration-300 ${scrolled ? "top-2" : "top-4"}`}>
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative w-full max-w-5xl rounded-2xl border px-4 lg:px-6 py-2 shadow-lg backdrop-blur-xl ${navBg}`}
        >
          <div className="flex items-center justify-between gap-4">
            <motion.a href="#home" whileHover={{ scale: 1.05 }} className="text-lg sm:text-xl font-bold">
              <span className={darkMode ? "text-white" : "text-gray-900"}>{profile.name}</span>
              <span className="text-orange-500">.</span>
            </motion.a>

            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="relative py-1">
                  <span className={`font-medium transition-colors ${active === item.id ? "text-orange-500" : `${text} hover:text-orange-500`}`}>
                    {item.name}
                  </span>
                  {active === item.id && (
                    <motion.div layoutId="navbar-indicator" className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-orange-500 to-amber-500" />
                  )}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className={`rounded-full p-2 ${darkMode ? "bg-gray-700" : "bg-orange-100"}`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-gray-700" />}
              </motion.button>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:block rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-6 py-2 font-semibold text-white shadow-md hover:shadow-lg"
              >
                Hire Me
              </motion.a>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen((v) => !v)}
                className={`lg:hidden rounded-lg p-2 ${darkMode ? "bg-gray-700 text-white" : "bg-orange-100 text-gray-700"}`}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className={`absolute left-0 right-0 top-full mt-2 lg:hidden rounded-2xl border shadow-xl backdrop-blur-xl ${
                  darkMode ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-orange-100"
                }`}
              >
                <div className="space-y-1 p-3">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`block rounded-xl px-4 py-3 text-center font-medium ${
                        active === item.id ? `text-orange-500 ${darkMode ? "bg-gray-800" : "bg-orange-50"}` : text
                      }`}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  <a
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-xl bg-linear-to-r from-orange-500 to-amber-500 px-4 py-3 text-center font-semibold text-white shadow-md"
                  >
                    Hire Me
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;
