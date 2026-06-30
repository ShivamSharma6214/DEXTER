"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { FlaskConical, Telescope, ArrowUpRight, MessageSquare, Code, Lightbulb, Github } from "lucide-react";

const githubRepoUrl = "https://github.com/sharmashivam6214-cmd/DEXTRA.git";

function MagneticCard({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) / 20);
    y.set((e.clientY - cy) / 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <motion.div style={{ x: springX, y: springY }} className="h-full">
        {children}
      </motion.div>
    </motion.div>
  );
}

const pillars = [
  {
    icon: FlaskConical,
    title: "Active Development",
    description: "Built in real time. Features ship weekly. The codebase evolves openly as Dextra finds its shape.",
  },
  {
    icon: Telescope,
    title: "Early Adopters Shape It",
    description: "Every piece of feedback is read. Early users are not just testers — they are co-designers.",
  },
  {
    icon: Lightbulb,
    title: "Feedback Over Hype",
    description: "Real conversations, not marketing. Honest feedback is more valuable than social proof.",
  },
  {
    icon: Code,
    title: "Transparent Build",
    description: "The goal is to build the AI operating layer for every computer. The process is open and documented.",
  },
];

export default function BuiltInPublic() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="built-in-public" ref={sectionRef} className="relative py-32 sm:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 gradient-mesh" />
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
            <span className="text-xs text-white/50 tracking-wide uppercase">Built in Public</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Building in the Open.
            <br />
            <span className="text-[#4F8CFF]">With Your Input.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-white/40 max-w-2xl mx-auto"
          >
            Dextra is under active development. Early users can influence its direction. The goal is to build the AI operating layer for every computer.
          </motion.p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <MagneticCard key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] h-full group hover:bg-white/[0.04] transition-colors duration-500">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:border-[#4F8CFF]/20 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-white/40 group-hover:text-[#4F8CFF] transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 mb-2">{pillar.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{pillar.description}</p>
                </div>
              </MagneticCard>
            );
          })}
        </div>

        {/* Connect CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href="mailto:hello@dextra.ai"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-white font-medium text-sm hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              Share Feedback
              <ArrowUpRight className="w-3 h-3 text-white/40" />
            </a>
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-white font-medium text-sm hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              View GitHub
              <ArrowUpRight className="w-3 h-3 text-white/40" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
