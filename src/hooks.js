import { useEffect, useState } from "react";

const query = (q) => typeof window !== "undefined" && window.matchMedia(q).matches;

/** Telefon / planshet (kichik ekran) ekanini aniqlaydi */
export function useIsMobile(breakpoint = 768) {
  const q = `(max-width: ${breakpoint - 1}px)`;
  const [isMobile, setIsMobile] = useState(() => query(q));
  useEffect(() => {
    const mq = window.matchMedia(q);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [q]);
  return isMobile;
}

/** Sensorli ekran (sichqoncha yo'q) */
export function useIsTouch() {
  const [touch] = useState(() => query("(hover: none), (pointer: coarse)"));
  return touch;
}

/** Foydalanuvchi animatsiyani kamaytirishni so'raganmi */
export function useReducedMotion() {
  const [reduced] = useState(() => query("(prefers-reduced-motion: reduce)"));
  return reduced;
}

/** Brauzer WebGL ni qo'llab-quvvatlaydimi */
export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

/** Element ekranga yaqinlashganda true bo'ladi (3D sahnani kech yuklash uchun) */
export function useInView(ref, rootMargin = "200px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}
