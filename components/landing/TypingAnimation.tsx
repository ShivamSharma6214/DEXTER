"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const messages = [
  "Hello.",
  "I'm Dexter.",
  "Your AI Right Hand.",
];

export default function TypingAnimation({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (isComplete) return;

    const currentMessage = messages[currentLine];
    const typeSpeed = isDeleting ? 30 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentMessage.length) {
          setDisplayText(currentMessage.substring(0, displayText.length + 1));
        } else {
          if (currentLine === messages.length - 1) {
            // Last line: pause then fade
            setTimeout(() => {
              setIsComplete(true);
              onComplete();
            }, 1200);
          } else {
            setTimeout(() => setIsDeleting(true), 800);
          }
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentMessage.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentLine((prev) => prev + 1);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentLine, isComplete, onComplete]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-2"
      >
        {messages.map((msg, i) => (
          <div key={i} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-tight">
            {msg}
            {i === messages.length - 1 && <span className="inline-block w-[3px] h-[1em] ml-1 bg-[#4F8CFF] align-middle" />}
          </div>
        ))}
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg, i) => {
        if (i < currentLine) {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/30 tracking-tight"
            >
              {msg}
            </motion.div>
          );
        }
        if (i > currentLine) return null;
        return (
          <div key={i} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-tight">
            {displayText}
            {showCursor && !isDeleting && (
              <span className="inline-block w-[3px] h-[1em] ml-1 bg-[#4F8CFF] align-middle animate-cursor-blink" />
            )}
          </div>
        );
      })}
    </div>
  );
}
