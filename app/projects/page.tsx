import React from "react";

const projects = [
  {
    title: "Video Transcoder",
    date: "December 2024",
    tech: ["React", "Node.js", "Express", "Redis", "FFmpeg"],
    points: [
      "Built an end-to-end video transcoding pipeline converting uploads into 72p, 144p, and 240p resolutions using FFmpeg with dynamic directory management.",
      "Designed an asynchronous Redis-based job queue to process multiple videos concurrently without blocking the server, ensuring real-time performance and scalability."
    ],
  },
  {
    title: "SkillX",
    date: "November 2025",
    tech: ["Next.js", "Node.js", "Prisma", "PostgreSQL", "WebRTC"],
    points: [
      "Developed a peer-to-peer learning platform supporting real-time video teaching, messaging, and interactive canvas using WebRTC and WebSockets.",
      "Implemented gamification with leaderboards, points tracking, and performance analytics while ensuring data consistency and scalability."
    ],
  },
  {
    title: "Swodito",
    date: "July 2025",
    tech: ["TypeScript", "Three.js", "React", "WebSockets"],
    points: [
      "Designed and developed a real-time multiplayer 3D game with top-down perspective, supporting WASD + mouse controls and full mobile input.",
      "Implemented scalable WebSocket architecture achieving 60 FPS locally and 30 FPS globally with low-latency player synchronization."
    ],
  },
  {
    title: "Dinka",
    date: "July 2025 – Present",
    tech: ["Next.js", "React", "Prisma", "PostgreSQL", "WebRTC", "Tailwind CSS"],
    points: [
      "Built a full-featured social media platform with real-time chat, posts, likes, comments, and sharing.",
      "Integrated WebRTC for video calls and real-time collaboration with secure authentication using NextAuth.js and OTP-based verification."
    ],
  },
  {
    title: "Curled News",
    date: "March 2024",
    tech: ["Python", "Django", "REST API", "NewsAPI"],
    points: [
      "Developed a full-stack news aggregation platform that fetches and stores 100+ articles daily via scheduled background jobs.",
    ],
  },
];

export default function Page() {
  return (
    <section className="max-w-5xl mx-auto nf px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
        <p className="mt-4 text-zinc-600">
          A selection of systems, platforms, and products I’ve built — focusing
          on scalability, performance, and real-time experiences.
        </p>
      </div>

      {/* Projects */}
      <div className="space-y-12">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="border border-zinc-200 rounded-2xl p-6 hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-semibold">{project.title}</h2>
              <span className="text-sm text-zinc-500 mt-1 sm:mt-0">
                {project.date}
              </span>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-zinc-100 text-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Description */}
            <ul className="mt-4 space-y-2 list-disc list-inside text-zinc-700">
              {project.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Contact */}
      <div className="mt-20 pt-8 border-t text-sm text-zinc-600">
        <p>
          <a
            href="mailto:soumyajaiswal7708@gmail.com"
            className="underline"
          >
            soumyajaiswal7708@gmail.com
          </a>{" "}
          ·{" "}
          <a
            href="https://linkedin.com/in/soumya-jaiswal7708/"
            target="_blank"
            className="underline"
          >
            LinkedIn
          </a>{" "}
          ·{" "}
          <a
            href="https://github.com/nios-x"
            target="_blank"
            className="underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </section>
  );
}
