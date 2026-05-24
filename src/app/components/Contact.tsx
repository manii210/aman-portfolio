import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe, MessageSquare } from "lucide-react";
import { useInView } from "../hooks/useInView";

const EMAILJS_SERVICE_ID = "service_ky4pwde";
const EMAILJS_TEMPLATE_ID = "template_m9gfrbh";
const EMAILJS_PUBLIC_KEY = "rsAPOMe6WMqvueyER";

async function sendViaEmailJS({ name, email, message }) {
  const payload = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    template_params: {
      from_name: name,
      from_email: email,
      message,
    },
  };

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`EmailJS error ${res.status}: ${text}`);
  }
}

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "iamarkhan001@gmail.com",
      href: "mailto:iamarkhan001@gmail.com",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 349 666 2127",
      href: "tel:+923496662127",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: "+92 349 666 2127",
      href: "https://wa.me/923496662127?text=Hello%20Aman%2C%20I%20want%20to%20talk%20about%20your%20services",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mingora, Pakistan",
      href: null,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback("");
    setStatus("loading");

    if (
      EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
      EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID" ||
      EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY"
    ) {
      setStatus("error");
      setFeedback(
        "EmailJS is not configured. Sign up at emailjs.com and replace the placeholder IDs in Contact.tsx."
      );
      return;
    }

    try {
      await sendViaEmailJS({ name, email, message });
      setStatus("success");
      setFeedback("Message sent! I will reply as soon as possible.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Unable to send message. Please try again later."
      );
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden"
    >
      {/* Animated background circles */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="content-inner">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4" style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Get In Touch
          </h2>
          <p className="text-xl text-gray-400">
            Let's collaborate on your next project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl text-white mb-8">Contact Information</h3>

            <div className="space-y-6 mb-12">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={contact.label}
                    href={contact.href || undefined}
                    target={contact.href?.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href?.startsWith("http") ? "noreferrer noopener" : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-purple-500 transition-all cursor-pointer group"
                  >
                    <div className={`p-3 bg-gradient-to-br ${contact.color} rounded-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{contact.label}</p>
                      <p className="text-white">{contact.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg text-white mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                {[
                  { icon: Github, color: "from-gray-600 to-slate-600", href: "https://github.com/manii210/aman-portfolio" },
                  { icon: Linkedin, color: "from-blue-600 to-blue-700", href: "https://www.linkedin.com/in/aman-e-rome-59b7252b0" },
                  { icon: Globe, color: "from-purple-600 to-pink-600", href: "https://aman-portfolio-eosin-ten.vercel.app/" },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-4 bg-gradient-to-br ${social.color} rounded-xl cursor-pointer transition-all hover:shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl"
          >
            <h3 className="text-2xl text-white mb-6">Send a Message</h3>

            {feedback ? (
              <div
                className={`mb-6 rounded-xl px-4 py-3 text-sm ${
                  status === "success"
                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                }`}
              >
                {feedback}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <motion.input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <motion.input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <motion.textarea
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50 transition-shadow"
              >
                <Send className="w-5 h-5" />
                {status === "loading" ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20 pt-8 border-t border-slate-800"
        >
          <p className="text-gray-500">
            © 2026 Aman E Rome. Available for full-time or project-based opportunities.
          </p>
        </motion.div>
      </div>
    </div>
    </section>
  );
}
