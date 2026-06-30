"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Globe, Code2, Terminal, MessageSquare, Music, Folder, Calendar, Mail } from "lucide-react";

const apps = [
  { icon: Globe, name: "Browser", color: "#4F8CFF", x: 10, y: 10, w: 28, h: 24 },
  { icon: Code2, name: "VS Code", color: "#4F8CFF", x: 62, y: 8, w: 30, h: 26 },
  { icon: Terminal, name: "Terminal", color: "#4F8CFF", x: 8, y: 55, w: 26, h: 22 },
  { icon: MessageSquare, name: "Discord", color: "#4F8CFF", x: 66, y: 58, w: 26, h: 20 },
  { icon: Music, name: "Spotify", color: "#4F8CFF", x: 38, y: 72, w: 28, h: 20 },
  { icon: Folder, name: "Explorer", color: "#4F8CFF", x: 72, y: 38, w: 22, h: 16 },
  { icon: Calendar, name: "Calendar", color: "#4F8CFF", x: 36, y: 38, w: 22, h: 16 },
  { icon: Mail, name: "Email", color: "#4F8CFF", x: 58, y: 80, w: 20, h: 14 },
];

function ConnectionLine({
  from,
  to,
  delay,
  visible,
}: {
  from: { x: number; y: number; w: number; h: number };
  to: { x: number; y: number; w: number; h: number };
  delay: number;
  visible: boolean;
}) {
  const fx = from.x + from.w / 2;
  const fy = from.y + from.h / 2;
  const tx = to.x + to.w / 2;
  const ty = to.y + to.h / 2;

  return (
    <motion.line
      x1={fx}
      y1={fy}
      x2={tx}
      y2={ty}
      stroke="rgba(79, 140, 255, 0.25)"
      strokeWidth="0.3"
      strokeDasharray="2 2"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
    />
  );
}

export default function DesktopScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredApp, setHoveredApp] = useState<number | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const connections = [
    [0, 1], [0, 6], [1, 6], [1, 5], [2, 3], [2, 6], [3, 7], [4, 7],
    [5, 6], [5, 7], [6, 7], [0, 2], [1, 3], [4, 6], [2, 7],
  ];

  return (
    <section id="desktop" ref={sectionRef} className="relative py-32 sm:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 noise-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          style={{ opacity, y }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]" />
            <span className="text-xs text-white/50 tracking-wide uppercase">The Vision</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
          >
            One Intelligence.
            <br />
            <span className="text-[#4F8CFF]">Every Application.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-white/40 max-w-2xl mx-auto"
          >
            Dexter sits between your applications, understanding context across every window, and helping you work seamlessly.
          </motion.p>
        </motion.div>

        {/* Interactive Desktop Scene */}
        <motion.div
          style={{ scale, opacity }}
          className="relative w-full max-w-5xl mx-auto aspect-[16/10]"
        >
          {/* Background grid */}
          <div className="absolute inset-0 rounded-3xl border border-white/5 bg-white/[0.01]" />

          <svg className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden" viewBox="0 0 100 100" preserveAspectRatio="none">
            {connections.map(([a, b], i) => (
              <ConnectionLine
                key={i}
                from={apps[a]}
                to={apps[b]}
                delay={i * 0.08}
                visible={isInView}
              />
            ))}
          </svg>

          {/* Floating App Windows */}
          {apps.map((app, i) => {
            const Icon = app.icon;
            const isHovered = hoveredApp === i;
            const isConnected = hoveredApp !== null && connections.some(
              ([a, b]) => (a === hoveredApp && b === i) || (b === hoveredApp && a === i)
            );

            return (
              <motion.div
                key={i}
                className="absolute rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden cursor-pointer"
                style={{
                  left: `${app.x}%`,
                  top: `${app.y}%`,
                  width: `${app.w}%`,
                  height: `${app.h}%`,
                }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? {
                  opacity: isHovered || hoveredApp === null ? 1 : 0.4,
                  scale: 1,
                  y: 0,
                  borderColor: isHovered || isConnected ? "rgba(79, 140, 255, 0.4)" : "rgba(255, 255, 255, 0.1)",
                } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredApp(i)}
                onMouseLeave={() => setHoveredApp(null)}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <div className="h-full flex flex-col p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-white/30" />
                      <span className="text-[10px] text-white/30">{app.name}</span>
                    </div>
                  </div>
                  <div className="flex-1 rounded-lg bg-white/[0.03] flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white/10" />
                  </div>
                </div>

                {/* Glow effect on hover */}
                {isHovered && (
                  <motion.div
                    layoutId="appGlow"
                    className="absolute inset-0 rounded-xl border border-[#4F8CFF]/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 rounded-xl bg-[#4F8CFF]/5" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {/* Central Dexter indicator */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#4F8CFF]/10 border border-[#4F8CFF]/40 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4F8CFF] animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full bg-[#4F8CFF]/10 blur-2xl animate-pulse" />
              {/* Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[#4F8CFF]/20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Feature description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center"
        >
          <p className="text-white/30 text-sm max-w-lg mx-auto">
            Hover over any application window to see how Dexter connects intelligence across your entire desktop.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
