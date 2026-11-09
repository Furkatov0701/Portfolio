import { ArrowUp, Heart } from "lucide-react";
import { profile } from "../data/portfolio";

const Footer = ({ darkMode }) => (
  <footer className={`border-t px-4 py-8 ${darkMode ? "border-white/10 text-gray-400" : "border-orange-100 text-gray-600"}`}>
    <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 text-sm">
      <p className="text-center sm:text-left">
        © {new Date().getFullYear()} <span className="font-semibold text-orange-500">{profile.name}</span>. Made with{" "}
        <Heart className="inline h-4 w-4 fill-red-500 text-red-500" /> React & Three.js
      </p>
      <a
        href="#home"
        aria-label="Back to top"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-lg transition-transform hover:-translate-y-1"
      >
        <ArrowUp className="h-5 w-5" />
      </a>
    </div>
  </footer>
);

export default Footer;
