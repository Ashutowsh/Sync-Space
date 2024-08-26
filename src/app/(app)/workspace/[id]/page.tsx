'use client'
import React from 'react'
import SideBar from '@/components/SidebarComponents/SideBar';

const Page = ({ params }: { params: { id: string, docId : string } }) => {
  const workspaceId = params.id!;
  return (
    <div>
      <div>
        <SideBar  params={params}/>
      </div>

      <div className='md:ml-72'>
        {`${workspaceId}`}
      </div>
    </div>
  )
}

export default Page
