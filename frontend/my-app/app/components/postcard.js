"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import abdul from "../../public/hero-image.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import { MdPermMedia } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { MdArticle } from "react-icons/md";
import { MdCelebration } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

const Postcard = () => {
    const [text, setText] = useState("");
    const [emoji, setEmoji] = useState(false)

    const handleEmojiClick = (emojiObject, event) => {
        console.log(emojiObject); // Log the emojiObject to inspect it
        setText(prevText => prevText + emojiObject.emoji);
    };

    return (
        <div className='flex justify-center mt-4'>
            <div className='bg-white w-[95%] md:w-[53%] relative px-8 py-4 rounded-lg shadow-lg'>
                <div className='flex flex-col gap-5 justify-between'>
                    <div className='flex justify-between'>
                        <div className='flex gap-4'>
                            <Image className='w-[3.8rem] h-[3.8rem] lg:w-[3.8rem] bg-black rounded-full' src={abdul} alt="Abdul" />
                            <div className='flex flex-col'>
                                <div className='font-semibold'>Abdul Rahaman</div>
                                <div className='text-[0.7rem]'>Post to anyone</div>
                            </div>
                            <div>
                                <IoMdArrowDropdown />
                            </div>
                        </div>
                        <RxCross2 className='w-[1.6rem] h-[1.6rem] cursor-pointer' />
                    </div>


                    {/* Writing post */}
                    <div>
                        <textarea
                            className='resize-none w-full h-[22rem]  outline-none'
                            placeholder="what do you want to talk about."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />

                    </div>
                    <div className={`absolute top-[1.5rem] lg:-left-[12rem] h-[4rem] ${emoji ? "flex" : "hidden"}`}>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>

                    <div onClick={() => setEmoji(!emoji)} className=' cursor-pointer'>
                        <BsEmojiSmile />
                    </div>

                    <div className='flex gap-6  px-2 pt-4'>

                        <MdPermMedia  className='text-[#666666] cursor-pointer' style={{ width: '20px', height: '20px' }} />



                        <SlCalender className='text-[#666666] cursor-pointer' style={{ width: '20px', height: '20px' }} />



                        <MdCelebration className='text-[#666666] cursor-pointer' style={{ width: '20px', height: '20px' }} />


                        <FaPlus className='text-[#666666] cursor-pointer' />
                    </div>
                  

                
                  
                  <div className='flex items-center border-t-[1.2px] px-0 pt-4 justify-end gap-2'>
                     
                     <FaRegClock className=' cursor-pointer' />
                     <div className='bg-[#E8E6E2] px-6 py-1 cursor-pointer rounded-full'>
                         <div className='text-[<FaRegClock />]'>post</div>
                     </div>
                     </div>
               
                   
                    {/* Writing post end */}
                </div>
            </div>
        </div>
    );
};

export default Postcard;
