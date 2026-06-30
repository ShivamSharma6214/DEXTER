"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Mic,
  Eye,
  Monitor,
  Brain,
  Zap,
  Database,
  Globe,
  Layers,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice Understanding",
    description: "Speak naturally. Dexter understands context, intent, and nuance in your voice commands.",
    size: "large",
    color: "#4F8CFF",
  },
  {
    icon: Eye,
    title: "Screen Vision",
    description: "Sees what you see. Reads your screen, understands UI elements, and acts on visual context.",
    size: "medium",
    color: "#4F8CFF",
  },
  {
    icon: Monitor,
    title: "Desktop Context",
    description: "Knows your entire desktop state. Files, windows, clipboard, and running processes.",
    size: "medium",
    color: "#4F8CFF",
  },
  {
    icon: Brain,
    title: "Cross-App Intelligence",
    description: "Connects the dots between your applications. Pulls data from one app and uses it in another seamlessly.",
    size: "large",
    color: "#4F8CFF",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Learns your repetitive tasks and automates them. Create custom workflows with natural language.",
    size: "medium",
    color: "#4F8CFF",
  },
  {
    icon: Database,
    title: "Memory",
    description: "Remembers your preferences, habits, and workflows. Gets smarter with every interaction.",
    size: "medium",
    color: "#4F8CFF",
  },
  {
    icon: Globe,
    title: "Open Source",
    description: "Fully transparent. Audit the code, contribute features, or self-host. You own your data.",
    size: "medium",
    color: "#4F8CFF",
  },
  {
    icon: Layers,
    title: "Cross Platform",
    description: "Works on macOS, Windows, and Linux. One experience, every operating system.",
    size: "medium",
    color: "#4F8CFF",
  },
  {
    icon: MessageCircle,
    title: "Natural Conversations",
    description: "No rigid commands. Talk to Dexter like you would to a colleague. Ask, delegate, and collaborate.",
    size: "medium",
    color: "#4F8CFF",
  },
];

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) / rect.width);
    y.set((e.clientY - cy) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedGrid({
  className,
  cellSize = 40,
}: {
  className?: string;
  cellSize?: number;
}) {
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      className={`absolute inset-0 overflow-hidden opacity-20 ${className}`}
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
      }}
    >
      {hoveredCell && (
        <motion.div
          className="absolute w-10 h-10 rounded-full bg-[#4F8CFF]/10"
          style={{
            left: hoveredCell.x * cellSize,
            top: hoveredCell.y * cellSize,
            width: cellSize,
            height: cellSize,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = feature.icon;
  const isLarge = feature.size === "large";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={isLarge ? "md:col-span-2" : ""}
    >
      <TiltCard className="h-full">
        <div className="relative h-full p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 overflow-hidden group">
          {/* Animated grid background */}
          <AnimatedGrid cellSize={isLarge ? 60 : 40} />

          {/* Icon */}
          <div className="relative z-10 w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-5 group-hover:border-[#4F8CFF]/30 transition-colors duration-500">
            <Icon className="w-5 h-5 text-white/40 group-hover:text-[#4F8CFF] transition-colors duration-500" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-white/90 mb-2">{feature.title}</h3>
            <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F8CFF]/[0.03] rounded-bl-full group-hover:bg-[#4F8CFF]/[0.06] transition-colors duration-500" />

          {/* Bottom line accent */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-[#4F8CFF]/0 group-hover:bg-[#4F8CFF]/20 transition-colors duration-500"
            style={{ width: "100%" }}
          />
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="features" ref={sectionRef} className="relative py-32 sm:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 noise-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]" />
            <span className="text-xs text-white/50 tracking-wide uppercase">Features</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Built for the
            <br />
            <span className="text-[#4F8CFF]">Intelligent Desktop.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-white/40 max-w-2xl mx-auto"
          >
            Every feature is designed to make your computer understand you, not the other way around.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
