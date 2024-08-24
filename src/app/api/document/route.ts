import { NextRequest, NextResponse } from "next/server";
import {ID} from "node-appwrite";
import {databases} from "@/models/server/config";
import { documentCollection, db, documentOutputCollection } from "@/models/name";

export async function POST(request : NextRequest){
    try {

        const {title, createdBy, workSpaceId, emoji} = await request.json()

        const responseDocument = await databases.createDocument(db, documentCollection, ID.unique(), {
            title : title,
            createdBy : createdBy,
            workSpaceId : workSpaceId,
            emoji : emoji
        })

        const responseDocumentOutput = databases.createDocument(db, documentOutputCollection, responseDocument.$id, {
            documentId : responseDocument.$id,
            output : []
        })

        return NextResponse.json(
            {
                responseDocument : responseDocument,
                responseDocumentOutput : responseDocumentOutput
            }, {
                status : 201
            }
        )
        
    } catch (error:any) {

        return NextResponse.json(
            {
              error: error?.message || "Error creating document for the collection."
            },
            {
              status: error?.status || error?.code || 500
            }
        )
    }
}

export async function DELETE(request : NextRequest){
    try {

        const {documentId, docOutputId} = await request.json();
        const responseDocument = await databases.deleteDocument(db, documentCollection, documentId)
        
        const responseDocumentOutput = await databases.deleteDocument(db, documentOutputCollection, docOutputId)

        return NextResponse.json({
            responseDocument : responseDocument,
            responseDocumentOutput : responseDocumentOutput
        }, {status : 201})

    } catch (error : any) {
        return NextResponse.json(
            {
              message: error?.message || "Error deleting the document."
            },
            {
              status: error?.status || error?.code || 500
            }
        )
    }
}