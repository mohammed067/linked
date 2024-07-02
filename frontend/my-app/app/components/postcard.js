
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import abdul from "../../public/hero-image.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdClose } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import { MdPermMedia } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { MdCelebration } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

const Postcard = ({ setWritepost }) => {
    const [title, setTitle] = useState("");
    const [emoji, setEmoji] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [media, setMedia] = useState(null);

    useEffect(() => {
        const getlocalstorage = localStorage.getItem("user");
        const user = JSON.parse(getlocalstorage);
        if (user && user.user && user.user._id) {
            setUser(user);
            setUserId(user.user._id);
        }
    }, []);

    const handleEmojiClick = (emojiObject) => {
        setTitle(prevText => prevText + emojiObject.emoji);
        setEmoji(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !userId) {
            console.log('Title and userId are required');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('userId', userId);
        if (media) {
            formData.append('media', media);
        }

        try {
            const response = await axios.post('http://localhost:3007/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
            console.log(err.response);
        }
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
                        <MdClose onClick={() => setWritepost(false)} className='w-[1.6rem] h-[1.6rem] cursor-pointer' />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className='h-[22rem] overflow-scroll'>
                            <div className='flex flex-col'>
                                <textarea
                                    className='resize-none min-h-[22rem] max-h-[22rem] outline-none flex-grow'
                                    placeholder="What do you want to talk about."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                {media && (
                                    <div className="mt-4">
                                        <Image src={URL.createObjectURL(media)} width={600} height={600} alt="Uploaded Media" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`absolute top-[1.5rem] lg:-left-[12rem] h-[4rem] ${emoji ? "flex" : "hidden"}`}>
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>

                        <div onClick={() => setEmoji(!emoji)} className='cursor-pointer'>
                            <BsEmojiSmile />
                        </div>
                        <div className='flex gap-6 px-2 pt-4'>
                            <input
                                id='med'
                                type='file'
                                style={{ display: 'none' }}
                                onChange={(e) => setMedia(e.target.files[0])}
                            />
                            <label htmlFor='med'>
                                <MdPermMedia className='text-[#666666] cursor-pointer' style={{ width: '20px', height: '20px' }} />
                            </label>
                            <IoCalendar className='text-[#666666] cursor-pointer' style={{ width: '20px', height: '20px' }} />
                            <MdCelebration className='text-[#666666] cursor-pointer' />
                            <FaPlus className='text-[#666666] cursor-pointer' />
                        </div>
                        <div className='flex items-center border-t-[1.2px] px-0 pt-4 justify-end gap-2'>
                            <FaRegClock className='cursor-pointer' />
                            <div className='bg-[#E8E6E2] px-6 py-1 cursor-pointer rounded-full'>
                                <button type='submit' className='text-[FaRegClock]'>Post</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Postcard;