"use client";

import { motion } from "framer-motion";
import { Github, Twitter, MessageCircle, Heart } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Join Alpha", href: "#alpha" },
  ],
  Community: [
    { label: "Discord", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Feedback", href: "mailto:hello@dextra.ai" },
  ],
  About: [
    { label: "Built in Public", href: "#built-in-public" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "mailto:hello@dextra.ai" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative py-20 border-t border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 noise-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-[#4F8CFF]" />
              <span className="text-xl font-semibold tracking-tight">Dextra</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">
              An open-source AI desktop companion that understands your workflow.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/dextra-ai"
                className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} Dextra. Open source under MIT License.
          </p>
          <p className="text-sm text-white/30 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-[#4F8CFF]" /> by the community
          </p>
        </div>
      </div>
    </footer>
  );
}
