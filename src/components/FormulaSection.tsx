"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const formulaParts = [
  { text: "Честность", color: "from-primary to-blue-400" },
  { text: "Технологии", color: "from-secondary to-purple-400" },
  { text: "Данные", color: "from-accent to-emerald-400" },
  { text: "Люди", color: "from-orange-500 to-amber-400" },
  { text: "Инновации", color: "from-pink-500 to-rose-400" },
  { text: "Ответственность", color: "from-cyan-500 to-teal-400" },
];

interface FormulaSectionProps {
  locale: string;
}

export default function FormulaSection({ locale }: FormulaSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-accent mb-8">
            Формула культуры SEN
          </span>

          {/* Formula */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-12">
            {formulaParts.map((part, index) => (
              <motion.div
                key={part.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 md:gap-4"
              >
                <span
                  className={`text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${part.color} bg-clip-text text-transparent`}
                >
                  {part.text}
                </span>
                {index < formulaParts.length - 1 && (
                  <span className="text-2xl md:text-3xl text-muted font-light">
                    +
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Equals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-8"
          >
            <span className="text-4xl md:text-5xl text-white font-bold">=</span>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent blur-3xl opacity-20" />
            <h2 className="relative text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Экосистема доверия будущего
              </span>
            </h2>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex justify-center gap-8"
          >
            {formulaParts.map((part, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${part.color}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

