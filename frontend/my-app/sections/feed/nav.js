<div className='fixed top-10'>
<div className='flex  items-center gap-4 lg:justify-evenly'>
    <div className='flex gap-4 items-center'>
        <Image className='w-[2rem] lg:w-[2.3rem]' src={linklogo} />
        <div className=' h-[2rem] hidden lg:flex items-center px-3 gap-3 bg-[#EDF3F8]'>
            <Search />
            <input className='bg-[#EDF3F8] outline-none  w-full' placeholder='search' />
        </div>

        {/* mobile view */}
        {/* <div onClick={()=>setMobileinput(!mobileinput)} className='flex h-[2rem]  items-center px-3 gap-3 bg-[#EDF3F8]'>
    <Search />
    <input type='text' className='bg-[#EDF3F8] outline-none  ' placeholder='search' />
</div> */}
    </div>
    <div className={`flex gap-[4rem]  lg:justify-center ${mobileinput ? "hidden" : "flex"} lg:gap-4 text-[0.8rem]`}>

        <div onClick={() => setMobileinput(!mobileinput)} className='flex h-[2rem] items-center px-3 gap-3 lg:hidden '>
            <Search />

        </div>

        <div className='flex flex-col gap-1 items-center justify-center'>
            <Image className='w-[1.3rem] ' src={home} />
            <div className='text-[0.8rem] hidden lg:flex'>Home</div>
        </div>
        <div className='flex flex-col gap-1 justify-center items-center'>
            <Image className='w-[1.3rem] text-gray-300' src={team} />
            <div className='text-[0.8rem] hidden lg:flex'>My Network</div>
        </div>
        <div className='flex flex-col gap-1 justify-center items-center'>
            <Image className='w-[1.3rem]' src={chat} />
            <div className='hidden lg:flex'>Jobs</div>
        </div>
        <div className='flex flex-col gap-1 justify-center items-center'>
            <Image className='w-[1.3rem]' src={suitcase} />
            <div className='hidden lg:flex'>Messging</div>
        </div>
        <div className='flex flex-col gap-1 justify-center items-center'>
            <Image className='w-[1.3rem]' src={notification} />
            <div className='hidden lg:flex'>Notification</div>
        </div>
        <div className='flex flex-col justify-center items-center '>
            <Business />
            <div className='flex'>
                <div className='hidden lg:flex'>For Business</div>
                <div className='hidden lg:flex'><Arrow /></div>
            </div>

        </div>
    </div>
    <div className={`flex h-[2rem] lg:hidden items-center bg-[#EDF3F8] px-3 gap-3 ${!mobileinput ? " hidden" : "flex"} `}>
        <Search />
        <input className='bg-[#EDF3F8] outline-none  w-full' placeholder='search' />
    </div>
</div>
</div>