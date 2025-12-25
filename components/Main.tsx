import React from "react";

export default function Main() {
  const svg = [
    { name: "leetcode", url: "https://leetcode.com/u/soumyajaiswal7708/" },
    { name: "github", url: "https://github.com/nios-x" },
    { name: "x", url: "https://x.com/soumya_7708" },
    { name: "instagram", url: "https://instagram.com/soumya_7708" },
  ];

  return (
    <section className="w-full flex flex-col items-center px-4">
      {/* ---------- HEADER ---------- */}
      <p className="nf text-sm tracking-[0.3em] text-zinc-500 pt-10">
        CHECK IT OUT
      </p>

      {/* ---------- SOCIAL ICONS ---------- */}
      <div className="mt-6 flex gap-4 overflow-x-auto sh px-2">
        {svg.map((e) => (
          <a
            key={e.name}
            href={e.url}
            target="_blank"
            className="
              group
              flex items-center justify-center
              w-12 h-12
              rounded-full
              border border-zinc-300
              bg-white/60 backdrop-blur
              transition-all duration-300
              hover:scale-110
              hover:border-black
              hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]
            "
          >
            <img
              src={`https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/${e.name}.svg`}
              className="w-5 h-5 opacity-70 group-hover:opacity-100"
            />
          </a>
        ))}

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/soumya-jaiswal7708/"
          target="_blank"
          className="
            group flex items-center justify-center
            w-12 h-12 rounded-full
            border border-zinc-300
            bg-white/60 backdrop-blur
            transition-all duration-300
            hover:scale-110
            hover:border-black
            hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]
          "
        >
          <img
            src="/linkedin.svg"
            className="w-5 h-5 opacity-80 group-hover:opacity-100"
          />
        </a>
      </div>

      {/* ---------- INFO TAGS ---------- */}
      <div className="nf pt-16 max-w-5xl">
        <h2 className="text-center text-xl sm:text-2xl tracking-wide mb-10">
          GENERAL INFORMATION
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            "FULL STACK DEVELOPER",
            "WEB3 / BLOCKCHAIN DEVELOPER",
            "COMPETITIVE PROGRAMMER",
            "SYSTEM DESIGN ENTHUSIAST",
            "REAL-TIME APPLICATION BUILDER",
          ].map((item) => (
            <div
              key={item}
              className="
                px-6 py-3 rounded-full
                border border-zinc-300
                bg-white/70 backdrop-blur
                text-sm sm:text-base
                tracking-wide
                transition-all duration-300
                hover:bg-black hover:text-white
                hover:-translate-y-1
                hover:shadow-lg
                
                active:bg-black active:text-white
                active:-translate-y-1
                active:shadow-lg
              "
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
