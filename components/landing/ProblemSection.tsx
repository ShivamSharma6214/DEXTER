"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Copy, Search, Repeat, AppWindow } from "lucide-react";

function WorkflowStep({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-3"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-white/50" />
      </div>
      <span className="text-sm text-white/40 text-center max-w-[100px]">{label}</span>
    </motion.div>
  );
}

function PainPoint({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
        <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-4 group-hover:border-[#4F8CFF]/30 transition-colors duration-500">
          <Icon className="w-5 h-5 text-white/40 group-hover:text-[#4F8CFF] transition-colors duration-500" />
        </div>
        <h3 className="text-lg font-semibold text-white/90 mb-2">{title}</h3>
        <p className="text-sm text-white/40 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 sm:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 noise-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]" />
            <span className="text-xs text-white/50 tracking-wide uppercase">The Problem</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8"
          >
            Your Computer Was Never
            <br />
            Designed To <span className="text-white/30">Understand You.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed"
          >
            Today's operating systems force you to switch between applications, copy information manually, search through endless menus, and repeat the same tasks over and over. Your computer is powerful, but it's not intelligent.
          </motion.p>
        </motion.div>

        {/* Animated Workflow Diagram */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-sm text-white/30 uppercase tracking-widest mb-4">The Broken Workflow</p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 isolate">
            <WorkflowStep icon={AppWindow} label="Switch Apps" delay={0} />
            <WorkflowStep icon={Copy} label="Copy Data" delay={0.15} />
            <WorkflowStep icon={Search} label="Search Menus" delay={0.3} />
            <WorkflowStep icon={Repeat} label="Repeat Tasks" delay={0.45} />
          </div>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <PainPoint
            icon={AppWindow}
            title="Context Switching"
            description="You constantly jump between applications, losing your flow and mental context each time."
            index={0}
          />
          <PainPoint
            icon={Copy}
            title="Manual Data Transfer"
            description="Copying information from one app to another is manual, error-prone, and wastes hours every week."
            index={1}
          />
          <PainPoint
            icon={Search}
            title="Hidden Features"
            description="Powerful features in your apps are buried deep in menus. You spend more time searching than doing."
            index={2}
          />
          <PainPoint
            icon={Repeat}
            title="Repetitive Work"
            description="The same tasks, every day, over and over. Your computer should automate these, not require them."
            index={3}
          />
        </div>
      </div>
    </section>
  );
}
