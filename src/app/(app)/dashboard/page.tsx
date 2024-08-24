'use client';
import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from "@clerk/nextjs";
import { FaSquarePlus } from "react-icons/fa6";
import { BsGrid } from "react-icons/bs";
import { FiAlignLeft } from "react-icons/fi";
import workspaceImage from "../../../../public/images/workspace.png";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import axios from "axios";

const Dashboard = () => {
  const { orgId } = useAuth();
  const { user, isLoaded, isSignedIn } = useUser();
  const [tasks, setTasks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const identifier = orgId || user?.primaryEmailAddress?.emailAddress;

      if (!identifier) {
        console.log('Neither Organization ID nor User Email Address is available.');
        return;
      }

      setIsFetching(true);
      try {
        const response = await axios.post('/api/workspace', { id: identifier });
        console.log(response);
        setTasks(response.data.documents);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setIsFetching(false);
      }
    };

    if (isLoaded && isSignedIn) {
      fetchTasks();
    }
  }, [orgId, user, isLoaded, isSignedIn]);

  return (
    <div className='flex flex-col gap-10 px-8 py-8'>
      <div className='flex items-center justify-between mx-auto max-w-7xl py-10'>
        <div>
          <p className='text-3xl mb-12'>
            Hello, <span className='font-semibold'>{user?.firstName}</span>
          </p>
          <div className='mt-10 text-violet-600 text-xl font-bold'>
            Workspaces
          </div>
        </div>
        <div>
          <Link href="/create-workspace">
            <FaSquarePlus className='text-3xl cursor-pointer' />
          </Link>
          <div className='flex gap-6 mt-12 text-xl'>
            <BsGrid />
            <FiAlignLeft />
          </div>
        </div>
      </div>

      {isFetching && (
        <div className='flex justify-center items-center'>
          <p>Loading workspaces...</p>
        </div>
      )}

      {!isFetching && tasks.length === 0 && (
        <div className='flex flex-col items-center justify-center gap-10'>
          <Image src={workspaceImage} alt='Workspace image' className='w-52 h-52' />
          <h2 className='text-xl'>Currently, you have no workspaces!</h2>
          <Link href="/create-workspace">
            <Button variant="outline">+ Create New Workspace</Button>
          </Link>
        </div>
      )}

      {!isFetching && tasks.length > 0 && (
        <div className='mx-auto max-w-7xl py-10'>
          <h2 className='text-2xl font-semibold mb-4'>Your Workspaces</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {tasks.map(task => (
              <div key={task.title} className='p-6 bg-white shadow-lg rounded-lg'>
                <h3 className='text-xl font-semibold mb-2'>{task.title}</h3>
                <p>{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
