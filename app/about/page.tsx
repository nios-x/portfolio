import React from "react";

export default function Page() {
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
        <a
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition"
        >
          Get in Touch
        </a>
      </section>
    </main>
  );
}
