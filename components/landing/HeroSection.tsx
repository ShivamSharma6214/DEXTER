"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import TypingAnimation from "./TypingAnimation";
import { ArrowRight, Play, Map } from "lucide-react";

function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / 8;
        const dy = (e.clientY - cy) / 8;
        x.set(dx);
        y.set(dy);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div style={{ x: springX, y: springY }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}

function NeuralNetwork({ visible }: { visible: boolean }) {
  const nodes = [
    { x: 15, y: 20 },
    { x: 35, y: 15 },
    { x: 65, y: 18 },
    { x: 85, y: 25 },
    { x: 20, y: 45 },
    { x: 50, y: 40 },
    { x: 80, y: 45 },
    { x: 25, y: 65 },
    { x: 55, y: 60 },
    { x: 75, y: 68 },
    { x: 30, y: 85 },
    { x: 60, y: 80 },
    { x: 85, y: 85 },
  ];

  const connections = [
    [0, 1],
    [0, 4],
    [1, 2],
    [1, 5],
    [2, 3],
    [2, 5],
    [3, 6],
    [4, 5],
    [4, 7],
    [5, 6],
    [5, 8],
    [5, 9],
    [6, 9],
    [7, 8],
    [7, 10],
    [8, 9],
    [8, 11],
    [9, 12],
    [10, 11],
    [11, 12],
    [6, 11],
    [7, 10],
  ];

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-4xl mx-auto aspect-[16/9]"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {connections.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(79, 140, 255, 0.3)"
            strokeWidth="0.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.08, ease: "easeOut" }}
          />
        ))}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="0.8"
            fill="#4F8CFF"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur={`${2 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </motion.circle>
        ))}
      </svg>

      {[
        { label: "Browser", x: 12, y: 12, w: 22, h: 18 },
        { label: "VS Code", x: 62, y: 10, w: 26, h: 22 },
        { label: "Terminal", x: 8, y: 55, w: 20, h: 18 },
        { label: "Discord", x: 68, y: 58, w: 22, h: 16 },
        { label: "Spotify", x: 35, y: 72, w: 24, h: 16 },
        { label: "Calendar", x: 70, y: 35, w: 18, h: 14 },
        { label: "Email", x: 32, y: 38, w: 20, h: 14 },
        { label: "Files", x: 55, y: 80, w: 18, h: 12 },
      ].map((app, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg border border-white/5 overflow-hidden"
          style={{
            left: `${app.x}%`,
            top: `${app.y}%`,
            width: `${app.w}%`,
            height: `${app.h}%`,
            background: "rgba(255, 255, 255, 0.03)",
          }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5 + i * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="h-full flex flex-col p-2">
            <div className="flex items-center gap-1 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
            <div className="flex-1 rounded-md bg-white/[0.03]" />
          </div>
          <motion.div
            className="absolute -inset-1 rounded-lg border border-[#4F8CFF]/0"
            whileHover={{ borderColor: "rgba(79, 140, 255, 0.2)" }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#4F8CFF]" />
          </div>
          <div className="absolute inset-0 rounded-full bg-[#4F8CFF]/20 blur-xl animate-pulse" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [showNetwork, setShowNetwork] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 noise-bg" />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex flex-col items-center justify-center w-full px-6"
      >
        {!showNetwork ? (
          <motion.div
            className="flex flex-col items-center justify-center min-h-[60vh]"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <TypingAnimation onComplete={() => setShowNetwork(true)} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center w-full"
          >
            <div className="w-full max-w-4xl mx-auto mb-12">
              <NeuralNetwork visible={showNetwork} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
                One Intelligence.
                <br />
                <span className="text-[#4F8CFF]">Every Application.</span>
              </h1>
              <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
                dexter is an AI desktop companion that works across your entire
                computer — not inside a single app.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4F8CFF]/20 bg-[#4F8CFF]/5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse" />
                <span className="text-xs text-[#4F8CFF]/80 font-medium tracking-wide">
                  Early Alpha
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <MagneticButton>
                <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors duration-300">
                  <ArrowRight className="w-4 h-4" />
                  Request Early Access
                </button>
              </MagneticButton>

              <MagneticButton>
                <button className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white font-medium text-sm hover:bg-white/5 hover:border-white/20 transition-all duration-300">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#roadmap"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white font-medium text-sm hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <Map className="w-4 h-4" />
                  View Roadmap
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
