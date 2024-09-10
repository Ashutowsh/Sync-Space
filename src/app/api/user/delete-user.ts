import env from '@/env'
import { db, documentCollection, documentOutputCollection, workspaceCollection } from '@/models/name'
import { databases } from '@/models/server/config'
import { useUser } from '@clerk/nextjs'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { Query } from 'node-appwrite'

export async function DELETE() {
  const { userId } = auth()
  const {user} = useUser();
  try {

    const userWorkspaces = await databases.listDocuments(db, workspaceCollection, [
      Query.equal("organizationId", user?.primaryEmailAddress?.emailAddress!)
    ])

    userWorkspaces.documents.forEach(async workspace => {
      
      const userDocs = await databases.listDocuments(db, documentCollection, [
        Query.equal("workSpaceId", workspace.$id)
      ])

      userDocs.documents.forEach(async doc => {
        await databases.deleteDocument(db, documentCollection, doc.$id),
        await databases.deleteDocument(db, documentOutputCollection, doc.$id)
      })

      await databases.deleteDocument(db, workspaceCollection, workspace.$id)
    });

    await databases.deleteDocument(db, env.appwrite.userCollectionId, user?.username!);
    await clerkClient.users.deleteUser(userId!)

    return NextResponse.json({ message: 'User deleted', success : true })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error deleting user', success : false })
  }
}