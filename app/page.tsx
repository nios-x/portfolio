import React from 'react'
import Main from '@/components/Main'
export default function page() {
  return (
    <div>
      <div className='nf font-light flex px-6 pt-10 gap-x-5 items-end'>
        <img src="/pp.jpeg" className=' rounded w-26' alt="" />
        <div className='flex flex-col '>
          <div>
            Hello I'm
          </div>
          <div className='text-2xl'>
             <span className='text-clip'> SOUMYA JAISWAL </span>
          </div>
          <div className='text-lg'>
             <span className='text-clip'> AWW'SOME PROGRAMMER  </span>
          </div>
        </div>
      </div>
        <Main></Main>
    </div>
  )
}
