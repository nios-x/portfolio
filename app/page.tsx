"use client";

import React, { useRef } from "react";
import Main from "@/components/Main";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Page() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.from(
        ".box",
        {
          scale:0.6,
          yoyo:true,
          repeat:-1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
          
        }
      );
    },
    { scope: container } // ✅ VERY IMPORTANT
  );

  return (
    <div className="">
      <div className="red-blob">

      </div>
      <div className="blue-blob">

      </div>
      <div
        ref={container}
        className="nf font-light flex px-6 pt-10 gap-x-5 items-end"
      >
        <span className="bgsi p-1 rounded-lg">

        <img src="/pp.jpeg" className="border-1 border border-white border-2 rounded-md w-26" alt="" />
        </span>

        <div className="flex flex-col ">
          <div>Hello I'm</div>

          <div className="text-2xl text-clip">
            <span>SOUMYA JAISWAL</span>
          </div>

          <div className="text-md ">
            {"AWW'SOME PROGRAMMER".split("").map((e, i) => (
              <span key={i} className="box inline-block">
                {e === " " ? "\u00A0" : e}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Main />
    </div>
  );
}
