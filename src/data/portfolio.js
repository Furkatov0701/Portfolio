// Barcha matnlar va havolalar shu yerda. O'zingizning ma'lumotlaringizni shu faylda o'zgartiring.

export const profile = {
  name: "Mr_Furkatovv",
  role: "Frontend Developer",
  roles: ["Frontend Developer", "React Developer", "3D Web Enthusiast", "UI / UX Lover"],
  intro:
    "I build fast, responsive and interactive web experiences with React, Tailwind CSS and Three.js. I love turning ideas into clean, animated and user-friendly interfaces.",
  about:
    "I'm a frontend developer from Uzbekistan who enjoys crafting modern websites that look great on every screen. I work mostly with React, Tailwind CSS and Three.js, and I'm always learning new tools to make the web more interactive and fun. Clean code, smooth animations and attention to detail are what I care about the most.",
  location: "Uzbekistan",
  email: "your.email@example.com", // <-- o'zingizning emailingizni yozing
  phone: "+998 XX XXX XX XX", // <-- telefon raqamingiz
  telegram: "https://t.me/your_username", // <-- telegram havolangiz
};

export const socials = [
  { name: "Instagram", key: "instagram", url: "https://instagram.com/" },
  { name: "TikTok", key: "tiktok", url: "https://tiktok.com/" },
  { name: "GitHub", key: "github", url: "https://github.com/furkatov0701" },
  { name: "YouTube", key: "youtube", url: "https://youtube.com/" },
];

export const stats = [
  { value: "5+", label: "Education" },
  { value: "1.5+", label: "Years Experience" },
  { value: "100+", label: "Projects Completed" },
];

export const skills = [
  { name: "HTML5", level: 95, color: "#e34f26" },
  { name: "CSS3", level: 90, color: "#1572b6" },
  { name: "JavaScript", level: 85, color: "#f7df1e" },
  { name: "React", level: 85, color: "#61dafb" },
  { name: "Tailwind CSS", level: 90, color: "#38bdf8" },
  { name: "Three.js", level: 65, color: "#ffffff" },
  { name: "Framer Motion", level: 75, color: "#e535ab" },
  { name: "Git & GitHub", level: 80, color: "#f05032" },
];

// 3D sferada aylanadigan texnologiyalar
export const techCloud = [
  "React", "JavaScript", "HTML", "CSS", "Tailwind", "Three.js", "Vite", "Git",
  "GitHub", "Framer", "Node.js", "Figma", "R3F", "AOS", "npm", "REST API",
  "Responsive", "UI/UX",
];

export const projects = [
  {
    title: "3D Portfolio",
    description:
      "Personal portfolio built with React, Three.js and Tailwind CSS. Interactive 3D hero scene, tilt cards and a fully responsive layout.",
    tags: ["React", "Three.js", "Tailwind"],
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    github: "https://github.com/furkatov0701/portfolio",
    demo: "#home",
  },
  {
    title: "E-commerce Store",
    description:
      "Online shop UI with product filtering, cart and checkout flow. Smooth animations and mobile-first design.",
    tags: ["React", "Context API", "Tailwind"],
    gradient: "from-pink-500 via-rose-500 to-orange-400",
    github: "https://github.com/furkatov0701",
    demo: "#",
  },
  {
    title: "Weather App",
    description:
      "Real-time weather forecast app using a public REST API, with geolocation search and animated weather icons.",
    tags: ["JavaScript", "API", "CSS"],
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    github: "https://github.com/furkatov0701",
    demo: "#",
  },
  {
    title: "Task Manager",
    description:
      "Kanban style todo application with drag & drop, local storage persistence and dark / light themes.",
    tags: ["React", "Framer Motion"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    github: "https://github.com/furkatov0701",
    demo: "#",
  },
  {
    title: "Landing Page",
    description:
      "Modern landing page for a startup with scroll animations, pricing section and a contact form.",
    tags: ["HTML", "Tailwind", "AOS"],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    github: "https://github.com/furkatov0701",
    demo: "#",
  },
  {
    title: "Movie Explorer",
    description:
      "Browse and search movies with details, ratings and trailers. Infinite scroll and skeleton loaders.",
    tags: ["React", "API", "Vite"],
    gradient: "from-red-500 via-orange-500 to-amber-400",
    github: "https://github.com/furkatov0701",
    demo: "#",
  },
];
