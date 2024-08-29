'use client'
import React from 'react'
import SideBar from '@/components/SidebarComponents/SideBar';
import DocumentPage from "@/components/DocumentComponent/DocumentPage";
import { Room } from '@/app/(app)/Room';

const Page = ({ params }: { params: { id: string, docId : string } }) => {
  return (
    <Room params = {params}>
      <div>
        <div>
          <SideBar  params={params}/>
        </div>

        <div className='md:ml-72'>
          <DocumentPage params={params}/>
        </div>
      </div>
    </Room>
  )
}

export default Page
