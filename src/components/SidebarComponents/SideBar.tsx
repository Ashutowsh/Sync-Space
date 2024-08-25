import React, {useEffect, useState} from 'react'
import SyncSpaceLogo from '../Header/Logo'
import { Bell } from 'lucide-react'
import { Button } from '../ui/button'
import { databases } from '@/models/server/config'
import { db, documentCollection, documentOutputCollection } from '@/models/name'
import { ID, Models, Query } from 'node-appwrite'
import DocumentList from './DocumentList'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"


function SideBar({params} : {params : {id : string, docId : string}}) {

  const [documentList, setDocumentList] = useState<Models.Document[]>([]);
  const {user} = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (params) {
      getDocuments();
    }
  }, [params]);

  const getDocuments = async () => {
    try {
      const documents = await databases.listDocuments(db, documentCollection, [
        Query.orderDesc("$createdAt"),
        Query.equal("workSpaceId", params.id),
      ]);

      setDocumentList(documents.documents);
      console.log("Documents fetched:", documents.documents); 
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    console.log("Document list updated:", documentList);
  }, [documentList]);

  const createDocument = async() => {
    // if(){
    //   setIsLoading(true);
    // }
    try {
      const responseDocument = await databases.createDocument(db, documentCollection, ID.unique(), {
        createdBy : user?.primaryEmailAddress?.emailAddress,
        workSpaceId : params.id,
        title : "Untitled Document",
        emoji : null
      })
  
      console.log("Untitled Doc created.", responseDocument)
  
      const responseDocumentOutput = databases.createDocument(db, documentOutputCollection, responseDocument.$id, {
        documentId : responseDocument.$id,
        output : []
      })
  
      console.log("Untitled Doc Output created.", responseDocumentOutput)

      router.replace(`/workspace/${params.id}/${responseDocument.$id}`)
    } catch (error) {
      console.error("Failed to create document:", error);
    } finally{
      setIsLoading(false);
    }
  }

  return (
    <div className='h-screen fixed md:w-72 hiiden md:block bg-blue-50 p-5 shadow-md'>
      <div className='flex justify-between items-center'>
        <SyncSpaceLogo />
        <Bell className='h-5 w-5 text-gray-500'/>
      </div>
      <hr className='my-5'/>

      <div>
        <div className='flex items-center justify-between'>
          <h2 className='font-medium'>Workspace Name</h2>
          <Button
                disabled={isLoading}
                onClick={createDocument}
              >
                {isLoading ? (
                  <div className="inline-block w-4 h-4 border-2 border-t-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                ) : (
                  "+"
                )}
              </Button>
        </div>
      </div>

      <DocumentList documentList={documentList} params={params}/>
      
      <div className='absolute bottom-10 w-[85%]'>
      <Progress value={(documentList.length/8) * 100} className='bg-white'/>
      <h2 className='text-sm font-light my-2'><strong>{documentList.length}</strong> out of <strong>8</strong> used.</h2>
      <h2 className='text-sm font-light my-2'>Upgrade your plan for more access.</h2>
      </div>
    </div>

  )
}

export default SideBar
