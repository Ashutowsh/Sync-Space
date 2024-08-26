import { Link, MoreVerticalIcon, Trash2, FilePen, Copy } from 'lucide-react'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Models } from 'node-appwrite';

interface DocumentOptionsProps {
  doc: Models.Document;
  deleteDocument: (docId: string) => void;
  renameDocument: (docId: string, newName: string) => void;
  shareDocument: (docId: string) => void;
  duplicateDocument: (docId: string) => void;
}

function DocumentsOptions({ doc, deleteDocument, shareDocument, duplicateDocument, renameDocument }: DocumentOptionsProps) {
  const handleDuplicate = () => {
    duplicateDocument(doc.$id);
  };

  const handleShare = () => {
    shareDocument(doc.$id);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVerticalIcon className='h-4 w-4' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className='flex gap-2' onClick={() => renameDocument(doc.$id, doc.title)}>
            <FilePen className='h-4 w-4' />Rename
          </DropdownMenuItem>
          <DropdownMenuItem className='flex gap-2' onClick={handleShare}>
            <Link className='h-4 w-4' />Share
          </DropdownMenuItem>
          <DropdownMenuItem className='flex gap-2' onClick={handleDuplicate}>
            <Copy className='h-4 w-4' />Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem className='flex gap-2 text-red-500' onClick={() => deleteDocument(doc.$id)}>
            <Trash2 className='h-4 w-4' />Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DocumentsOptions;
