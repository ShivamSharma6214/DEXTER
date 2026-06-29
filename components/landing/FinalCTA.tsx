"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Rocket, Map } from "lucide-react";

function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) / 8);
    y.set((e.clientY - cy) / 8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div style={{ x: springX, y: springY }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="alpha" ref={sectionRef} className="relative py-32 sm:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 noise-bg" />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(79, 140, 255, 0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 flex items-center justify-center mx-auto">
            <Rocket className="w-8 h-8 text-[#4F8CFF]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Be Part of the
            <br />
            <span className="text-[#4F8CFF]">First Wave.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            Early Alpha access is limited. We are looking for curious users who want to shape the future of desktop AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <MagneticButton className="w-full sm:w-auto">
            <motion.button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative flex items-center gap-3 px-10 py-5 rounded-xl bg-white text-black font-semibold text-base overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Join the Alpha</span>
              <motion.span
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-[#4F8CFF]"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "0%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.button>
          </MagneticButton>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <a
              href="#"
              className="flex items-center gap-2 px-8 py-3 rounded-xl border border-white/10 text-white font-medium text-sm hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              <Map className="w-4 h-4" />
              View Roadmap
            </a>
            <a
              href="#built-in-public"
              className="flex items-center gap-2 px-8 py-3 rounded-xl border border-white/10 text-white font-medium text-sm hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              <Rocket className="w-4 h-4" />
              How We Build
            </a>
          </div>

          <p className="text-sm text-white/30 mt-6">
            Free during alpha. Limited spots. No spam, no selling your data.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
