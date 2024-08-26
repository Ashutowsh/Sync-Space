'use client'
import React from 'react'
import SideBar from '@/components/SidebarComponents/SideBar';
import DocumentPage from "@/components/DocumentComponent/DocumentPage";

const Page = ({ params }: { params: { id: string, docId : string } }) => {
  const docId = params.docId!;
  return (
    <div>
      <div>
        <SideBar  params={params}/>
      </div>

      <div className='md:ml-72'>
        <DocumentPage params={params}/>
      </div>
    </div>
  )
}

export default Page
