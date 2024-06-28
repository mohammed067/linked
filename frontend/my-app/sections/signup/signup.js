"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import linkedin from '../../public/linkedin.png';
import Google from '@/public/icons/google';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [res, setRes] = useState({});
    
    const router = useRouter(); // Moved inside the component

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        if (password.length <= 5) {
            setError("Password must be greater than 5 characters.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3007/register", { email, password });
            setSuccess("Registration successful!");
            console.log(response); // Handle success scenario (redirect, show message, etc.)

            localStorage.setItem("user", JSON.stringify(response.data));
            setRes(response);
            console.log("checking res", res);

            router.push('/confirm-email'); // Moved this line here to run after successful registration
          
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error); // Show error message from the backend
            } else {
                setError("An error occurred. Please try again."); // Generic error message
            }
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className='h-screen px-2 pt-4'>
            <Image className='w-[8rem] xl:ml-[10rem] xl:mt-2' src={linkedin} alt='LinkedIn Logo' />
            <div className='flex justify-center'>
                <div className='flex flex-col pt-6 max-w-[30rem] lg:max-w-[25rem]'>
                    <div className='text-[1.4rem] md:text-[1.8rem] min-w-max py-4 text-center'>
                        Join LinkedIn now - it's free!
                    </div>
                    <div className='px-[1rem] bg-white rounded-md py-3 lg:py-[1.5rem] lg:px-[1.5rem]'>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-1'>
                                <label className='text-[0.8rem] text-black' htmlFor='email'>Email or phone number</label>
                                <input 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className='border py-1 border-black rounded-md hover:bg-[#F3F2F0] cursor-pointer hover:border-black hover:border-2' 
                                    type='text' 
                                    id='email' 
                                    value={email} 
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className='text-[0.8rem] text-black' htmlFor='password'>Password (6+ characters)</label>
                                <input 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className='border py-1 border-black rounded-md hover:bg-[#F3F2F0] cursor-pointer hover:border-black hover:border-2' 
                                    type='password' 
                                    id='password' 
                                    value={password} 
                                />
                            </div>

                            {error && <div className='text-red-500 text-sm'>{error}</div>}
                            {success && <div className='text-green-500 text-sm'>{success}</div>}

                            <div>
                                <div className='md:w-[22.6rem] text-[#666666] text-[0.7rem] text-center'>
                                    By clicking Agree & Join or Continue, you agree to the LinkedIn
                                    <span className='text-[#008CCF] pl-1'>User Agreement, Privacy Policy, and Cookie Policy.</span>
                                </div>
                            </div>

                            <button className='bg-[#0A66C2] cursor-pointer py-2 rounded-full text-white' type='submit'>
                                Agree & Join
                            </button>

                            <div className='flex items-center gap-4'>
                                <div className='h-[1px] w-full bg-[#CDCFD2]'></div>
                                <div>or</div>
                                <div className='h-[1px] w-full bg-[#CDCFD2]'></div>
                            </div>
                            
                            <div className='flex cursor-pointer border border-[#666666] justify-center py-1 rounded-full items-center gap-4'>
                                <Google />
                                <div>Continue with Google</div>
                            </div>

                            <div>
                                <div className='text-center pt-8'>
                                    Already on LinkedIn?<span className='text-[#0A66C2] cursor-pointer'>Sign In</span>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
