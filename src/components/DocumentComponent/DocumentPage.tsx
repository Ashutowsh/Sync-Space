import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
function DocumentPage({ params }: { params: { id: string, docId : string } }) {
  return (
    <div>
      <DocumentHeader />

      <DocumentInfo params = {params}/>
    </div>
  )
}

export default DocumentPage
