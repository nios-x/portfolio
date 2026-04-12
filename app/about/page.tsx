"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const experienceContainerRef = useRef(null);

  useEffect(() => {
    const cards = experienceContainerRef.current?.querySelectorAll(".experience-card");
    if (!cards) return;

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotateX: 45,
          z: -200,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          z: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            scrub: 0.5,
            markers: false,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const submitHandler = async () => {
    if (!form.name || !form.email || !form.message) return alert("Fill all fields");

    setLoading(true);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      alert("Message sent successfully 🚀");
      setForm({ name: "", email: "", message: "" });
      setOpen(false);
    } else {
      alert("Failed to send message");
    }
  };
  return (
    <main className="min-h-screen w-full nf bg-white text-zinc-900 px-6 md:px-16 py-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          About Me
        </h1>
        <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
          I’m a passionate developer who loves building performant web apps,
          exploring system design, and pushing limits with modern technologies.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto my-12 border-t border-zinc-200" />

      {/* Content */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
          <p className="text-zinc-700 leading-relaxed mb-4">
            I’m Soumya, a developer focused on crafting clean, scalable, and
            user-friendly applications. I enjoy working across the stack -
            from designing intuitive UIs to building efficient backends.
          </p>
          <p className="text-zinc-700 leading-relaxed">
            My journey revolves around consistency, curiosity, and learning by
            building real-world projects instead of just tutorials.
          </p>
        </div>

        {/* Right */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">What I Do</h2>
          <ul className="space-y-3 text-zinc-700">
            <li>• Build full-stack web applications</li>
            <li>• Work with modern frameworks & tools</li>
            <li>• Solve DSA & system-design problems</li>
            <li>• Experiment with Web3 & 3D experiences</li>
            <li>• Optimize performance & developer experience</li>
          </ul>
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-4xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-6">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
        {[
  // Languages
  "C",
  "C++",
  "Python",
  "JavaScript",
  "TypeScript",

  // Frontend
  "React",
  "Next.js",
  "Tailwind CSS",
  "GSAP",
  "Shadcn UI",
  "React Native",

  // Backend
  "Node.js",
  "Express.js",
  "NestJS",
  "Django",
  "REST APIs",
  "JWT Authentication",

  // Databases & ORM
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Prisma",
  "Zod",

  // Realtime & Streaming
  "WebSockets",
  "WebRTC",
  "FFmpeg",

  // DevOps & Infra
  "Docker",
  "Kubernetes",
  "Nginx",
  "CI/CD",
  "Prometheus",
  "Grafana",

  // Testing
  "Jest",
  "Vitest",

  // Web3 & 3D
  "Solidity",
  "DApps",
  "Web3.js",
  "Three.js",
].map((skill) => (
  <span
    key={skill}
    className="px-4 py-2 rounded-full text-sm bg-zinc-100 text-zinc-800 border border-zinc-200"
  >
    {skill}
  </span>
))}

        </div>
      </section>

      {/* Experience */}
      <section className="max-w-4xl mx-auto mt-20" ref={experienceContainerRef}>
        <h2 className="text-3xl font-bold mb-12 tracking-tight">Professional Experience</h2>
        <div className="space-y-6">
          {/* Cnear */}
          <div className="experience-card group border border-zinc-200 rounded-lg p-6 hover:shadow-md hover:border-zinc-300 transition-all duration-300 bg-gradient-to-br from-zinc-50 to-white" style={{ perspective: "1200px" }}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Software Development Engineer - I</h3>
                <p className="text-sm text-zinc-600 mt-1">Cnear · Full-time · Delhi, India (Hybrid)</p>
              </div>
              <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full whitespace-nowrap">Jan 2026 - Present</span>
            </div>
            <p className="text-zinc-700 leading-relaxed mb-4 text-sm">
              Built a job aggregation platform using RabbitMQ and cron-based crawlers; implemented AI-powered job matching with pgvector (HNSW) and Xenova Transformers.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded border border-blue-200">MVC</span>
              <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded border border-blue-200">RabbitMQ</span>
              <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded border border-blue-200">pgvector</span>
              <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded border border-blue-200">AI</span>
            </div>
          </div>

          {/* OWASP */}
          <div className="experience-card group border border-zinc-200 rounded-lg p-6 hover:shadow-md hover:border-zinc-300 transition-all duration-300 bg-gradient-to-br from-zinc-50 to-white" style={{ perspective: "1200px" }}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Open Source Contributor</h3>
                <p className="text-sm text-zinc-600 mt-1">OWASP Foundation · Wilmington, Delaware</p>
              </div>
              <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full whitespace-nowrap">Dec 2025 - Jan 2026</span>
            </div>
            <ul className="text-zinc-700 text-sm leading-relaxed space-y-2 mb-4">
              <li className="flex gap-2"><span className="text-blue-600">•</span> Contributed to OWASP Nest (CI/CD & security automation)</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Fixed ZAP baseline scan workflow issues</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Collaborated via GitHub PRs and reviews</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2.5 py-1 rounded border border-amber-200">OWASP ZAP</span>
              <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2.5 py-1 rounded border border-amber-200">CI/CD</span>
              <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2.5 py-1 rounded border border-amber-200">Testing</span>
            </div>
          </div>

          {/* Webspace IN */}
          <div className="experience-card group border border-zinc-200 rounded-lg p-6 hover:shadow-md hover:border-zinc-300 transition-all duration-300 bg-gradient-to-br from-zinc-50 to-white" style={{ perspective: "1200px" }}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Full-stack Developer</h3>
                <p className="text-sm text-zinc-600 mt-1">Webspace IN · Internship</p>
              </div>
              <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full whitespace-nowrap">Sep 2025 - Jan 2026</span>
            </div>
            <p className="text-zinc-700 text-sm leading-relaxed mb-4">
              Worked on POS Systems, Frontend UI, Backend Server (MVC Architecture), Authentication Systems, React Native, and more. Delivered production-ready features with focus on scalability and user experience.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded border border-green-200">Shadcn</span>
              <span className="text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded border border-green-200">MongoDB</span>
              <span className="text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded border border-green-200">React Native</span>
              <span className="text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded border border-green-200">MVC</span>
            </div>
          </div>

          {/* Hacktoberfest */}
          <div className="experience-card group border border-zinc-200 rounded-lg p-6 hover:shadow-md hover:border-zinc-300 transition-all duration-300 bg-gradient-to-br from-zinc-50 to-white" style={{ perspective: "1200px" }}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Open Source Contributor & Maintainer</h3>
                <p className="text-sm text-zinc-600 mt-1">Hacktoberfest - 6 Contributions</p>
              </div>
              <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full whitespace-nowrap">Oct 2025 - Nov 2025</span>
            </div>
            <ul className="text-zinc-700 text-sm leading-relaxed space-y-2 mb-4">
              <li className="flex gap-2"><span className="text-purple-600">•</span> Implemented smooth scroll-to-top feature for improved navigation</li>
              <li className="flex gap-2"><span className="text-purple-600">•</span> Enhanced UI consistency of preview-to-code component</li>
              <li className="flex gap-2"><span className="text-purple-600">•</span> Resolved multiple UI glitches and design inconsistencies</li>
              <li className="flex gap-2"><span className="text-purple-600">•</span> Replaced weak randomization with UUID for secure uniqueness</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium bg-purple-50 text-purple-700 px-2.5 py-1 rounded border border-purple-200">Open Source</span>
              <span className="text-xs font-medium bg-purple-50 text-purple-700 px-2.5 py-1 rounded border border-purple-200">Shadcn</span>
            </div>
          </div>

          {/* EdEarn */}
          <div className="experience-card group border border-zinc-200 rounded-lg p-6 hover:shadow-md hover:border-zinc-300 transition-all duration-300 bg-gradient-to-br from-zinc-50 to-white" style={{ perspective: "1200px" }}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Frontend Developer</h3>
                <p className="text-sm text-zinc-600 mt-1">EdEarn · Internship</p>
              </div>
              <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full whitespace-nowrap">Dec 2024 - Sep 2025</span>
            </div>
            <p className="text-zinc-700 text-sm leading-relaxed mb-4">
              Developed polished UI components and pages for the EdEarn platform. Focused on responsive design, accessibility, and performance optimization.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium bg-rose-50 text-rose-700 px-2.5 py-1 rounded border border-rose-200">TypeScript</span>
              <span className="text-xs font-medium bg-rose-50 text-rose-700 px-2.5 py-1 rounded border border-rose-200">Tailwind CSS</span>
              <span className="text-xs font-medium bg-rose-50 text-rose-700 px-2.5 py-1 rounded border border-rose-200">React</span>
            </div>
          </div>

          {/* TTREX Hackathon */}
          <div className="group border border-zinc-200 rounded-lg p-6 hover:shadow-md hover:border-zinc-300 transition-all duration-300 bg-gradient-to-br from-zinc-50 to-white">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">National Finalist – Innovate-A-Thon 3.0</h3>
                <p className="text-sm text-zinc-600 mt-1">Birla Institute of Technology, Mesra</p>
              </div>
              <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full whitespace-nowrap">Aug 2025</span>
            </div>
            <p className="text-zinc-700 text-sm leading-relaxed mb-4">
              Developed TTREX (Tokenized Real Estate Exchange) – a Web3 platform fractionalizing real estate into ERC-721 NFTs and ERC-1155 tokens for co-ownership and transparent on-chain property investment. Completed within 36 hours with a team of three. Earned mentorship from industry leaders and selected among top national teams.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded border border-indigo-200">Blockchain</span>
              <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded border border-indigo-200">Solidity</span>
              <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded border border-indigo-200">React</span>
              <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded border border-indigo-200">Web3</span>
              <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded border border-indigo-200">Ethereum</span>
            </div>
          </div>

          {/* GirlScript */}
          <div className="group border border-zinc-200 rounded-lg p-6 hover:shadow-md hover:border-zinc-300 transition-all duration-300 bg-gradient-to-br from-zinc-50 to-white">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Open Source Contributor</h3>
                <p className="text-sm text-zinc-600 mt-1">GirlScript Summer of Code</p>
              </div>
              <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full whitespace-nowrap">Oct 2024 - Nov 2024</span>
            </div>
            <p className="text-zinc-700 text-sm leading-relaxed mb-4">
              Actively contributed to open source projects as part of GirlScript Summer of Code, focusing on feature development and bug fixes.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded border border-cyan-200">JavaScript</span>
              <span className="text-xs font-medium bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded border border-cyan-200">JSX</span>
              <span className="text-xs font-medium bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded border border-cyan-200">Open Source</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="max-w-4xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-4">My Philosophy</h2>
        <p className="text-zinc-700 leading-relaxed">
          I believe in building things that matter. Clean code, thoughtful UX,
          and long-term maintainability matter more than flashy trends. I focus
          on depth over noise and consistent improvement over shortcuts.
        </p>
      </section>
   {/* Footer CTA */}
      <section className="max-w-4xl mx-auto mt-24 text-center">
        <p className="text-zinc-600 mb-6">
          Interested in collaborating or just want to talk tech?
        </p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition"
        >
          Get in Touch
        </button>
      </section>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-zinc-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Send a Message</h2>

            <div className="space-y-3">
              <input
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                placeholder="Your Email"
                type="email"
                className="w-full border rounded-lg px-4 py-2"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full border rounded-lg px-4 py-2"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <button
                onClick={submitHandler}
                disabled={loading}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-zinc-800 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}