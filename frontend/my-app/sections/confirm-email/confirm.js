"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import linkedin from '../../public/linkedin.png';
import Google from '@/public/icons/google';
import axios from 'axios';

const Confirm = () => {
    const [email, setEmail] = useState("");
   const [otp,setOtp]=useState("")
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [checkid,setCheckid]=useState("")
    const [res,setRes]=useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
   

     

        try {
          const dat = localStorage.getItem("user");
   
          const userData = JSON.parse(dat);
          console.log("this is confirmation checking",userData.user.email)
          const email=userData.user.email
          console.log("this is second confiramtion",email)
           
            const response = await axios.post("http://localhost:3007/email-confirmation", {email, otp});
            setSuccess("Registration successful!");
            console.log(response); // Handle success scenario (redirect, show message, etc.)

           
            
            console.log("checking res",res)
            
          
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error); // Show error message from the backend
            } else {
                setError("An error occurred. Please try again."); // Generic error message
            }
            console.error("Error submitting form:", error);
        }
    };

    
    // console.log("email",userData.email)

    // try {
    //   const userData = JSON.parse(dat);
    //   if (userData && userData.user && userData.user.email) {
    //     console.log("Checking email:", userData.user.email);
    //   } else {
    //     console.log("No valid user data found in localStorage.");
    //   }
    // } catch (error) {
    //   console.error("Error parsing JSON from localStorage:", error);
    // }
    
  return (
    <div className='h-screen px-2 pt-4'>
            <Image className='w-[8rem] xl:ml-[10rem] xl:mt-2' src={linkedin} alt='LinkedIn Logo' />
            <div className='flex justify-center'>
                <div className='flex flex-col pt-6 max-w-[30rem] lg:max-w-[25rem]'>
                 
                    <div className='px-[1rem] bg-white rounded-md py-3 lg:py-[1.5rem] lg:px-[1.5rem]'>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
                           
                            <div className='flex flex-col gap-1'>
                                <label className='text-[0.8rem] text-black' htmlFor='password'>Enter Otp</label>
                                <input 
                                    onChange={(e) => setOtp(e.target.value)} 
                                    className='border py-1 border-black rounded-md hover:bg-[#F3F2F0] cursor-pointer hover:border-black hover:border-2' 
                                    type='otp' 
                                    id='otp' 
                                    value={otp} 
                                />
                            </div>


                            {error && <div className='text-red-500 text-sm'>{error}</div>}
                          

                          
                        <button type='submit' className=' bg-[#0A66C2] px-2 py-2 text-white rounded-md'>Submit</button>
                         

                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Confirm