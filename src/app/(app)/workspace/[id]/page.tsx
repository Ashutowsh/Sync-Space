'use client';

import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '@/components/Header/NavBar';
import { db, documentCollection, documentOutputCollection, workspaceCollection } from '@/models/name';
import { databases } from '@/models/server/config';
import { ID, Models, Query } from 'node-appwrite';
import { WorkspaceDocumentList } from '@/components/WorkSpaceComponents/WorkspaceDocumentList';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { FaPlus } from 'react-icons/fa';
import { Progress } from '@/components/ui/progress';
import env from '@/env';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const MAX_SIZE = env.limit.docs;

const Page = ({ params }: { params: { id: string, docId: string } }) => {
  const workspaceId = params.id!;
  const [documentsResponse, setDocumentsResponse] = useState<Models.DocumentList<Models.Document> | null>(null);
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [isFetching, setIsFetching] = useState(false);
  const [documentList, setDocumentList] = useState<Models.Document[]>([]);
  const router = useRouter();
  const { user } = useUser();

  const getDocuments = useCallback(async (id: string) => {
    try {
      setIsFetching(true);
      const response = await databases.listDocuments(db, documentCollection, [
        Query.equal("workSpaceId", id),
        Query.orderDesc("$createdAt")
      ]);
      setDocumentsResponse(response);
      setDocumentList(response.documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const getWorkspaceName = useCallback(async (id: string) => {
    try {
      const response = await databases.getDocument(db, workspaceCollection, id);
      setWorkspaceName(response.title);
    } catch (error) {
      console.error('Error fetching workspace name:', error);
    }
  }, []);

  const handleCreateDocument = async () => {
    if (documentList.length >= MAX_SIZE) {
      toast('Upgrade your plan.', {
        description: 'You have reached your free limits.',
        action: {
          label: 'Upgrade',
          onClick: () => console.log('Upgrade clicked'),
        },
      });
      return;
    }

    try {
      const responseDocument = await databases.createDocument(db, documentCollection, ID.unique(), {
        createdBy: user?.primaryEmailAddress?.emailAddress,
        workSpaceId: workspaceId,
        title: "Untitled Document",
        emoji: ""
      });

      console.log("Untitled Doc created.", responseDocument);

      const responseDocumentOutput = await databases.createDocument(db, documentOutputCollection, responseDocument.$id, {
        documentId: responseDocument.$id,
        output: ""
      });

      console.log("Untitled Doc Output created.", responseDocumentOutput);
      
      getDocuments(workspaceId);
    } catch (error: any) {
      console.log("Error in creating document: ", error);
    } finally {
      router.refresh();
    }
  };

  useEffect(() => {
    getDocuments(workspaceId);
    getWorkspaceName(workspaceId);
  }, [workspaceId, getDocuments, getWorkspaceName]);

  return (
    <div>
      <NavBar />
      <div className='relative my-10 p-10 md:px-24 lg:px-36 xl:px-52'>
        <h1 className='text-3xl font-bold mb-4'>{workspaceName}</h1>
        {isFetching ? (
          <div className='flex justify-center items-center'>
            <p>Loading documents...</p>
          </div>
        ) : (
          <>
            {documentsResponse?.documents?.length === 0 ? (
              <div className='flex flex-col justify-center items-center my-10'>
                <p>No documents found.</p>
              </div>
            ) : (
              <WorkspaceDocumentList documents={documentsResponse!} workspaceId={params.id} />
            )}
          </>
        )}
        <Button 
          onClick={handleCreateDocument} 
          className='absolute bottom-16 right-10 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600'
        >
          <FaPlus size={24} />
        </Button>
      </div>
      <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[85%]'>
        <Progress value={(documentList.length / MAX_SIZE) * 100} className='bg-slate-400' />
        <h2 className='text-sm font-light my-2 text-center'>
          <strong>{documentList.length}</strong> out of <strong>{MAX_SIZE}</strong> used.
        </h2>
        <h2 className='text-sm font-light my-2 text-center'>Upgrade your plan for more access.</h2>
      </div>
    </div>
  );
};

export default Page;
