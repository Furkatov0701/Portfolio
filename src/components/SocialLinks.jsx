import youTube from "../assets/youtube.png";
import tiktok from "../assets/tiktok.png";
import instagram from "../assets/instagram.jpg";
import gitHub from "../assets/github.webp";
import { socials } from "../data/portfolio";

const icons = { instagram, tiktok, github: gitHub, youtube: youTube };

const SocialLinks = ({ darkMode, className = "", size = "w-9 h-9 sm:w-10 sm:h-10" }) => (
  <div className={`flex justify-center lg:justify-start gap-4 sm:gap-5 ${className}`}>
    {socials.map((s, i) => (
      <a
        key={s.key}
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={s.name}
        data-aos="zoom-in"
        data-aos-delay={200 + i * 100}
        className="rounded-xl p-1 transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
      >
        <img src={s.icon ?? icons[s.key]} alt={s.name} className={`${size} object-contain rounded-lg ${darkMode ? "" : "brightness-90"}`} />
      </a>
    ))}
  </div>
);

export default SocialLinks;
