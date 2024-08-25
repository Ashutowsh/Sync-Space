import { File } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { Models } from 'node-appwrite'
import React from 'react'
import DocumentsOptions from './DocumentsOptions'
interface DocumentListProps {
    documentList: Models.Document[];
    params: {
      docId: string;
      id : string
    };
  }

function DocumentList({documentList, params} : DocumentListProps) {

  const router = useRouter();
  return (
    <div>
      {documentList.map((doc) => (
        <div key={doc.title} className={`mt-3 px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer flex justify-between items-center ${doc.$id === params?.docId && 'bg-white py-2'}`} onClick={() => router.push(`/workspace/${params.id}/${doc.$id}`)}>
            <div className='flex gap-2 items-center'>
                {!doc?.emoji && <File />}
                <h2 className='flex gap-2'>{doc?.emoji} {doc.title}</h2>
                
            </div>

            <DocumentsOptions />
        </div>
      ))}
    </div>
  )
}

export default DocumentList
