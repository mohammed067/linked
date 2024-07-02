import React from 'react'
import abdul from "../../public/hero-image.png";
import Image from 'next/image';
import Dyna from '@/public/dyna';


const Postinfo = () => {
    return (
        <div className='bg-[#FFFFFF] mt-4 px-4 py-3 rounded-lg shadow-lg border border-gray-300'>
            <div className='flex gap-4'>
                <Image className='w-[3.8rem] h-[3.8rem] lg:w-[3.8rem] bg-black rounded-full' src={abdul} alt="Abdul" />
                <div className='flex flex-col'>
                    <div className='font-semibold'>Abdul Rahaman</div>
                    <div className='text-[0.7rem]'>Developer at devsed</div>
                </div>




            </div>
            <div>
                <div className='text-[0.9rem] pt-3'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is a</div>
            </div>

            <div>
            {/* <Image className='w-[3.8rem] h-[3.8rem] lg:w-[3.8rem] bg-black rounded-full' src={abdul} alt="Abdul" /> */}
            <Dyna/>
            </div>

        </div>
    )
}

export default Postinfo