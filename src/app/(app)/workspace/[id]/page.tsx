'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '@/components/Header/NavBar';
import { db, documentCollection } from '@/models/name';
import { databases } from '@/models/server/config';
import { Models, Query } from 'node-appwrite';
import { WorkspaceDocumentList } from '@/components/WorkSpaceComponents/WorkspaceDocumentList';

const Page = ({ params }: { params: { id: string, docId: string } }) => {
  const workspaceId = params.id!;
  const [documentsResponse, setDocumentsResponse] = useState<Models.DocumentList<Models.Document> | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const getDocuments = async (id: string) => {
    try {
      setIsFetching(true);
      const response = await databases.listDocuments(db, documentCollection, [
        Query.equal("workSpaceId", id),
        Query.orderDesc("$createdAt")
      ]);
      setDocumentsResponse(response);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getDocuments(workspaceId);
  }, [workspaceId]);

  return (
    <div>
      <NavBar />
      <div className='my-10 p-10 md:px-24 lg:px-36 xl:px-52'>
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
              <WorkspaceDocumentList documents={documentsResponse!} workspaceId={params.id}/>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
