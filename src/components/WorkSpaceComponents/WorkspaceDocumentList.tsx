import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Models } from 'node-appwrite';

interface DocumentListProps {
  documents: Models.DocumentList<Models.Document>;
  workspaceId : string
}

export const WorkspaceDocumentList: React.FC<DocumentListProps> = ({ documents, workspaceId }) => {

  const router = useRouter();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
      {documents?.documents?.map((document) => (
        <div
          key={document.$id}
          className='border shadow-lg rounded-lg hover:scale-105 transition-transform cursor-pointer bg-white'
          onClick={() => router.replace(`${workspaceId}/${document.$id}`)}
        >
          <div className='p-4 rounded-t-lg bg-gradient-to-r from-blue-500 to-indigo-500'>
            <h2 className='flex items-center gap-2 text-white text-xl font-semibold'>
              {document?.emoji} {document.title}
            </h2>
          </div>
          {document.attachmentId && (
            <Image
              src={`path-to-your-attachment/${document.attachmentId}`} // Replace with your actual image path
              width={400}
              height={200}
              alt='attachment'
              className='rounded-b-lg'
            />
          )}
          <div className='p-4'>
            <p className='text-gray-600 text-sm'>Created by: {document.createdBy}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
