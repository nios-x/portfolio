import React from "react";

const skills = [
  {
    category: "Languages",
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "C++",
      "Rust",
      "Solidity",
    ],
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
      "HTML",
      "CSS",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express",
      "Django",
      "Flask",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "WebRTC",
      "Authentication (JWT, OTP)",
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
      "Supabase",
      "Qdrant",
      "Neo4j",
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      "Docker",
      "Kubernetes",
      "Nginx",
      "Git & GitHub",
      "GitHub Actions",
      "CI/CD",
      "Linux",
      "AWS (Basics)",
      "GCP (Basics)",
      "Vercel",
      "Netlify",
      "Cloudflare",
    ],
  },
  {
    category: "System & CS Fundamentals",
    items: [
      "Data Structures & Algorithms",
      "System Design",
      "Concurrency",
      "Asynchronous Systems",
      "Networking Fundamentals",
      "Scalable Architecture",
    ],
  },
  {
    category: "Web3 & Blockchain",
    items: [
      "Solana",
      "Smart Contracts",
      "Cryptography (Ed25519)",
      "Wallet Integration",
      "@solana/web3.js",
      "Token Systems",
    ],
  },
  {
    category: "Game & Graphics",
    items: [
      "Three.js",
      "WebGL Concepts",
      "Real-time Multiplayer Systems",
      "Game Physics Basics",
    ],
  },
];

const links = [
  {
    name: "GitHub",
    url: "https://github.com/nios-x",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/soumya-jaiswal7708",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/soumyajaiswal7708/",
  },
  {
    name: "Portfolio",
    url: "https://soumya7708.vercel.app",
  },
  {
    name: "Email",
    url: "mailto:soumyajaiswal7708@gmail.com",
  },
];

export default function Page() {
  return (
    <section className="max-w-5xl nf mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Soumya Jaiswal — Skills
        </h1>
        <p className="mt-4 text-zinc-600">
          Full-stack developer focused on scalable systems, real-time apps,
          and Web3. Strong in DSA and backend architecture.
        </p>
      </div>

      {/* Links */}
      <div className="mb-12 flex flex-wrap gap-3">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-full border border-zinc-300 hover:bg-zinc-100 transition"
          >
            {link.name}
          </a>
        ))}
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
          Currently deep diving into System Design, DevOps (Kubernetes),
          and Web3 ecosystems while building high-performance applications.
        </p>
      </div>
    </section>
  );
}