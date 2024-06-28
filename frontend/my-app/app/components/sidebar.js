'use client'
import React, { useState } from 'react'
import abdul from "../../public/hero-image.png"
import save from "../../public/save.png"
import Image from 'next/image'
import Arrow from '@/public/icons/arrow'

const Sidebar = () => {
    const [showmore, setShowmore] = useState(false)
    return (
        <div className={`flex flex-col gap-2`}>
            <div className='bg-white rounded-md '>
                {/* top card */}
                <div>
                    <div className='h-[4rem] w-full bg-[#A0B4B7] rounded-t-lg'>

                    </div>
                    <div className='flex justify-center -mt-8'>
                        <Image className='w-[3.8rem] lg:w-[3.8rem] bg-black rounded-full' src={abdul} />
                    </div>

                    <div className='flex flex-col pt-5 place-items-center'>
                        <div className='font-semibold '>Abdul Rahaman</div>
                        <div className='text-[0.7rem] text-gray-600 pb-[1rem]'>Developer at Devsed</div>
                    </div>

                    <div className={`${showmore ? "flex" : "hidden"}   md:flex flex-col`}>
                        <div className='py-[1rem] border-t-[1px] border-b-[1px] '>
                            <div className='flex justify-between px-3'>
                                <div className='text-[#5E5E5E] text-[0.8rem]'>profile viewers</div>
                                <div className='text-[#0A66C2]  text-[0.8rem] font-bold'>12</div>
                            </div>
                            <div className='flex justify-between  px-3'>
                                <div className='flex flex-col pt-2'>
                                    <div className='text-[#5E5E5E] text-[0.8rem]'>connections</div>
                                    <div className='text-[0.8rem]'>Grow your Network</div>
                                </div>

                                <div className='text-[#0A66C2]  text-[0.8rem] font-bold'>134</div>
                            </div>
                        </div>

                        <div className='text-[0.8rem] px-4 py-3'>
                            <div className='text-[#5E5E5E] '>
                                Strengthen your profile with an AI writing assistant
                            </div>
                            <div className='text-black font-semibold'>
                                Get hired faster. Try Premium free.
                            </div>

                        </div>

                        <div className='flex gap-2 pt-4 px-4 border-t-[1px] py-3'>
                            <Image className='  w-[1rem] ' src={save} />
                            <div className='text-black text-[0.8rem]'>Saved items</div>
                        </div>
                         
                         <div className=' w-full h-[10px] bg-[#F4F2EE]'></div>
                      
                        <div className='bg-white rounded-md '>
                            <div className=' py-4 px-4 text-[0.8rem]'>
                                <div className='pb-2'>Recent</div>
                                <div className='flex gap-4'>
                                    <div className=' text-[#3B3B3B] font-bold'>#</div>
                                    <div>india</div>
                                </div>
                                <div className='flex flex-col gap-4 pt-[2rem] text-[0.8rem]'>
                                    <div className='text-[#0A66C2] font-semibold'>Groups</div>
                                    <div className='text-[#0A66C2] font-semibold'>Events</div>
                                    <div className='text-[#0A66C2] font-semibold'>Followed hashtags</div>
                                    <div className='flex gap-4'>
                                        <div className=' text-[#3B3B3B] font-bold'>#</div>
                                        <div>india</div>
                                    </div>
                                    <div>see all</div>


                                </div>

                            </div>
                            <div className=' border-t-[1px] py-4'>
                                <div className='text-center'>Discover more</div>
                            </div>
                        </div>
                    </div>






                </div>
                {/* top card end */}


            </div>
            {/* bottom card */}


            <div onClick={() => setShowmore(!showmore)} className='md:hidden flex bg-[#E9E7E4] justify-center items-center py-3 gap-2'>
                <div className=''>
                    {showmore ? 'Show less' : 'Show more'}
                </div>
                <div className={`${showmore ? "rotate-180" : ""}`} >
                    <Arrow />
                </div>

            </div>
            {/* bottom card end */}
        </div>

    )
}

export default Sidebar