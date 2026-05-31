import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";

const QUICK_PROMPTS = [
  "What is your degree?",
  "What qualifications do you have?",
  "What tools are you most expert in?",
  "What web tools do you use?",
  "Can you build apps with Flutter and Firebase?",
  "Do you work on IoT projects?",
];

const AI_RESPONSES = [
  {
    test: /degree|education|university|college|bachelor|master|diploma/i,
    answer:
      "I have completed a Bachelor of Science in Computer Science and also earned a diploma in Information Technology. I pair strong academic training with real-world experience building web, mobile, and embedded systems.",
  },
  {
    test: /qualification|certification|certificate|credentials/i,
    answer:
      "I am qualified in full-stack development, AI/ML, IoT, and cloud-enabled applications. My hands-on skills include React, Flutter, Python, TensorFlow, Firebase, and Arduino/ESP32 integration.",
  },
  {
    test: /app tool|app tools|mobile tool|mobile tools|app development tool|app development tools/i,
    answer:
      "For app development, my go-to tools are Flutter for cross-platform UI, Firebase for backend services, and React for web apps. I also use PHP and Express for server-side APIs, plus Tailwind CSS for polished interfaces.",
  },
  {
    test: /do you work on iot projects|do you work on iots projects|work on iot projects|work on iots projects/i,
    answer:
      "Absolutely — I work on IoT projects. One strong example is my Smart Garbage Management System, where I used ESP32 and sensors to monitor bin fill levels, send real-time data to a cloud dashboard, and trigger alerts for efficient waste collection.",
  },
  {
    test: /iot tool|iot tools|iots tool|iots tools|iot expertise|iots expertise|iot development tools|iots development tools|iot dev tools|iots dev tools/i,
    answer:
      "For IoT development, I use ESP32 and Arduino for hardware, sensors for data collection, and cloud services for real-time monitoring and alerts. I also integrate Firebase and backend APIs to manage data and device communication.",
  },
  {
    test: /tool|expertise|most expertise|best at/i,
    answer:
      "My strongest expertise is full-stack web and mobile development, especially React, PHP, Flutter, and Firebase. I also build IoT/hardware systems with ESP32 and Arduino, combining polished frontend experiences with reliable backends.",
  },
  {
    test: /web tool|web tools|web expertise|web development tools|web dev tools|web development expertise/i,
    answer:
      "For web development, my strongest tools are React, PHP, Tailwind CSS, Express, Firebase, HTML, and CSS. I build responsive websites, admin dashboards, and full-stack web applications with clean UI and dependable backends.",
  },
  {
    test: /flutter|firebase|app development|mobile app|app dev/i,
    answer:
      "I build mobile and web apps with Flutter for beautiful UIs and Firebase for backend services like authentication, Firestore, storage, and cloud functions. I also use React and PHP for web development, delivering responsive, fast, and scalable applications.",
  },
  {
    test: /iot|embedded|esp32|arduino|hardware/i,
    answer:
      "For IoT, I combine ESP32/Arduino hardware with sensor integration, real-time data streams, and cloud dashboards. I create connected systems that automate workflows, monitor conditions, and send alerts.",
  },
  {
    test: /experience|projects|work|role|job/i,
    answer:
      "I deliver products across web, mobile, IoT, and AI. I transform ideas into real solutions—smart apps, connected devices, and data-driven systems that solve real problems.",
  },
  {
    test: /skill|technology|stack|tech/i,
    answer:
      "My core toolkit includes React, Tailwind CSS, Flutter, Python, TensorFlow, Firebase, Express, and IoT platforms like ESP32 and Arduino. I build modern experiences with strong frontend and backend capabilities.",
  },
  {
    test: /contact|email|phone|reach|message/i,
    answer:
      "You can contact me at iamarkhan001@gmail.com or use the contact form below. I am available for freelance projects, collaborations, and new opportunities.",
  },
  {
    test: /who are you|about you|tell me about you/i,
    answer:
      "I'm a focused full-stack developer with a Computer Science degree, an IT diploma, and a passion for creating interactive, AI-inspired portfolio experiences.",
  },
];

function getAssistantReply(question: string) {
  if (!question.trim()) {
    return "Please type a question about me, my degree, skills, or experience.";
  }

  const normalized = question.trim().toLowerCase();
  for (const item of AI_RESPONSES) {
    if (item.test.test(normalized)) {
      return item.answer;
    }
  }

  return (
    "I can answer questions about my degree, qualifications, experience, skills, and projects. " +
    "Try asking: \"What is your degree?\" or \"What qualifications do you have?\""
  );
}

export function Chat() {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me about my degree, qualifications, skills, or experience." },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;

    setMessages((current) => [...current, { from: "user", text: question }]);
    setInput("");

    const answer = getAssistantReply(question);
    setTimeout(() => {
      setMessages((current) => [...current, { from: "bot", text: answer }]);
    }, 250);
  };

  return (
    <section
      id="chat"
      ref={ref}
      className="py-20 px-6 bg-slate-950 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400 mb-4">
            AI Portfolio Assistant
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ask about ME
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]"
        >
          <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 p-6">
              <h3 className="text-xl font-semibold text-white">AI Chat</h3>
              <p className="mt-2 text-sm text-slate-100/80">
                Ask about my background and let the assistant answer with stored portfolio info.
              </p>
            </div>

            <div className="p-6">
              <div
                ref={listRef}
                className="space-y-4 max-h-[420px] overflow-y-auto pr-2 pb-2"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`rounded-3xl p-4 ${
                      message.from === "bot"
                        ? "bg-slate-800 text-slate-200 self-start"
                        : "bg-purple-600/10 text-white self-end"
                    } flex max-w-[90%]`}
                  >
                    <span className="text-sm leading-6">{message.text}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                <label htmlFor="chat-input" className="sr-only">
                  Ask a question
                </label>
                <input
                  id="chat-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about ME..."
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                />
                <button
                  type="submit"
                  className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-4 text-white font-semibold transition hover:brightness-110"
                >
                  Ask
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Try these questions</h4>
              <div className="space-y-3">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      setInput(prompt);
                    }}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-purple-500 hover:bg-slate-800"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Why this is safe</h4>
              <p className="text-sm leading-7 text-slate-400">
                This assistant is powered locally by predefined portfolio answers. It will not guess random facts and it avoids external AI services.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
