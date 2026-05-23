import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── EmailJS integration ───────────────────────────────────────────────────────
// To enable real email sending:
// 1. Sign up at https://emailjs.com (free tier: 200 emails/month)
// 2. Create a Service (Gmail/Outlook), a Template, get your Public Key
// 3. Replace the three placeholders below
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz456"
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "AbCdEfGhIj..."

async function sendViaEmailJS({ name, email, subject, message }) {
  const payload = {
    service_id:  EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id:     EMAILJS_PUBLIC_KEY,
    template_params: { from_name: name, from_email: email, subject, message },
  };
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("EmailJS error " + res.status);
}
// ──────────────────────────────────────────────────────────────────────────────

// ─── useInView hook ────────────────────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsInView(true); },
      { threshold: options.threshold ?? 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, isInView };
}

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(words, speed = 90, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, display.length + 1));
        if (display.length + 1 === word.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setDisplay(word.slice(0, display.length - 1));
        if (display.length - 1 === 0) { setDeleting(false); setIdx(i => i + 1); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [display, deleting, idx, words, speed, pause]);
  return display;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",       href: "#hero" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

const PROJECTS = [
  {
    title: "Smart Garbage Management System",
    description: "End-to-end IoT solution integrating ESP32 sensors with a cloud platform. Features real-time bin monitoring, automated SMS/email notifications, and GPS tracking for waste-collection teams.",
    tech: ["ESP32", "Flutter", "Firebase", "Arduino", "Real-time DB"],
    badge: "Deployed", badgeColor: "#22c55e",
    impact: "Reduced collection time by 40%",
    gradient: "135deg, #16a34a, #059669",
    icon: "🗑️",
  },
  {
    title: "Gym Management Website",
    description: "Comprehensive platform with member portal, class scheduling, billing, and an admin dashboard. Automated attendance tracking and Stripe payment integration for seamless operations.",
    tech: ["HTML", "CSS", "PHP", "MySQL"],
    badge: "Live", badgeColor: "#3b82f6",
    impact: "500+ active members",
    gradient: "135deg, #ea580c, #dc2626",
    icon: "💪",
  },
  {
    title: "Couple Nest Application",
    description: "Social networking platform for couples with real-time messaging, compatibility matching, relationship timelines, and shared media. Cross-platform mobile app built with Flutter.",
    tech: ["Flutter", "Dart", "Firebase", "Cloudinary"],
    badge: "Launched", badgeColor: "#ec4899",
    impact: "1,000+ active users",
    gradient: "135deg, #db2777, #e11d48",
    icon: "💞",
  },
  {
    title: "Forensic Facial Recognition System",
    description: "AI-powered forensic identification tool using jaw geometry and face-contour analysis. Integrates computer-vision pipelines with law-enforcement databases for suspect identification.",
    tech: ["Python", "TensorFlow", "OpenCV", "Deep Learning"],
    badge: "In Development", badgeColor: "#a855f7",
    impact: "Next-gen forensic tool",
    gradient: "135deg, #7c3aed, #2563eb",
    icon: "🔍",
  },
];

const SKILLS = [
  { title: "Backend",      icon: "⚙️",  items: ["Node.js", "Express.js", "Python", "Django", "RESTful APIs"],                color: "#22c55e" },
  { title: "Frontend",     icon: "🖥️",  items: ["React.js", "React Native", "Tailwind CSS", "HTML5", "CSS3"],               color: "#3b82f6" },
  { title: "Databases",    icon: "🗄️",  items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],                              color: "#a855f7" },
  { title: "Mobile",       icon: "📱",  items: ["React Native", "Flutter", "Cross-platform Apps"],                          color: "#f97316" },
  { title: "IoT & HW",     icon: "🔌",  items: ["Arduino", "ESP32", "Sensor Integration", "Real-time Processing"],          color: "#eab308" },
  { title: "AI / ML",      icon: "🧠",  items: ["TensorFlow", "OpenCV", "Facial Recognition", "Computer Vision"],           color: "#6366f1" },
  { title: "Cloud/DevOps", icon: "☁️",  items: ["AWS", "Docker", "Firebase", "Git/GitHub"],                                color: "#14b8a6" },
  { title: "Tools",        icon: "🛠️",  items: ["Git", "Agile / Scrum", "Postman", "Figma"],                               color: "#f43f5e" },
];

