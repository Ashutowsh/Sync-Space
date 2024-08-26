import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Models } from 'node-appwrite';

interface WorkSpaceListProps {
    workspaces: Models.DocumentList<Models.Document>;
  }

const WorkSpaceList: React.FC<WorkSpaceListProps> = ({ workspaces }) => {

    const router = useRouter();

    return (
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
        {workspaces?.documents?.map((workspace) => (
          <div key={workspace.workSpaceId} className='border shadow-xl rounded- hover:scale-105 transition-all cursor-pointer'
          onClick={() => router.replace(`workspace/${workspace.$id}`)}
          >
            <Image src={workspace?.coverImage}
            width={400} height={200} alt='cover'
            />
            <div className='p-4 rounded-b-xl'>
            <h2 className='flex gap-2'>{workspace?.emoji} {workspace.title}</h2>
            </div>
          </div>
        ))}
      </div>
    );
  };

export default WorkSpaceList
