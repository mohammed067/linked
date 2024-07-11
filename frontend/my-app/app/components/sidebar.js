'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Arrow from '@/public/icons/arrow';
import save from "../../public/save.png";

const Sidebar = () => {
    const [showmore, setShowmore] = useState(false);
    const [media, setMedia] = useState(null);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [profpic, setProfpic] = useState(null);
    const [profname, setProfname] = useState(null);

    useEffect(() => {
        const getlocalstorage = localStorage.getItem("user");
        const user = JSON.parse(getlocalstorage);
        if (user && user.user && user.user._id) {
            setUser(user);
            setUserId(user.user._id);
            setProfname(user.user.email[0]);
        }
    }, []);

    useEffect(() => {
        if (user) {
            const fetchUserProfile = async () => {
                try {
                    const response = await axios.get(`http://localhost:3007/get/${user.user.email}`);
                    console.log(response.data, "this is final response");
                    if (!response.data.profile) {
                        setProfname(user.user.email[0]);
                    } else {
                        const profilePath = response.data.profile ? response.data.profile.replace("public", "") : null;
                        console.log("this is user result", profilePath);
                        setProfpic(profilePath);
                    }
                } catch (err) {
                    console.log(err.message);
                    console.log(err.response);
                }
            };

            fetchUserProfile();
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            console.log('UserId is required');
            return;
        }

        const formData = new FormData();
        formData.append('userId', userId);
        if (media) {
            formData.append('media', media);
        }

        try {
            const response = await axios.post('http://localhost:3007/edit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
            console.log(err.response);
        }

        try {
            const response = await axios.get(`http://localhost:3007/get/${user.user.email}`);
            console.log(response.data, "this is final response");
            localStorage.setItem("user", JSON.stringify(response.data))
            if (!response.data.profile) {
                setProfname(user.user.email[0]);
            } else {
                const profilePath = response.data.profile ? response.data.profile.replace("public", "") : null;
                console.log("this is user result", profilePath);
                setProfpic(profilePath);
            }
        } catch (err) {
            console.log(err.message);
            console.log(err.response);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <div className='bg-white rounded-md'>
                    <div>
                        <div className='h-[4rem] w-full bg-[#A0B4B7] rounded-t-lg'></div>
                        <div className='flex justify-center -mt-8'>
                            <input
                                id='med'
                                type='file'
                                style={{ display: 'none' }}
                                onChange={(e) => setMedia(e.target.files[0])}
                            />
                            {profpic ?
                                <label className="flex" htmlFor='med'>
                                    <img className='w-[3.8rem] lg:max-w-[3.8rem] lg:min-h-[3.8rem] lg:max-h-[3.8rem] bg-black rounded-full' src={`http://localhost:3007/${profpic}`} alt="Profile" />
                                </label> :
                                <label className="flex" htmlFor='med'>
                                    <div className='w-[3.8rem] lg:max-w-[3.8rem] lg:min-h-[3.8rem] lg:max-h-[3.8rem] text-white items-center flex justify-center bg-gray-600 rounded-full'>{profname}</div>
                                </label>
                            }
                            <button type='submit' className='bg-red-300 px-2 py-1'>
                                Upload Pic
                            </button>
                        </div>
                        <div className='flex flex-col pt-5 place-items-center'>
                            <div className='font-semibold'>Abdul Rahaman</div>
                            <div className='text-[0.7rem] text-gray-600 pb-[1rem]'>Developer at Devsed</div>
                        </div>
                        <div className={`${showmore ? "flex" : "hidden"} md:flex flex-col`}>
                            <div className='py-[1rem] border-t-[1px] border-b-[1px]'>
                                <div className='flex justify-between px-3'>
                                    <div className='text-[#5E5E5E] text-[0.8rem]'>Profile Viewers</div>
                                    <div className='text-[#0A66C2] text-[0.8rem] font-bold'>12</div>
                                </div>
                                <div className='flex justify-between px-3'>
                                    <div className='flex flex-col pt-2'>
                                        <div className='text-[#5E5E5E] text-[0.8rem]'>Connections</div>
                                        <div className='text-[0.8rem]'>Grow your Network</div>
                                    </div>
                                    <div className='text-[#0A66C2] text-[0.8rem] font-bold'>134</div>
                                </div>
                            </div>
                            <div className='text-[0.8rem] px-4 py-3'>
                                <div className='text-[#5E5E5E]'>
                                    Strengthen your profile with an AI writing assistant
                                </div>
                                <div className='text-black font-semibold'>
                                    Get hired faster. Try Premium free.
                                </div>
                            </div>
                            <div className='flex gap-2 pt-4 px-4 border-t-[1px] py-3'>
                                <Image className='w-[1rem]' src={save} alt="Saved items" />
                                <div className='text-black text-[0.8rem]'>Saved items</div>
                            </div>
                            <div className='w-full h-[10px] bg-[#F4F2EE]'></div>
                            <div className='bg-white rounded-md'>
                                <div className='py-4 px-4 text-[0.8rem]'>
                                    <div className='pb-2'>Recent</div>
                                    <div className='flex gap-4'>
                                        <div className='text-[#3B3B3B] font-bold'>#</div>
                                        <div>India</div>
                                    </div>
                                    <div className='flex flex-col gap-4 pt-[2rem] text-[0.8rem]'>
                                        <div className='text-[#0A66C2] font-semibold'>Groups</div>
                                        <div className='text-[#0A66C2] font-semibold'>Events</div>
                                        <div className='text-[#0A66C2] font-semibold'>Followed hashtags</div>
                                        <div className='flex gap-4'>
                                            <div className='text-[#3B3B3B] font-bold'>#</div>
                                            <div>India</div>
                                        </div>
                                        <div>See all</div>
                                    </div>
                                </div>
                                <div className='border-t-[1px] py-4'>
                                    <div className='text-center'>Discover more</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={() => setShowmore(!showmore)} className='md:hidden flex bg-[#E9E7E4] justify-center items-center py-3 gap-2'>
                    <div>{showmore ? 'Show less' : 'Show more'}</div>
                    <div className={`${showmore ? "rotate-180" : ""}`}>
                        <Arrow />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Sidebar;
