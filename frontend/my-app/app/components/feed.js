"use client"
import React, { useState } from 'react'
import abdul from "../../public/hero-image.png"
import Image from 'next/image'

import media from "../../public/media.png"
import calculator from "../../public/calculator.png"
import { MdPermMedia } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { MdArticle } from "react-icons/md";
import Postcard from './postcard'
import Postinfo from './postinfo'

const Feed = () => {
    const [writepost, setWritepost] = useState(false)
    localStorage.setItem("state",writepost)
    return (
        <div className='relative'>
            <div className={`w-[100vw] ${writepost?"flex":"hidden"} fixed left-0 top-0 h-screen bg-black opacity-50`}></div>
            {/* post section */}
            <div className='bg-white rounded-md border px-4 py-4 shadow-lg border-gray-300'>
                <div className='flex gap-4 items-center'>
                    <div className=''>
                        <Image className='w-[3rem] h-[3rem] bg-black rounded-full' src={abdul} alt="Profile Image" />
                    </div>

                    <div className='basis-[83%]'>
                        <input onClick={() => setWritepost(!writepost)} className='w-full py-2 hover:bg-[#F3F3F3] border text-black font-medium cursor-pointer border-gray-400 rounded-full pl-4' placeholder='start a post, trying with ai' />
                    </div>
                </div>

                <div className='flex justify-between px-8 pt-4'>
                    <div className='flex items-center gap-1'>
                        <MdPermMedia className='text-[#378FE9]' style={{ width: '20px', height: '20px' }} />
                        <div>Media</div>
                    </div>
                    <div className='flex items-center gap-1'>
                        <SlCalender className='text-[#C37D16]' style={{ width: '20px', height: '20px' }} />
                        <div>Event</div>
                    </div>
                    <div className='flex items-center gap-1'>
                        <MdArticle className='text-[#E06847]' style={{ width: '20px', height: '20px' }} />
                        <div>Write article</div>
                    </div>
                </div>
            </div>
            {/* post end */}
            <div className={`fixed top-10 left-0  w-full ${writepost ? "flex flex-col" : "hidden"}`}>
                <Postcard setWritepost={setWritepost} />
            </div>

            <Postinfo/>
        </div>
    )
}

export default Feed