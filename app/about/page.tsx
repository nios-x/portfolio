"use client";

import React, { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

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
            user-friendly applications. I enjoy working across the stack —
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