"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { GoArrowUpRight } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
export default function Navbar() {
  const router = usePathname()
  const [isHovered, setIsHovered] = useState<null | string>(null)
  const routerPush = useRouter();
  const [open, setOpen] = useState(true)
  const reverseOpen = ()=>{
    setOpen(!open)
  }

  const [navlinks, setNavLinks] = useState([
    {
      name: "Home",
      link: "/",
      active: false
    },
    {
      name: "About",
      link: "/about",
      active: false
    },
    {
      name: "Education",
      link: "/education",
      active: false
    },
    {
      name: "Skills",
      link: "/skills",
      active: false
    },
    {
      name: "Projects",
      link: "/projects",
      active: false
    },
  ])
  return (
    <div className=' nf h-16 flex justify-between items-center gap-2'>

      <div className='relative pl-6 lg:pt-6 pt-6 text-lg'>
        SOUMYA's <span className=' absolute bottom-[-10px] left-2/3 text-[11px]'>PORTFOLIO</span>
      </div>

      <div className='w-max gap-2 pt-4 hidden lg:flex h-max mr-5'>
        {navlinks.map((e) => {
          const isActive = router === e.link
          const isHovering = isHovered === e.link

          return isActive ? (
            <Link
              key={e.name}
              href={e.link}
              className="px-5 py-2 transition text-sm rounded-full font-medium flex items-center justify-center 
                 bg-black text-white border border-black"
            >
              {e.name}
            </Link>
          ) : (
            <Link
              key={e.name}
              href={e.link}
              onClick={(ev) => {
                ev.preventDefault();            // ⛔ stop instant navigation
                setIsHovered(e.link);           // ▶ trigger animation

                setTimeout(() => {
                  routerPush.push(e.link);      // 🚀 navigate AFTER animation
                }, 700); // MUST match animation duration
              }}
              onMouseEnter={() => setIsHovered(e.link)}
              onMouseLeave={() => setIsHovered(null)}
              className={`relative overflow-hidden px-5 py-2 text-xl lg:text-sm rounded-full font-medium 
                  flex items-center transition justify-center gap-1 border border-zinc-300

                  transition-colors duration-300
                  ${isHovering ? "text-white" : "text-zinc-900"}`}
            >
              <span className="relative z-20 flex items-center gap-1 ">
                {e.name}
                <GoArrowUpRight className={`translate-y-[1] transition duration-300 ${isHovering && "rotate-90 scale-130"}`} />
              </span>

              <div
                className={`absolute z-10 h-36 w-36 rounded-full bg-black
                    transition-transform duration-700 ease-out
                    ${isHovering ? "translate-y-0" : "translate-y-40"}`}
              />
            </Link>
          )
        })}
      </div>

        <span className='lg:hidden'>
          <button className='p-4  mt-7 mr-7 border border-zinc-600 text-zinc-700 rounded-full text-2xl ' onClick={reverseOpen}>{open?<HiOutlineMenuAlt1 />:<IoClose />}</button>
        </span >
     { !open && <div className=' lg:hidden absolute top-0 left-1/2 -translate-x-1/2 scale-90   w-[90vw] h-max mt-[23vh] z-[9999]  flex justify-center items-center p-3'>
        <div className='bg-[linear-gradient(315deg,rgba(0,0,0,0.03),rgba(0,0,0,0.05))] backdrop-blur-lg border border-zinc-300 p-2 rounded-4xl  pb-6 py-20 '>
      <div className=' w-screen px-10  '>
        {navlinks.map((e) => {
          const isActive = router === e.link
          const isHovering = isHovered === e.link

          return isActive ? (
            <Link
              key={e.name}
              href={e.link}
              className="px-5 py-2 transition text-sm rounded-full mb-2  w-full text-xl lg:text-sm font-medium flex items-center justify-center 
                 bg-black text-white border border-black"
            >
              {e.name}
            </Link>
          ) : (
            <Link
              key={e.name}
              href={e.link}
              onClick={(ev) => {
                ev.preventDefault();            // ⛔ stop instant navigation
                setIsHovered(e.link);           // ▶ trigger animation

                setTimeout(() => {
                  routerPush.push(e.link);      // 🚀 navigate AFTER animation
                }, 700); // MUST match animation duration
              }}
              onMouseEnter={() => setIsHovered(e.link)}
              onMouseLeave={() => setIsHovered(null)}
              className={`relative overflow-hidden px-5 w-full py-2 text-xl lg:text-sm rounded-full font-medium 
                  flex items-center transition justify-center gap-1 mb-2 border border-zinc-200
                  transition-colors duration-300
                  ${isHovering ? "text-white" : "text-zinc-900"}`}
            >
              <span className="relative z-20 flex items-center gap-1 ">
                {e.name}
                <GoArrowUpRight className={`translate-y-[1] transition duration-300 ${isHovering && "rotate-90 scale-105"}`} />
              </span>

              <div
                className={`absolute z-10 h-36 w-96 rounded-full bg-black
                    transition-transform duration-700 ease-out
                    ${isHovering ? "translate-y-0" : "translate-y-40"}`}
              />
            </Link>
          )
        })}
      </div>
      </div>
        </div>}
    </div>
  )
}
