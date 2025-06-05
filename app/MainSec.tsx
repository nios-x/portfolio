"use client"

import React, { useEffect, useRef, useState } from 'react'
import Sec2 from "./Sec2"

export default function MainSec() {
  const [rotationBall1, setRotationBall1] = useState(0)
  const [rotationBall2, setRotationBall2] = useState(0)
  const [moredistance, setMoredistance] = useState(0)
  const [depth, setDepth] = useState(0)
  const [isD, setIsd] = useState(false)

  const depthRef = useRef(0)
  const ball1 = useRef<HTMLDivElement | null>(null)
  const ball2 = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleMouseMove = (e: MouseEvent) => {
      if (ball1.current && ball2.current) {
        const rect1 = ball1.current.getBoundingClientRect()
        const rect2 = ball2.current.getBoundingClientRect()

        const centerxball1 = rect1.left + rect1.width / 2
        const centerxball2 = rect2.left + rect2.width / 2
        const centeryball1 = rect1.top + rect1.height / 2
        const centeryball2 = rect2.top + rect2.height / 2

        const dx1 = e.clientX - centerxball1
        const dx2 = e.clientX - centerxball2
        const dy1 = centeryball1 - e.clientY
        const dy2 = centeryball2 - e.clientY

        setMoredistance(Math.log10(Math.sqrt(dx1 * dx1 + dx2 * dx2)))
        setRotationBall1(Math.atan2(dx1, dy1) * (180 / Math.PI))
        setRotationBall2(Math.atan2(dx2, dy2) * (180 / Math.PI))
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (ball1.current && ball2.current && e.touches[0]) {
        const rect1 = ball1.current.getBoundingClientRect()
        const rect2 = ball2.current.getBoundingClientRect()

        const centerxball1 = rect1.left + rect1.width / 2
        const centerxball2 = rect2.left + rect2.width / 2
        const centeryball1 = rect1.top + rect1.height / 2
        const centeryball2 = rect2.top + rect2.height / 2

        const dx1 = e.touches[0].clientX - centerxball1
        const dx2 = e.touches[0].clientX - centerxball2
        const dy1 = centeryball1 - e.touches[0].clientY
        const dy2 = centeryball2 - e.touches[0].clientY

        setMoredistance(Math.log10(Math.sqrt(dx1 * dx1 + dx2 * dx2)))
        setRotationBall1(Math.atan2(dx1, dy1) * (180 / Math.PI))
        setRotationBall2(Math.atan2(dx2, dy2) * (180 / Math.PI))
      }
    }

    document.body.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("touchmove", handleTouchMove)

    const animate = () => {
      if (depthRef.current > 5) {
        setIsd(true)
        return
      }
      depthRef.current += 0.02
      setDepth(depthRef.current)
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])



  return (
    <section className='w-screen overflow-hidden lg:h-screen h-[100svh]  relative flex flex-col justify-center '>
      <div className='lg:w-1/2  hidden lg:block md:block h-3 translate-x-1 lg:top-0 -top-10 -right-50 rotate-45 absolute bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500' ></div>
      <div className=' flex'>
        <div className='lg:px-18 px-3 lg:w-1/2 lg:mt-[39vh]'>

          <div className='lg:block hidden'>
            <div className='font1 lg:text-2xl text-3xl p-1'>HELLO, I AM</div>

            <div className='font1 lg:text-6xl text-6xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent w-max'> SOUMYA <div className='lg:hidden'></div> JAISWAL</div>
            <div className='font2 lg:text-lg text-md w-max pl-1 relative flex gap-1 '>Web Development <span className='text-[10px]'>◍</span>  Competitive Coder <span className='text-[10px]'>◍</span> UI DEVELOPER
              <svg className='absolute right-0 w-20 h-10 rotate-90 -translate-2' viewBox="0 0 10 10" width={10} height={10}>
                <path d="M2,2 T5,2 2,5 L6,5 L2,8 L8,8 T3,12 L8, 14, 3,18" stroke="red" fill="none" strokeWidth={0.6} />
              </svg>
            </div>
            <div className='font4 text-2xl pl-1'>Further i don't need to tell about me
            </div>

          </div>
           <div className='lg:hidden'>
            <div className='font1 lg:text-2xl text-3xl p-1 mb-2 '>HELLO, I AM</div>

            <div className='font1 lg:text-6xl font-bold text-6xl bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 bg-clip-text text-transparent w-max'> SOUMYA <div className='lg:hidden'></div> JAISWAL</div>
            <div className='font2 lg:text-lg text-lg w-max pl-1 relative mt-2 '> ◍ Web Development <div></div> ◍ Competitive Coder <div></div>◍ UI DEVELOPER
            
              <svg className='absolute right-0 w-20 h-10 rotate-90 -translate-x-13 -translate-y-8' viewBox="0 0 10 10" width={10} height={10}>
                <path d="M2,2 T5,2 2,5 L6,5 L2,8 L8,8 T3,12 L8, 14, 3,18" stroke="red" fill="none" strokeWidth={0.6} />
              </svg>
            </div>
            <div className='font4 text-md pl-1'>Further i don't need to tell about me
            </div>

          </div>


          <div className='absolute w-60 h-60 translate-y-20 rounded-t-full flex inner-shadow-bo justify-center translate-x-3 lg:translate-y-24 from-indigo-600 via-purple-600 to-pink-500 bg-gradient-to-r'>
            <div>
              <div className='flex gap-2 mt-10 w-max justify-center '>
                <div style={{ rotate: `${rotationBall1}deg` }} ref={ball1} className='w-16 h-16 p-[2px] rounded-full bg-white flex justify-center '>
                  <div className='ball1 w-10 h-10 rounded-full bg-black'></div>
                </div><div style={{ rotate: `${rotationBall2}deg` }} ref={ball2} className='w-16 p-[2px] h-16 rounded-full bg-white flex justify-center '>
                  <div className='ball1 w-10 h-10 rounded-full bg-black'></div>
                </div>
              </div>
              <div className='flex justify-center w-full mt-3 translate-x-1.5'>
                <svg className='absolute hidden lg:block w-20 h-10 -translate-2' viewBox="0 0 10 10" width={10} height={10}>
                  <path d={`M${1 - depth},5 C2,${5 + depth - (isD?moredistance*4:0) } 8,${6 + depth - (isD?moredistance*2:0)} ${8 + depth},5`} stroke="white" fill="none" strokeWidth={0.6} />
                </svg>
                 <svg className='absolute lg:hidden w-20 h-10 -translate-2' viewBox="0 0 10 10" width={10} height={10}>
                  <path d={`M${2 - depth},5 C2,${4 + depth} 8,${4 + depth} ${8 + depth},5`} stroke="white" fill="none" strokeWidth={0.6} />
                </svg>
              </div>
            </div>


          </div>
        </div>
        <div className='w-1/2 lg:block h-screen hidden '>
        <Sec2/>x


        </div>
      </div>

    </section>
  )
}
