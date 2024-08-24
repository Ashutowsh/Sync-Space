import { NextRequest, NextResponse } from "next/server";
import {ID, Query} from "node-appwrite";
import {databases} from "@/models/server/config";
import { workspaceCollection, db, documentCollection, documentOutputCollection } from "@/models/name";

// export async function POST(request : NextRequest){
//     try {

//         const {title, createdBy, organizationId, emoji} = await request.json()

//         const response = await databases.createDocument(db, workspaceCollection, ID.unique(), {
//             title : title,
//             createdBy : createdBy,
//             organizationId : organizationId,
//             emoji : emoji
//         })

//         return NextResponse.json(
//             response, {
//                 status : 201
//             }
//         )
        
//     } catch (error:any) {

//         return NextResponse.json(
//             {
//               error: error?.message || "Error creating collection."
//             },
//             {
//               status: error?.status || error?.code || 500
//             }
//         )
//     }
// }

export async function POST(request : NextRequest){
    try {
        const {id} = await request.json()
        const workspacesResponse = await databases.listDocuments(db, workspaceCollection, [
            Query.orderDesc("$createdAt"),
            Query.equal("organizationId", id)
          ])

        return NextResponse.json(
            workspacesResponse, {
                status : 201
            }
        )
        
    } catch (error:any) {

        return NextResponse.json(
            {
              error: error?.message || "Error getting collection."
            },
            {
              status: error?.status || error?.code || 500
            }
        )
    }
}

export async function DELETE(request : NextRequest){
    try {
        
        const {workspaceId} = await request.json();
        
        const documents = await databases.listDocuments(db, documentCollection, [
            Query.orderDesc("$createdAt"),
            Query.equal("workspaceId", workspaceId)
        ])
        
        for (const document of documents.documents) {
            await databases.deleteDocument(db, documentOutputCollection, document.$id);
            await databases.deleteDocument(db, documentCollection, document.$id);
        }

        const result = await databases.deleteDocument(db, workspaceCollection, workspaceId);

        return NextResponse.json(
            result, {
                status : 201
            }
        );
        
    } catch (error : any) {
        return NextResponse.json(
            {
              message: error?.message || "Error deleting the workspace."
            },
            {
              status: error?.status || error?.code || 500
            }
        )
    }
}