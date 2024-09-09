'use client';
import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from "@clerk/nextjs";
import { BsGrid } from "react-icons/bs";
import { FiAlignLeft } from "react-icons/fi";
import workspaceImage from "../../../../public/images/workspace.png";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import NavBar from '@/components/Header/NavBar';
import WorkSpaceList from '@/components/WorkSpaceComponents/WorkSpaceList';
import { Query, Models, ID } from 'node-appwrite';
import { databases } from '@/models/server/config';
import { db, workspaceCollection } from '@/models/name';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  const { orgId } = useAuth();
  const { user, isLoaded, isSignedIn } = useUser();
  const [workspacesResponse, setWorkspacesResponse] = useState<Models.DocumentList<Models.Document> | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    user && saveUser();
  }, [user])

  const saveUser = async() => {
    try {
      const existingUser = await databases.listDocuments(db, "66ccab89002a9d3dac41", [
        Query.equal("name", user?.username!)
      ]);
      if(existingUser.total >= 1){
        return;
      }
      // console.log(user?.username)
      await databases.createDocument(db, "66ccab89002a9d3dac41", user?.username!, {
        name : user?.username,
        email : user?.primaryEmailAddress?.emailAddress,
        avatar : user?.imageUrl
      })
      console.log("User got saved into the system.")
    } catch (error) {
      console.log("Error in saving the user.", error);
    }
  }

  const getWorkspaces = async (id: string) => {
    try {
      setIsFetching(true);
      const response = await databases.listDocuments(db, workspaceCollection, [
        Query.orderDesc("$createdAt"),
        Query.equal("organizationId", id)
      ]);

      setWorkspacesResponse(response);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const identifier = orgId || user?.primaryEmailAddress?.emailAddress;

      if (!identifier) {
        console.log('Neither Organization ID nor User Email Address is available.');
        return;
      }

      if (isLoaded && isSignedIn) {
        await getWorkspaces(identifier);
      }
    };

    fetchTasks();
  }, [orgId, user, isLoaded, isSignedIn]);

  return (
    <div>
      <NavBar />
      <div className='my-10 p-10 md:px-24 lg:px-36 xl:px-52'>
        
        <div className='flex justify-between'>
          <h2 className='font-bold text-2xl'>Hello, {user?.fullName}</h2>
          <Link href="create-workspace"><Button>+</Button></Link>
        </div>

        <div className='mt-10 flex justify-between'>
          <div>
            <h2 className='font-medium text-primary'>Workspaces</h2>
          </div>

          <div className='flex gap-2'>
            <BsGrid />
            <FiAlignLeft />
          </div>
        </div>

        {isFetching ? (
          <div className='flex justify-center items-center'>
            <p>Loading workspaces...</p>
          </div>
        ) : (
          <>
            {workspacesResponse?.documents?.length === 0 ? (
              <div className='flex flex-col justify-center items-center my-10'>
                <Image src={workspaceImage} alt='You have no workspaces.' width={200} height={200} />
                <h2>Create a Workspace</h2>
                <Link href='/create-workspace'><Button variant='outline' className='my-3'>+ New WorkSpace</Button></Link>
              </div>
            ) : (
              <WorkSpaceList workspaces={workspacesResponse!} />
            )}
          </>
        )}
        
      </div>
    </div>
  );
};

export default Dashboard;
