"use client"
import React from "react";

export default function EducationPage() {
  const educationData = [
    {
      institute: "Sarala Birla University, Ranchi",
      degree: "BCA - Degree",
      year: "2024 - Present",
      cgpa: "9.08 CGPA",
      logo: "https://imgs.search.brave.com/kryEaPwmKkWT4jplFihOWJdG0FhxVgWkDhg1dDjL5-M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS1zdGF0aWMuY29s/bGVnZWR1bmlhLmNv/bS9wdWJsaWMvaW1h/Z2UvRW50cmFuY2Vf/MTQzYTkxM2UxYWJh/MDM2ZWEzNDA1NGRk/ZDNjODdiNTQucG5n",
    },
    {
      institute: "Dhanbad Public School, Dhanbad",
      degree: "12th Grade - Commerce",
      year: "2023 - 2024",
      percentage: "92%",
      logo: "https://content.jdmagicbox.com/comp/dhanbad/g1/9999px326.x326.090528155341.c8g1/catalogue/dhanbad-public-school-govindpur-dhanbad-cbse-schools-aez0nqo.jpg",
    },
    {
      institute: "Kids Garden Secondary School",
      degree: "10th Grade",
      year: "2021 - 2022",
      percentage: "81.4%",
      logo: "https://kidsgardenjharia.com/wp-content/uploads/2021/06/s2.jpg",
    },
  ];

  return (
    <section className="w-full flex flex-col items-center px-4 pb-16">
      {/* ---------- HEADER ---------- */}
      <p className="nf text-sm tracking-[0.3em] text-zinc-500 pt-10">
        MY EDUCATION
      </p>

      <h2 className="text-center text-xl nf sm:text-2xl tracking-wide mb-10 mt-4">
        LEARNING JOURNEY
      </h2>

      {/* ---------- EDUCATION CARDS ---------- */}
      <div className="flex flex-wrap nf justify-center gap-6 max-w-5xl">
        {educationData.map((edu) => (
          <div
            key={edu.institute}
            className="relative w-full bg-white/70 backdrop-blur-lg border border-zinc-300 rounded-2xl p-6 flex flex-col gap-3
              transition-transform duration-300 "
          >
            <div className="flex items-center gap-4">
           <div
  className="w-24 h-16 rounded-xl bg-center bg-cover "
  style={{ backgroundImage: `url(${edu.logo})` }}
></div>

              <div className="flex flex-col">
                <span className=" text-lg">{edu.institute}</span>
                <span className="text-sm opacity-70">{edu.degree}</span>
              </div>
            </div>
            <div className="text-sm mt-2 opacity-80">
              Year: <span className="font-medium">{edu.year}</span>
            </div>
            {edu.cgpa && (
              <div className="text-sm opacity-80">
                CGPA: <span className="font-medium">{edu.cgpa}</span>
              </div>
            )}
            {edu.percentage && (
              <div className="text-sm opacity-80">
                Percentage: <span className="font-medium">{edu.percentage}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
