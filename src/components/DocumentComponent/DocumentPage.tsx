import React, { useState } from 'react';
import DocumentHeader from './DocumentHeader';
import DocumentInfo from './DocumentInfo';
import dynamic from 'next/dynamic';
import { MessageCircleCodeIcon } from 'lucide-react';
import { Button } from '../ui/button';
import CommentBox from '../CommentsComponents/CommentBox';

const DocumentEditor = dynamic(() => import('./DocumentEditor'), {
  ssr: false,
});

function DocumentPage({ params }: { params: { id: string; docId: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <DocumentHeader />
      <DocumentInfo params={params} />

      <div className="flex flex-1">
        <div className="flex-1">
          <DocumentEditor params={params} />
        </div>
        <div className="fixed right-5 bottom-5">
          <Button onClick={() => setOpen((prev) => !prev)}>
            <MessageCircleCodeIcon />
          </Button>
          {open && <CommentBox />}
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;
