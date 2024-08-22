'use client'
import React, { useState } from 'react'
import { useUser } from "@clerk/nextjs";
import {FaSquarePlus } from "react-icons/fa6";
import { BsGrid } from "react-icons/bs";
import { FiAlignLeft } from "react-icons/fi";
import workspaceImage from "../../../../public/images/workspace.png"
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
function Dashboard() {
  const {user} = useUser();

  const [tasks, setTasks] = useState([]);
  return (
    <div className='flex-col gap-[400px]'>
      <div className='flex items-center mx-[300px] py-[100px] justify-between'>
        <div>
          <p className='text-3xl mb-12'>
            Hello, <span className='font-semibold'>{ user?.firstName}</span>
          </p>
          <div className='mt-10 text-violet-600 text-xl font-bold'>
            Workspaces
          </div>
        </div>
        <div>
          <Link href="/create-workspace">
          <FaSquarePlus className='text-3xl'/>
          </Link>
          <div className='flex gap-6 mt-12 text-xl'>
            <BsGrid />
            <FiAlignLeft />
          </div>
        </div>
      </div>
      {
        tasks.length === 0 && 
        <div className='flex flex-col items-center justify-center gap-10'>
          <Image src={workspaceImage} alt='This is a worksapce image.' className='w-[200px] h-[200px]'/>

          <h2>Currently, You have no workspaces!</h2>
          <Link href="/create-workspace">
          <Button variant="outline" > + Create New Workspace</Button>
          </Link>
      </div>
      }
    </div>
  )
}

export default Dashboard