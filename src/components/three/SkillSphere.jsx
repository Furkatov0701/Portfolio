import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/** Fibonacci sfera: nuqtalarni sfera yuzasida tekis taqsimlaydi */
function fibonacciSphere(n, radius) {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return pts;
}

/** So'zni canvasga chizib, 3D sprite uchun tekstura yaratadi (DOM kerak emas) */
function makeLabelTexture(text, darkMode, highlighted) {
  const scale = 2;
  const font = `600 ${28 * scale}px Inter, system-ui, sans-serif`;
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d");
  ctx.font = font;
  const padX = 22 * scale;
  const w = Math.ceil(ctx.measureText(text).width + padX * 2);
  const h = 56 * scale;
  c.width = w;
  c.height = h;
  ctx.font = font;
  const r = h / 2;
  ctx.beginPath();
  ctx.roundRect(2, 2, w - 4, h - 4, r);
  ctx.fillStyle = highlighted ? "#f97316" : darkMode ? "rgba(30,41,59,0.85)" : "rgba(255,255,255,0.92)";
  ctx.fill();
  ctx.lineWidth = 3 * scale;
  ctx.strokeStyle = highlighted ? "#fdba74" : darkMode ? "rgba(251,146,60,0.55)" : "rgba(234,88,12,0.45)";
  ctx.stroke();
  ctx.fillStyle = highlighted ? "#ffffff" : darkMode ? "#fed7aa" : "#c2410c";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2 + 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return { tex, aspect: w / h };
}

function Word({ position, children, darkMode }) {
  const [hovered, setHovered] = useState(false);
  const sprite = useRef();
  const normal = useMemo(() => makeLabelTexture(children, darkMode, false), [children, darkMode]);
  const active = useMemo(() => makeLabelTexture(children, darkMode, true), [children, darkMode]);
  useEffect(() => () => { normal.tex.dispose(); active.tex.dispose(); }, [normal, active]);

  const base = 0.34;
  useFrame((_, delta) => {
    if (!sprite.current) return;
    const k = hovered ? 1.35 : 1;
    const s = THREE.MathUtils.damp(sprite.current.scale.y, base * k, 10, delta);
    sprite.current.scale.set(s * normal.aspect, s, 1);
  });

  return (
    <sprite
      ref={sprite}
      position={position}
      scale={[base * normal.aspect, base, 1]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = ""; }}
    >
      <spriteMaterial map={hovered ? active.tex : normal.tex} transparent depthWrite={false} />
    </sprite>
  );
}

function Cloud({ words, radius, darkMode, autoRotate }) {
  const group = useRef();
  const points = useMemo(() => fibonacciSphere(words.length, radius), [words.length, radius]);
  useFrame((_, delta) => {
    if (group.current && autoRotate) {
      group.current.rotation.y += delta * 0.25;
      group.current.rotation.x += delta * 0.05;
    }
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[radius * 0.82, 1]} />
        <meshBasicMaterial color={darkMode ? "#f97316" : "#ea580c"} wireframe transparent opacity={0.25} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 0.35, 32, 32]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.6} roughness={0.3} />
      </mesh>
      {words.map((w, i) => (
        <Word key={w} position={points[i]} darkMode={darkMode}>
          {w}
        </Word>
      ))}
    </group>
  );
}

export default function SkillSphere({ words, darkMode = true, isMobile = false, isTouch = false, active = true }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#fbbf24" />
      <Cloud words={words} radius={isMobile ? 2.3 : 2.6} darkMode={darkMode} autoRotate />
      {/* Telefonda sahifani aylantirish (scroll) buzilmasligi uchun drag faqat kompyuterda */}
      {!isTouch && <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />}
    </Canvas>
  );
}
