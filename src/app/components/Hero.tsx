import { motion } from "motion/react";
import { Code2, Cpu, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 text-center">
        {/* Profile Image with animated border */}
        <motion.div
          className="relative inline-block mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-md"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ padding: "4px" }}
          />

          {/* Image container */}
          <motion.div
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-4 border-slate-900"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <ImageWithFallback
              src="/profile.jpeg"
              alt="Profile image"
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 hover:opacity-100 transition-opacity"
            />
          </motion.div>
        </motion.div>
        {/* Animated icons */}
        <motion.div
          className="flex justify-center gap-8 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Code2 className="w-12 h-12 text-purple-400" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <Cpu className="w-12 h-12 text-blue-400" />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-12 h-12 text-pink-400" />
          </motion.div>
        </motion.div>

        {/* Name with gradient animation */}
        <motion.h1
          className="mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          AMAN E ROME
        </motion.h1>

        {/* Subtitle with typewriter effect */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-2xl text-purple-200 mb-2">
            Full-Stack Developer | IoT & AI Specialist
          </p>
          <p className="text-xl text-blue-200">Real-World Project Developer</p>
        </motion.div>

        {/* Summary */}
        <motion.p
          className="max-w-3xl mx-auto text-lg text-gray-300 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Innovative Full-Stack Developer with expertise in designing and
          deploying real-world IoT and software solutions. Specialized in
          end-to-end application development, hardware-software integration, and
          AI-driven systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-6 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.a
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 bg-slate-800 text-white rounded-lg border-2 border-purple-500 shadow-lg"
            whileHover={{ scale: 1.05, borderColor: "#ec4899" }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
