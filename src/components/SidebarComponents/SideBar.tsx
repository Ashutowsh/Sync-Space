import React, { useEffect, useState } from 'react';
import SyncSpaceLogo from '../Header/Logo';
import { Bell } from 'lucide-react';
import { Button } from '../ui/button';
import DocumentList from './DocumentList';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Progress } from "@/components/ui/progress";
import { useDocumentStore } from '@/store/documentsStore';
import Link from 'next/link';
import { databases } from '@/models/server/config';
import { db, workspaceCollection } from '@/models/name';
import NotificationBox from '../NotificationsComponents/NotificationBox';
import env from '@/env';

function SideBar({ params }: { params: { id: string, docId: string } }) {
  const { user } = useUser();
  const MAX_SIZE = env.limit.docs ;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { documentList, getDocuments, createDocument } = useDocumentStore();
  const [workspaceName, setWorkspaceName] = useState<string>();

  const getName = async () => {
    if (!params?.id) return;

    try {
      const workspace = await databases.getDocument(db, workspaceCollection, params.id);
      setWorkspaceName(workspace.title);
    } catch (error) {
      console.error('Error fetching workspace:', error);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getName();
    }
  }, [params?.id]);

  useEffect(() => {
    if (params) {
      getDocuments(params.id);
    }
  }, [params]);

  const handleCreateWorkspace = async () => {
    setIsLoading(true);
    const responseId = await createDocument(params.id, user?.primaryEmailAddress?.emailAddress!, MAX_SIZE);
    router.replace(`/workspace/${params.id}/${responseId}`);
    setIsLoading(false);
  };

  return (
    <div className='h-screen fixed md:w-72 hidden md:block bg-blue-50 p-5 shadow-md'>
      <div className='flex justify-between items-center'>
        <Link href="/dashboard">
          <SyncSpaceLogo />
        </Link>
        <NotificationBox> 
          <Bell className='h-5 w-5 text-gray-500' />
        </NotificationBox>
      </div>
      <hr className='my-5' />

      <div>
        <div className='flex items-center justify-between'>
          <h2 className='font-medium'>{workspaceName ? workspaceName : "Workspace Name"}</h2>
          <Button
            disabled={isLoading}
            onClick={handleCreateWorkspace}
          >
            {isLoading ? (
              <div className="inline-block w-4 h-4 border-2 border-t-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            ) : (
              "+"
            )}
          </Button>
        </div>
      </div>

      <DocumentList params={params} maxSize={MAX_SIZE}/>

      <div className='absolute bottom-10 w-[85%]'>
        <Progress value={(documentList.length / MAX_SIZE) * 100} className='bg-white' />
        <h2 className='text-sm font-light my-2'><strong>{documentList.length}</strong> out of <strong>{MAX_SIZE}</strong> used.</h2>
        <h2 className='text-sm font-light my-2'>Upgrade your plan for more access.</h2>
      </div>
    </div>
  );
}

export default SideBar;
