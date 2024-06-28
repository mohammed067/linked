import Hero from '@/sections/feed/hero'
import Navbar from '@/sections/feed/navbar'
import React from 'react'
import Postcard from '../components/postcard'

const Page = () => {
  return (
    <div className='bg-[#F4F2EE] h-[150vh] p-1'>
        <Navbar/>
        {/* <Hero/> */}
        <Postcard/>
    </div>
  )
}

export default Page