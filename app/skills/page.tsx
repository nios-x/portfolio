import React from "react";

const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "C++"],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "React Native",
      "Three.js",
      "React Three Fiber",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express",
      "Django",
      "REST APIs",
      "WebSockets",
      "WebRTC",
    ],
  },
  {
    category: "Databases & ORMs",
    items: [
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "SQLite",
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      "Docker",
      "Nginx",
      "CI/CD (Basics)",
      "Git & GitHub",
      "Linux",
    ],
  },
  {
    category: "System & CS Fundamentals",
    items: [
      "Data Structures & Algorithms",
      "Asynchronous Systems",
      "Concurrency",
      "System Design (Basics)",
      "Networking Fundamentals",
    ],
  },
  {
    category: "Game & Graphics",
    items: [
      "Three.js",
      "WebGL Concepts",
      "Real-time Multiplayer Systems",
    ],
  },
];

export default function Page() {
  return (
    <section className="max-w-5xl nf mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Skills</h1>
        <p className="mt-4 text-zinc-600">
          Technologies, tools, and systems I’ve worked with while building
          real-world products and scalable applications.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {skills.map((group, idx) => (
          <div
            key={idx}
            className="border border-zinc-200 rounded-2xl p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-4">
              {group.category}
            </h2>

            <div className="flex flex-wrap gap-2">
              {group.items.map((skill, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 rounded-full bg-zinc-100 text-zinc-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t text-sm text-zinc-600">
        <p>
          Continuously learning and refining — currently focused on
          system design, DevOps, and Web3 fundamentals.
        </p>
      </div>
    </section>
  );
}
