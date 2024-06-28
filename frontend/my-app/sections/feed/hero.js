import Feed from '@/app/components/feed'
import News from '@/app/components/news'
import Sidebar from '@/app/components/sidebar'
import React from 'react'

const Hero = () => {
  return (
    <div className='md:flex md:px-[2rem] gap-8 lg:justify-center     md:mt-4'>
      <div className=' basis-1 md:basis-[30%] lg:basis-[20%] bg-white lg:max-h-[26rem] shadow-lg rounded-md ' >
      <Sidebar/>
      </div>
      <div className=' basis-1 md:basis-[70%] lg:basis-[45%] '>
        <Feed/>
      </div>
      <div className='hidden lg:flex basis-1 lg:basis-1/5 bg-white'>
        <News/>
      </div>
     
    </div>
  )
}

export default Hero