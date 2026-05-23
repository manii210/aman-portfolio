import { motion } from "motion/react";
import { Cpu, Dumbbell, Heart, ScanFace, ExternalLink } from "lucide-react";
import { useInView } from "../hooks/useInView";

const projects = [
  {
    title: "Smart Garbage Management System",
    description:
      "End-to-end IoT solution integrating Arduino sensors with cloud-based platform. Features real-time garbage monitoring, automated notifications, and GPS tracking for waste collection teams.",
    technologies: ["ESP32", "Flutter", "Firebase", "Arduino", "Real-time DB"],
    icon: Cpu,
    gradient: "from-green-600 to-emerald-600",
    status: "Deployed",
    impact: "Reduced collection time by 40%",
  },
  {
    title: "Gym Management Website",
    description:
      "Comprehensive platform with member portal, class scheduling, billing system, and admin dashboard. Automated attendance tracking and payment integration for seamless operations.",
    technologies: ["HTML", "CSS", "PHP", "MySQL"],
    icon: Dumbbell,
    gradient: "from-orange-600 to-red-600",
    status: "Live",
    impact: "500+ active members",
  },
  {
    title: "Couple Nest Application",
    description:
      "Social networking platform for couples featuring real-time messaging, matching algorithms, relationship timelines, and media sharing capabilities. Cross-platform mobile application.",
    technologies: ["Flutter", "Dart", "Firebase", "Cloudinary"],
    icon: Heart,
    gradient: "from-pink-600 to-rose-600",
    status: "Launched",
    impact: "1000+ active users",
  },
  {
    title: "Forensic Facial Recognition System",
    description:
      "Advanced AI system for forensic identification using jaw and face geometry analysis. Integrates computer vision algorithms with law enforcement databases for suspect identification.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Deep Learning"],
    icon: ScanFace,
    gradient: "from-blue-600 to-purple-600",
    status: "In Development",
    impact: "Revolutionary forensic tool",
  },
];

export function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 px-6 bg-slate-900"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="content-inner">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4" style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400">
            Real-world applications solving complex problems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-16">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-slate-800 rounded-2xl p-10 border border-slate-700 shadow-xl relative overflow-hidden group"
              >
                {/* Background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon and Status */}
                  <div className="flex justify-between items-start mb-6">
                    <motion.div
                      className={`p-4 bg-gradient-to-br ${project.gradient} rounded-xl`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <span className="px-4 py-2 bg-slate-700 text-purple-300 rounded-full text-sm">
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl text-white mb-4 flex items-center gap-2">
                    {project.title}
                    <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-700 text-blue-300 rounded-md text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Impact */}
                  <div className={`inline-block px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-lg text-sm`}>
                    Impact: {project.impact}
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
