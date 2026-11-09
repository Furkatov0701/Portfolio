/** Sof CSS 3D aylanuvchi kub (WebGL kerak emas, telefonlarda ham yengil) */
const Cube3D = ({ gradient, label, size = 96 }) => {
  const half = size / 2;
  const faces = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];
  return (
    <div style={{ perspective: 600, width: size, height: size }}>
      <div className="cube-spin relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
        {faces.map((t, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex items-center justify-center rounded-xl border border-white/40 bg-linear-to-br ${gradient} text-white font-bold text-lg shadow-inner opacity-90`}
            style={{ transform: t, backfaceVisibility: "visible" }}
          >
            {i % 2 === 0 ? label : "</>"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cube3D;
