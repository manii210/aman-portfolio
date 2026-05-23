import { motion } from "motion/react";
import { Briefcase, Calendar } from "lucide-react";
import { useInView } from "../hooks/useInView";

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Self-Employed / Freelance",
    period: "2023 - Present",
    location: "Remote",
    highlights: [
      "Developed and deployed multiple production-grade applications",
      "Engineered IoT solutions with Arduino and cloud integration",
      "Built cross-platform mobile applications with Flutter",
      "Created AI-powered facial recognition systems",
      "Managed end-to-end project development lifecycles",
    ],
    color: "from-purple-600 to-pink-600",
  },
  {
    role: "Sales Representative & Catalogue Editor",
    company: "Zamashops",
    period: "March 2024 - February 2025",
    location: "Mingora, Pakistan",
    highlights: [
      "Managed product catalog optimization and presentation",
      "Promoted products across multiple online marketplaces",
      "Maintained 95%+ customer satisfaction rating",
      "Contributed to 30% increase in online sales",
      "Strategic marketing and listing optimization",
    ],
    color: "from-blue-600 to-cyan-600",
  },
  {
    role: "Co-Facilitator, English Proficiency Programme",
    company: "Youth Development Institute",
    period: "November 2021 - March 2022",
    location: "Mingora, Pakistan",
    highlights: [
      "Co-facilitated training program for 50+ trainees",
      "Conducted continuous progress evaluation",
      "Received internship offer letter from CEO",
      "Developed training materials and assessment tools",
      "Enhanced four-skill competencies in students",
    ],
    color: "from-green-600 to-emerald-600",
  },
];

export function Experience() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 px-6 bg-slate-950"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="content-inner">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4" style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Professional Experience
          </h2>
          <p className="text-xl text-gray-400">Building real-world solutions</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <motion.div
                  className={`absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-br ${exp.color} border-4 border-slate-950`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                  whileHover={{ scale: 1.5 }}
                />

                {/* Content card */}
                <motion.div
                  className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl hover:shadow-2xl transition-shadow"
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-2 flex-wrap gap-4">
                      <div>
                        <h3 className="text-2xl text-white mb-2 flex items-center gap-2">
                          <Briefcase className="w-6 h-6 text-purple-400" />
                          {exp.role}
                        </h3>
                        <p className={`text-lg bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{exp.period}</span>
                        </div>
                        <p className="text-sm text-gray-500">{exp.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3">
                    {exp.highlights.map((highlight, hIndex) => (
                      <motion.div
                        key={hIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.3 + hIndex * 0.1,
                        }}
                        className="flex items-start gap-3 group"
                      >
                        <motion.div
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.color}`}
                          whileHover={{ scale: 2 }}
                        />
                        <p className="text-gray-300 group-hover:text-white transition-colors">
                          {highlight}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
