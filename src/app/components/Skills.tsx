import { motion } from "motion/react";
import {
  Code2,
  Database,
  Smartphone,
  Cloud,
  Cpu,
  Brain,
  GitBranch,
  Terminal,
} from "lucide-react";
import { useInView } from "../hooks/useInView";

const skillCategories = [
  {
    title: "Backend Development",
    icon: Terminal,
    skills: ["Node.js", "Express.js", "Python", "Django", "RESTful APIs"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Frontend Development",
    icon: Code2,
    skills: ["React.js", "React Native", "Tailwind CSS", "HTML5", "CSS3"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: ["React Native", "Flutter", "Cross-platform Apps"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "IoT & Hardware",
    icon: Cpu,
    skills: ["Arduino", "ESP32", "Sensor Integration", "Real-time Processing"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: ["TensorFlow", "OpenCV", "Facial Recognition", "Computer Vision"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "Docker", "Firebase", "Git"],
    color: "from-teal-500 to-green-500",
  },
  {
    title: "Tools & Methodologies",
    icon: GitBranch,
    skills: ["Git", "Agile", "Postman", "Figma"],
    color: "from-rose-500 to-pink-500",
  },
];

export function Skills() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="content-inner">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4" style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Core Competencies
          </h2>
          <p className="text-xl text-gray-400">
            Full-stack expertise across modern technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-12">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl relative overflow-hidden group"
              >
                {/* Animated gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10`}
                  initial={false}
                  animate={{ opacity: [0.05, 0.1, 0.05] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-3 bg-gradient-to-br ${category.color} rounded-xl mb-4`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Category Title */}
                  <h3 className="text-white text-lg mb-4">{category.title}</h3>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + skillIndex * 0.1,
                        }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: skillIndex * 0.2,
                          }}
                        />
                        <span className="text-gray-300 text-sm">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
