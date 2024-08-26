import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { File } from 'lucide-react';
import DocumentsOptions from './DocumentsOptions';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useDocumentStore } from '@/store/documentsStore';

interface DocumentListProps {
  params: {
    id: string;
    docId: string;
  };
}

function DocumentList({ params }: DocumentListProps) {
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const router = useRouter();

  const { documentList, deleteDocument, renameDocument, duplicateDocument, getDocuments } = useDocumentStore();

  useEffect(() => {
    getDocuments(params.id);
  }, [params.id, getDocuments]);

  useEffect(() => {
    getDocuments(params.id);
  }, [params.id, getDocuments]);

  const handleDoubleClick = (docId: string, currentTitle: string) => {
    setEditingDocId(docId);
    setNewTitle(currentTitle);
  };

  const handleRenameBlur = () => {
    if (editingDocId) {
      renameDocument(editingDocId, newTitle);
      setEditingDocId(null);
    }
  };

  const handleDelete = async(docId : string) => {
    await deleteDocument(docId);
    // console.log(id);
    // router.replace(`/workspace/${params.id}/${id}`)
  }


  const shareDocument = async (docId: string) => {
    try {
      const shareLink = `https://yourapp.com/workspace/${params.id}/${docId}`;
      navigator.clipboard.writeText(shareLink);
      toast('Document link copied to clipboard.');
    } catch (error: any) {
      console.log('Error:', error);
      toast('Error in sharing the document.');
    }
  };

  return (
    <div>
      {documentList.map((doc) => (
        <div
          key={doc.$id}
          className={`mt-3 px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer flex justify-between items-center ${
            doc.$id === params?.docId ? 'bg-white py-2' : ''
          }`}
          onClick={() => router.push(`/workspace/${params.id}/${doc.$id}`)}
          onDoubleClick={() => handleDoubleClick(doc.$id, doc.title)}
        >
          <div className='flex gap-2 items-center flex-1'>
            {!doc?.emoji && <File />}
            {editingDocId === doc.$id ? (
              <Input
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={handleRenameBlur}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenameBlur();
                  }
                }}
                className='border rounded px-2 py-1 flex-1'
                autoFocus
              />
            ) : (
              <h2 className='flex gap-2 flex-1'>
                {doc?.emoji} {doc.title}
              </h2>
            )}
          </div>
          <DocumentsOptions 
            doc={doc} 
            deleteDocument={handleDelete} 
            renameDocument={handleDoubleClick} 
            shareDocument={shareDocument} 
            duplicateDocument={() => duplicateDocument(doc, 3)}
          />
        </div>
      ))}
    </div>
  );
}

export default DocumentList;