"use client"
import React, { useState, useEffect } from 'react'
import abdul from "../../public/hero-image.png"
import Image from 'next/image'

import media from "../../public/media.png"
import calculator from "../../public/calculator.png"
import { MdPermMedia } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { MdArticle } from "react-icons/md";
import Postcard from './postcard'
import Postinfo from './postinfo'
import axios from 'axios'

const Feed = () => {
    const [writepost, setWritepost] = useState(false)
    const [user, setUser] = useState(null)
    const [profpic, setProfpic] = useState(null);
    const [profname, setProfname] = useState(null);

    useEffect(() => {
        const getlocalstorage = localStorage.getItem("user");
        const storedUser = JSON.parse(getlocalstorage);
        if (storedUser && storedUser.user && storedUser.user._id) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        // if (user) {
        //     const fetchUserProfile = async () => {
        //         try {
        //             const response = await axios.get(`http://localhost:3007/get/${user.user.email}`);
        //             console.log(response.data, "this is finalllll response");
        //             if (!response.data.profile) {
        //                 setProfname(user.user.email[0]);
        //             } else {
        //                 const profilePath = response.data.profile ? response.data.profile.replace("public", "") : null;
        //                 console.log("this is user POST result", profilePath);
        //                 setProfpic(profilePath);
        //             }
        //         } catch (err) {
        //             console.log(err.message);
        //             console.log(err.response);
        //         }
        //     };

        //     fetchUserProfile();
        // }
        if (user){
            const fetchUserProfile=async()=>{
               try{
                const response = await axios.get(`http://localhost:3007/get/${user.user.email}`)
                if(!response.data.profile){
                    setProfname(user.user.email[0])

                }
                else{
                    const profilePath=response.data.profile ? response.data.profile.replace("public",""):null;
                    setProfpic(profilePath)
                }

               }
               catch (err){
                  console.log(err.response)
                  console.log(err.message)
               }
            }
        }
    }, [user]);

    

    return (
        <div className='relative'>
            <div className={`w-[100vw] ${writepost ? "flex" : "hidden"} fixed left-0 top-0 h-screen bg-black opacity-50`}></div>
            {/* post section */}
            <div className='bg-white rounded-md border px-4 py-4 shadow-lg border-gray-300'>
                <div className='flex gap-4 items-center'>
                {profpic ?
                                <label className="flex" >
                                    <img className='w-[3.8rem] lg:max-w-[3.8rem] lg:min-h-[3.8rem] lg:max-h-[3.8rem] bg-black rounded-full' src={`http://localhost:3007/${profpic}`} alt="Profile" />
                                </label> :
                                <label className="flex">
                                    <div className='w-[3.8rem] lg:max-w-[3.8rem] lg:min-h-[3.8rem] lg:max-h-[3.8rem] text-white items-center flex justify-center bg-gray-600 rounded-full'>{profname}</div>
                                </label>
                            }

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
            <div className={`fixed top-10 left-0 w-full ${writepost ? "flex flex-col" : "hidden"}`}>
                <Postcard setWritepost={setWritepost} />
            </div>

            <Postinfo />
        </div>
    )
}

export default Feed