const EXPERIENCES = [
  {
    role: "Full-Stack Developer",
    company: "Self-Employed / Freelance",
    period: "2023 – Present",
    location: "Remote",
    highlights: [
      "Delivered production-grade web and mobile applications end-to-end",
      "Engineered IoT solutions with ESP32 / Arduino and cloud back-ends",
      "Built cross-platform mobile apps in Flutter with 1,000+ downloads",
      "Designed AI-powered facial recognition system for forensics",
      "Managed full project life-cycles: requirements → deployment → support",
    ],
    gradient: "135deg, #7c3aed, #db2777",
  },
  {
    role: "Sales Representative & Catalogue Editor",
    company: "Zamashops",
    period: "Mar 2024 – Feb 2025",
    location: "Mingora, Pakistan",
    highlights: [
      "Optimised product catalogue presentation across multiple marketplaces",
      "Drove a 30 % increase in online sales through strategic listing work",
      "Maintained a 95 %+ customer satisfaction rating consistently",
      "Coordinated photography, copywriting and SEO for 300+ SKUs",
    ],
    gradient: "135deg, #2563eb, #0891b2",
  },
  {
    role: "Co-Facilitator, English Proficiency Programme",
    company: "Youth Development Institute",
    period: "Nov 2021 – Mar 2022",
    location: "Mingora, Pakistan",
    highlights: [
      "Co-facilitated training for 50+ trainees across four language skills",
      "Developed assessment tools and tailored training materials",
      "Conducted continuous progress evaluations and 1-on-1 coaching",
      "Received an internship offer letter directly from the CEO",
    ],
    gradient: "135deg, #16a34a, #0d9488",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(2,6,23,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(139,92,246,0.2)" : "none",
        transition: "all 0.3s ease",
        padding: "0 1.5rem",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <motion.span
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNav("#hero")}
          style={{ cursor: "pointer", fontSize: "1.2rem", fontWeight: 700, background: "linear-gradient(90deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          AE ROME
        </motion.span>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "0.25rem" }} className="nav-desktop">
          {NAV_LINKS.map(l => (
            <motion.button
              key={l.href}
              onClick={() => handleNav(l.href)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: active === l.href ? "rgba(139,92,246,0.2)" : "transparent",
                border: active === l.href ? "1px solid rgba(139,92,246,0.5)" : "1px solid transparent",
                color: active === l.href ? "#c4b5fd" : "#94a3b8",
                borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: "0.88rem",
                transition: "all 0.2s",
              }}
            >
              {l.label}
            </motion.button>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "1.5rem" }}
          className="nav-burger"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden", background: "rgba(2,6,23,0.97)", padding: "0 1.5rem 1rem" }}
          >
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: "#94a3b8", padding: "10px 0", cursor: "pointer", fontSize: "1rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) { .nav-burger { display: none !important; } }
        @media (max-width: 767px) { .nav-desktop { display: none !important; } }
      `}</style>
    </motion.nav>
  );
}

function HeroSection() {
  const roles = useTypewriter([
    "Full-Stack Developer",
    "IoT & AI Specialist",
    "Flutter App Engineer",
    "Real-World Problem Solver",
  ]);

  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "linear-gradient(135deg, #020617 0%, #0f0a2e 50%, #020617 100%)" }}>
      {/* Mesh gradient blobs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }}
          style={{ position: "absolute", top: "10%", left: "10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 12, repeat: Infinity }}
          style={{ position: "absolute", bottom: "10%", right: "5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 10, repeat: Infinity }}
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      {/* Particles */}
      {particles.map(p => (
        <motion.div key={p.id}
          initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
          animate={{ y: [`${p.y}vh`, `${(p.y + 30) % 100}vh`], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", width: p.size, height: p.size, borderRadius: "50%", background: "rgba(167,139,250,0.5)" }}
        />
      ))}

      <div style={{ position: "relative", zIndex: 10, maxWidth: 900, margin: "0 auto", padding: "7rem 1.5rem 3rem", textAlign: "center" }}>
        {/* Avatar */}
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: "spring" }}
          style={{ display: "inline-block", position: "relative", marginBottom: "2rem" }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "conic-gradient(from 0deg, #7c3aed, #ec4899, #3b82f6, #7c3aed)", filter: "blur(4px)" }} />
          <div style={{ position: "relative", width: 160, height: 160, borderRadius: "50%", border: "4px solid #020617", overflow: "hidden", background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}>
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", fontWeight: 800, color: "white" }}>AR</div>
          </div>
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ position: "absolute", bottom: 8, right: 8, width: 20, height: 20, borderRadius: "50%", background: "#22c55e", border: "3px solid #020617" }} />
        </motion.div>

        {/* Name */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "1rem",
            background: "linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          AMAN E ROME
        </motion.h1>

        {/* Typewriter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "1.4rem", color: "#c4b5fd", fontWeight: 500 }}>{roles}</span>
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
            style={{ display: "inline-block", width: 2, height: "1.4em", background: "#a78bfa", marginLeft: 4, verticalAlign: "middle" }} />
        </motion.div>

        {/* Bio */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          style={{ maxWidth: 680, margin: "0 auto 2.5rem", color: "#94a3b8", lineHeight: 1.8, fontSize: "1.05rem" }}>
          Innovative developer with expertise in designing and deploying real-world IoT, mobile, and software solutions — from hardware-software integration to AI-driven systems.
        </motion.p>

        {/* Stat pills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "2.5rem" }}>
          {[["4+", "Projects Deployed"], ["1k+", "App Users"], ["3+", "Years Coding"], ["8+", "Tech Stacks"]].map(([n, l]) => (
            <div key={l} style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 40, padding: "8px 20px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: "1.1rem" }}>{n}</span>
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>{l}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,58,237,0.4)" }} whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "14px 32px", background: "linear-gradient(135deg, #7c3aed, #ec4899)", color: "white", border: "none", borderRadius: 10, fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>
            View Projects
          </motion.button>
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            href="/src/imports/AMAN_E_ROME_CV.pdf" download="Aman_E_Rome_CV.pdf"
            style={{ padding: "14px 32px", background: "rgba(255,255,255,0.05)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.4)", borderRadius: 10, fontWeight: 600, fontSize: "1rem", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            ↓ Download CV
          </motion.a>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "14px 32px", background: "transparent", color: "#94a3b8", border: "1px solid rgba(148,163,184,0.3)", borderRadius: 10, fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>
            Get in Touch
          </motion.button>
        </motion.div>

        {/* Scroll cue */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: 24, height: 40, border: "2px solid rgba(139,92,246,0.5)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <motion.div animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 4, height: 4, borderRadius: "50%", background: "#a78bfa" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { ref, isInView } = useInView();
  return (
    <section id="projects" ref={ref} style={{ padding: "6rem 1.5rem", background: "#0b1120" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeading title="Featured Projects" sub="Real-world applications solving complex problems" isInView={isInView} gradient="135deg, #a78bfa, #f472b6" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 520px), 1fr))", gap: "1.5rem" }}>
          {PROJECTS.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ scale: 1.02, y: -6 }}
              style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "2rem", position: "relative", overflow: "hidden", cursor: "default" }}
            >
              {/* gradient top bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(${p.gradient})` }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "2.2rem" }}>{p.icon}</div>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, padding: "4px 12px", borderRadius: 20, background: p.badgeColor + "22", color: p.badgeColor, border: `1px solid ${p.badgeColor}44` }}>
                  {p.badge}
                </span>
              </div>
              <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.75rem" }}>{p.title}</h3>
              <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.92rem", marginBottom: "1.25rem" }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                {p.tech.map(t => (
                  <span key={t} style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: 6, background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: `linear-gradient(${p.gradient})`, fontSize: "0.8rem", color: "white", fontWeight: 600 }}>
                ✦ {p.impact}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const { ref, isInView } = useInView();
  return (
    <section id="skills" ref={ref} style={{ padding: "6rem 1.5rem", background: "linear-gradient(180deg, #0b1120 0%, #020617 100%)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeading title="Core Competencies" sub="Full-stack expertise across modern technologies" isInView={isInView} gradient="135deg, #60a5fa, #a78bfa" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
          {SKILLS.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -6 }}
              style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "1.5rem", position: "relative", overflow: "hidden" }}
            >
              <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: s.color + "18", filter: "blur(20px)" }} />
              <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{s.icon}</div>
              <h3 style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: "0.75rem", fontSize: "0.95rem" }}>{s.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                {s.items.map((item, j) => (
                  <motion.div key={item}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.08 + j * 0.06 }}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: j * 0.3 }}
                      style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                    <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const { ref, isInView } = useInView();
  return (
    <section id="experience" ref={ref} style={{ padding: "6rem 1.5rem", background: "#020617" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <SectionHeading title="Professional Experience" sub="Building real-world solutions since 2021" isInView={isInView} gradient="135deg, #34d399, #60a5fa" />
        <div style={{ position: "relative" }}>
          {/* Timeline spine */}
          <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, #7c3aed, #3b82f6, #22c55e)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {EXPERIENCES.map((exp, i) => (
              <motion.div key={exp.role}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.25 }}
                style={{ paddingLeft: "3.5rem", position: "relative" }}
              >
                {/* Dot */}
                <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: i * 0.25 + 0.1 }}
                  style={{ position: "absolute", left: 8, top: 22, width: 22, height: 22, borderRadius: "50%", background: `linear-gradient(${exp.gradient})`, border: "4px solid #020617", zIndex: 1 }} />

                <motion.div whileHover={{ scale: 1.01, x: 6 }}
                  style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "1.75rem", borderLeft: `3px solid transparent`, borderImage: `linear-gradient(${exp.gradient}) 1` }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1.1rem", marginBottom: 4 }}>{exp.role}</h3>
                      <p style={{ background: `linear-gradient(${exp.gradient})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 600, fontSize: "0.95rem" }}>{exp.company}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ color: "#64748b", fontSize: "0.82rem" }}>📅 {exp.period}</p>
                      <p style={{ color: "#475569", fontSize: "0.78rem", marginTop: 2 }}>📍 {exp.location}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {exp.highlights.map((h, j) => (
                      <motion.div key={j}
                        initial={{ opacity: 0, x: -12 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.25 + j * 0.08 }}
                        style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ color: "#7c3aed", marginTop: 4, flexShrink: 0 }}>▸</span>
                        <span style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { ref, isInView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    const { name, email, subject, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in name, email and message."); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address."); return;
    }
    setError(""); setStatus("sending");
    try {
      await sendViaEmailJS({ name, email, subject, message });
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (e) {
      // If EmailJS is not configured yet, show a helpful message
      if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
        setStatus("error");
        setError("EmailJS is not configured yet. See the code comments at the top of this file to set up your Service ID, Template ID and Public Key (free at emailjs.com).");
      } else {
        setStatus("error");
        setError("Failed to send message. Please try emailing directly at iamarkhan001@gmail.com");
      }
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, color: "#f1f5f9", fontSize: "0.95rem", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const contactCards = [
    { icon: "✉️", label: "Email",    value: "iamarkhan001@gmail.com", href: "mailto:iamarkhan001@gmail.com" },
    { icon: "📞", label: "Phone",    value: "+92 349 666 2127",        href: "tel:+923496662127" },
    { icon: "📍", label: "Location", value: "Mingora, Pakistan",        href: null },
  ];

  return (
    <section id="contact" ref={ref} style={{ padding: "6rem 1.5rem", background: "linear-gradient(180deg, #020617 0%, #0b1120 100%)", position: "relative", overflow: "hidden" }}>
      {/* bg blobs */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity }}
        style={{ position: "absolute", top: "5%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <motion.div animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 12, repeat: Infinity }}
        style={{ position: "absolute", bottom: "5%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHeading title="Get In Touch" sub="Let's collaborate on your next project" isInView={isInView} gradient="135deg, #a78bfa, #f472b6" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))", gap: "3rem" }}>
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <h3 style={{ color: "#e2e8f0", fontSize: "1.2rem", fontWeight: 600, marginBottom: "1.5rem" }}>Contact Information</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
              {contactCards.map((c) => (
                <motion.a key={c.label} href={c.href || undefined}
                  whileHover={{ scale: 1.03, x: 6 }}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "#111827", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, cursor: c.href ? "pointer" : "default", textDecoration: "none" }}>
                  <span style={{ fontSize: "1.5rem" }}>{c.icon}</span>
                  <div>
                    <p style={{ color: "#64748b", fontSize: "0.75rem", margin: 0 }}>{c.label}</p>
                    <p style={{ color: "#e2e8f0", fontSize: "0.92rem", margin: 0 }}>{c.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <h4 style={{ color: "#e2e8f0", marginBottom: "1rem", fontWeight: 600 }}>Connect With Me</h4>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { icon: "🐙", label: "GitHub",   href: "https://github.com/", bg: "linear-gradient(135deg, #374151, #1f2937)" },
                { icon: "💼", label: "LinkedIn", href: "https://linkedin.com/", bg: "linear-gradient(135deg, #1d4ed8, #1e40af)" },
                { icon: "🐦", label: "Twitter",  href: "https://twitter.com/", bg: "linear-gradient(135deg, #0ea5e9, #2563eb)" },
              ].map(s => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.95 }}
                  style={{ width: 50, height: 50, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}
                  title={s.label}>
                  {s.icon}
                </motion.a>
              ))}
            </div>

            {/* Availability badge */}
            <div style={{ marginTop: "2rem", display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 18px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 40 }}>
              <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ color: "#86efac", fontSize: "0.85rem", fontWeight: 500 }}>Available for opportunities</span>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }}>
            <div style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2rem" }}>
              <h3 style={{ color: "#f1f5f9", fontWeight: 700, marginBottom: "1.5rem" }}>Send a Message</h3>

              <AnimatePresence>
                {status === "success" && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    style={{ padding: "16px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.4)", borderRadius: 10, color: "#86efac", marginBottom: "1rem", textAlign: "center" }}>
                    ✅ Message sent! I'll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <div style={{ padding: "12px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: 10, color: "#fca5a5", marginBottom: "1rem", fontSize: "0.88rem" }}>
                  ⚠️ {error}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ color: "#94a3b8", fontSize: "0.82rem", display: "block", marginBottom: 6 }}>Name *</label>
                    <input value={form.name} onChange={set("name")} placeholder="Your name" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ color: "#94a3b8", fontSize: "0.82rem", display: "block", marginBottom: 6 }}>Email *</label>
                    <input type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={{ color: "#94a3b8", fontSize: "0.82rem", display: "block", marginBottom: 6 }}>Subject</label>
                  <input value={form.subject} onChange={set("subject")} placeholder="Project enquiry / Collaboration…" style={inputStyle} />
                </div>
                <div>
                  <label style={{ color: "#94a3b8", fontSize: "0.82rem", display: "block", marginBottom: 6 }}>Message *</label>
                  <textarea rows={5} value={form.message} onChange={set("message")} placeholder="Tell me about your project…"
                    style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
                </div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  whileHover={status !== "sending" ? { scale: 1.03, boxShadow: "0 0 24px rgba(124,58,237,0.4)" } : {}}
                  whileTap={{ scale: 0.97 }}
                  style={{ padding: "14px", background: status === "sending" ? "rgba(124,58,237,0.4)" : "linear-gradient(135deg, #7c3aed, #ec4899)", color: "white", border: "none", borderRadius: 10, fontWeight: 600, fontSize: "1rem", cursor: status === "sending" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.3s" }}>
                  {status === "sending" ? (
                    <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ display: "inline-block" }}>⟳</motion.span> Sending…</>
                  ) : "✉️  Send Message"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#020617", borderTop: "1px solid rgba(139,92,246,0.15)", padding: "2.5rem 1.5rem", textAlign: "center" }}>
      <p style={{ color: "#475569", fontSize: "0.88rem" }}>
        © {new Date().getFullYear()} <span style={{ color: "#a78bfa", fontWeight: 600 }}>Aman E Rome</span>. Available for full-time or project-based opportunities.
      </p>
      <p style={{ color: "#334155", fontSize: "0.78rem", marginTop: 6 }}>
        Built with React · Framer Motion · EmailJS · Tailored with ❤️ in Mingora, Pakistan
      </p>
    </footer>
  );
}

function SectionHeading({ title, sub, isInView, gradient }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
      style={{ textAlign: "center", marginBottom: "3.5rem" }}>
      <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, background: `linear-gradient(${gradient})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.5rem" }}>
        {title}
      </h2>
      <p style={{ color: "#64748b", fontSize: "1.05rem" }}>{sub}</p>
      <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
        style={{ width: 60, height: 3, background: `linear-gradient(${gradient})`, borderRadius: 4, margin: "1rem auto 0" }} />
    </motion.div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#f1f5f9", overflowX: "hidden" }}>
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
