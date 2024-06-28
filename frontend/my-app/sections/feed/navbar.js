'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import linklogo from "../../public/linklogo.png"
import Search from '@/public/icons/search'
import home from '@/public/home.png'
import team from '@/public/teamwork.png'
import chat from '@/public/chat.png'
import suitcase from '@/public/suitcase.png'
import notification from '@/public/notification.png'

import Homeicon from '@/public/icons/homeicon'
import Business from '@/public/icons/business'
import Arrow from '@/public/icons/arrow'

const Navbar = () => {
    const [mobileinput, setMobileinput] = useState(false)

    return (
        <div className='bg-white '>
             <div className='h-[4rem] sticky top-0 lg:justify-between justify-evenly lg:px-[8rem] items-center flex bg-white '>
            <div className='flex gap-4'>
            <Image className='w-[2rem] lg:w-[2.5rem]' src={linklogo} />
            <div className=' h-[2rem]  flex items-center px-3 gap-3 bg-[#EDF3F8]'>
                <Search />
                <input className='bg-[#EDF3F8] outline-none  w-full' placeholder='search' />
            </div>
            </div>
          
          <div className='flex gap-6'>

          
            <div className='flex flex-col gap-1 items-center justify-center'>
                <Image className='w-[1.3rem] ' src={home} />
                <div className='text-[0.8rem] hidden lg:flex'>Home</div>
            </div>
            <div className='flex flex-col gap-1 justify-center items-center'>
                <Image className='w-[1.3rem] text-gray-300' src={team} />
                <div className='text-[0.8rem] hidden lg:flex'>My Network</div>
            </div>
            <div className='flex flex-col gap-1 justify-center items-center'>
                <Image className='w-[1.3rem]' src={chat} />
                <div className='hidden text-[0.8rem]  lg:flex'>Jobs</div>
            </div>
            <div className='flex flex-col gap-1 justify-center items-center'>
                <Image className='w-[1.3rem]' src={suitcase} />
                <div className='hidden text-[0.8rem]  lg:flex'>Messging</div>
            </div>
            <div className='flex flex-col gap-1 justify-center items-center'>
                <Image className='w-[1.3rem]' src={notification} />
                <div className='hidden text-[0.8rem]  lg:flex'>Notification</div>
            </div>
            {/* line */}
             <div className=' w-[1px] bg-gray-500'/>
            {/* line end */}
            <div className='flex flex-col justify-center items-center '>
                <Business />
                <div className='flex items-center'>
                    <div className='hidden text-[0.8rem]  lg:flex'>For Business</div>
                    <div className='hidden  lg:flex'><Arrow /></div>
                </div>

            </div>
            </div>

          


        </div>
        </div>
      
    )
}

export default Navbar