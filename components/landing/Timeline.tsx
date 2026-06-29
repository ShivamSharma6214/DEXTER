"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Monitor, MessageSquare, Mic, Brain, Cpu, Eye, Layers, Puzzle, Globe, Cloud, Users } from "lucide-react";

const stages = {
  current: {
    label: "Current",
    items: [
      {
        icon: Monitor,
        title: "Desktop Overlay",
        description: "A floating interface layer that sits on top of your entire desktop. Always available, never intrusive.",
      },
      {
        icon: MessageSquare,
        title: "AI Chat",
        description: "Converse naturally with your computer. Ask questions, get help, and receive contextual answers.",
      },
      {
        icon: Mic,
        title: "Voice Input",
        description: "Speak to Dextra. Natural language commands, dictation, and hands-free interaction.",
      },
      {
        icon: Cpu,
        title: "Core Architecture",
        description: "Modular, extensible engine designed to grow with every feature added.",
      },
    ],
  },
  next: {
    label: "In Progress",
    items: [
      {
        icon: Eye,
        title: "Screen Understanding",
        description: "Dextra sees what you see. Reads your screen, understands UI elements, and acts on visual context.",
      },
      {
        icon: Brain,
        title: "Context Awareness",
        description: "Knows your entire desktop state. Files, windows, clipboard, and running processes.",
      },
      {
        icon: Layers,
        title: "Memory",
        description: "Remembers your preferences, habits, and workflows. Gets smarter with every interaction.",
      },
      {
        icon: Puzzle,
        title: "Workflow Automation",
        description: "Learns your repetitive tasks and automates them. Create custom workflows with natural language.",
      },
    ],
  },
  future: {
    label: "Future Vision",
    items: [
      {
        icon: Globe,
        title: "Browser Control",
        description: "Navigate the web, fill forms, and interact with web apps through natural language.",
      },
      {
        icon: Cpu,
        title: "Plugin SDK",
        description: "Third-party plugin ecosystem. Custom integrations. Developer SDK.",
      },
      {
        icon: Cloud,
        title: "Cloud Sync",
        description: "Cross-device synchronization. Settings, memories, and workflows follow you everywhere.",
      },
      {
        icon: Users,
        title: "Team Collaboration",
        description: "Share workflows, team-level context, and collaborative AI assistance.",
      },
    ],
  },
};

function StageCard({ item, index }: { item: (typeof stages.current.items)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 h-full">
        <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-3 group-hover:border-[#4F8CFF]/20 transition-colors duration-500">
          <Icon className="w-4 h-4 text-white/40 group-hover:text-[#4F8CFF] transition-colors duration-500" />
        </div>
        <h3 className="text-base font-semibold text-white/90 mb-1.5">{item.title}</h3>
        <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

function StageSection({
  stage,
  label,
  delay,
  glowColor,
}: {
  stage: (typeof stages)["current"];
  label: string;
  delay: number;
  glowColor: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-2 h-2 rounded-full" style={{ background: glowColor, boxShadow: `0 0 8px ${glowColor}` }} />
        <span className="text-sm font-semibold text-white/60 uppercase tracking-widest">{label}</span>
        <div className="flex-1 h-px bg-white/5" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stage.items.map((item, i) => (
          <StageCard key={i} item={item} index={i + delay} />
        ))}
      </div>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="roadmap" ref={sectionRef} className="relative py-32 sm:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 noise-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]" />
            <span className="text-xs text-white/50 tracking-wide uppercase">Roadmap</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Building the
            <br />
            <span className="text-[#4F8CFF]">AI Operating Layer.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-white/40 max-w-2xl mx-auto"
          >
            One milestone at a time. No artificial deadlines. Just honest progress toward intelligence for every computer.
          </motion.p>
        </div>

        {/* Progress line */}
        <div className="mb-16 relative h-px bg-white/5">
          <motion.div
            className="h-full bg-[#4F8CFF]/20"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Stages */}
        <StageSection
          stage={stages.current}
          label="Current"
          delay={0}
          glowColor="#4F8CFF"
        />
        <StageSection
          stage={stages.next}
          label="In Progress"
          delay={0.3}
          glowColor="#4F8CFF"
        />
        <StageSection
          stage={stages.future}
          label="Future Vision"
          delay={0.6}
          glowColor="rgba(255,255,255,0.3)"
        />

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-white/30">
            Roadmap is a living document. Priorities shift based on what early users actually need.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
