"use client"
import React, { useState } from 'react'
import coverPic from "../../../../public/images/coverImage.png"
import Image from 'next/image';
function page() {

    const [coverImage, setCoverImage] = useState(coverPic);
  return (
    <div className='p-10 md:px-36 lg:px-52 xl:px-80 py-20'>
      <div>
        <div className='relative group cursor-pointer'>
          <h2 className='hidden absolute p-4 w-full h-full items-center justify-center 
          text-xl font-bold group-hover:flex '>Change Cover</h2>
          <div className='group-hover:opacity-80'>
            <Image src={coverImage} alt='This is a cover-image.' width={400} height={400}
            className='w-full h-[150px] rounded-t-lg object-cover'/>
          </div>
        </div>

        <div className='p-12 '>
          <h2 className='font-medium text-xl'> Create a new workspace.</h2>
        </div>
      </div>
    </div>
  )
}

export default page

