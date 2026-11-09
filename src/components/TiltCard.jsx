import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIsTouch } from "../hooks";

/** Sichqoncha harakatiga qarab 3D egiladigan karta. Telefonda oddiy karta bo'lib qoladi. */
const TiltCard = ({ children, className = "", max = 12, ...rest }) => {
  const isTouch = useIsTouch();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(x, (v) => `${v * 100}%`);
  const glareY = useTransform(y, (v) => `${v * 100}%`);
  const glare = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.18), transparent 60%)`
  );

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  if (isTouch) {
    return (
      <motion.div whileTap={{ scale: 0.98 }} className={`relative ${className}`} {...rest}>
        {children}
      </motion.div>
    );
  }

  return (
    <div style={{ perspective: 1000 }} className="h-full" {...rest}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative h-full ${className}`}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  );
};

export default TiltCard;
