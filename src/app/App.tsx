import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Chat } from "./components/Chat";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Chat />
      <Contact />
    </div>
  );
}