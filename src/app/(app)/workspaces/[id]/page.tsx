import React from 'react'
import { useRouter } from 'next/router'
import { databases } from '@/models/server/config';
import { db, documentCollection } from '@/models/name';
import { Query } from 'node-appwrite';

const Page = async() => {

  const router = useRouter();
  const workspaceId = router.query.id!;

  const documents = await databases.listDocuments(db, documentCollection, [
    Query.orderDesc("$createdAt"),
    Query.equal("workspaceId", workspaceId)
  ])

  console.log(documents)
  return (
    <div>
      
    </div>
  )
}

export default Page
