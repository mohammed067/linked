"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import linkedin from '../../public/linkedin.png';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Confirm = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const dat = localStorage.getItem("user");

            if (!dat) {
                setError("User data not found. Please try again.");
                return;
            }

            const userData = JSON.parse(dat);
            const email = userData.user.email;

            const response = await axios.post("http://localhost:3007/email-confirmation", { email, otp });
            setSuccess("Registration successful!");
            console.log(response);

            router.push('/feed');
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

                    <div className='px-[1rem] bg-white rounded-md py-3 lg:py-[1.5rem] lg:px-[1.5rem]'>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                            <div className='flex flex-col gap-1'>
                                <label className='text-[0.8rem] text-black' htmlFor='otp'>Enter Otp</label>
                                <input
                                    onChange={(e) => setOtp(e.target.value)}
                                    className='border py-1 border-black rounded-md hover:bg-[#F3F2F0] cursor-pointer hover:border-black hover:border-2'
                                    type='text'
                                    id='otp'
                                    value={otp}
                                />
                            </div>

                            {error && <div className='text-red-500 text-sm'>{error}</div>}
                            {success && <div className='text-green-500 text-sm'>{success}</div>}

                            <button type='submit' className='bg-[#0A66C2] px-2 py-2 text-white rounded-md'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirm;
