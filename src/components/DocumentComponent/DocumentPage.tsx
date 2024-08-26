import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import dynamic from 'next/dynamic';

const DocumentEditor = dynamic(() => import('./DocumentEditor'), {
  ssr: false,
});
function DocumentPage({ params }: { params: { id: string, docId : string } }) {
  return (
    <div>
      <DocumentHeader />

      <DocumentInfo params = {params}/>

      <DocumentEditor params={params}/>
    </div>
  )
}

export default DocumentPage
