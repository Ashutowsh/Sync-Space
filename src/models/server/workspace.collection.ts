import { IndexType, Permission } from "node-appwrite"

import {db, workspaceCollection} from "../name"
import {databases} from "./config"

export default async function createWorkspaceCollection() {
    
    await databases.createCollection(db, workspaceCollection, workspaceCollection, [
        Permission.read("any"),
        Permission.read("any"),
        Permission.create("any"),
        Permission.update("any"),
        Permission.delete("any")
    ])
    console.log("Workspace Collection created.")

    await Promise.all([
        databases.createStringAttribute(db, workspaceCollection, "title", 100, true),
        databases.createEmailAttribute(db, workspaceCollection, "createdBy", true),
        databases.createStringAttribute(db, workspaceCollection, "attachmentId", 100, false),
        databases.createStringAttribute(db, workspaceCollection, "organizationId", 50, false),
        databases.createStringAttribute(db, workspaceCollection, "emoji", 100, false),
        databases.createStringAttribute(db, workspaceCollection, "coverImage", 1000000, false)
    ])

    console.log("Workspaces attributes created.")

    await Promise.all([
        databases.createIndex(
            db, 
            workspaceCollection,
            "title",
            IndexType.Fulltext,
            ["title"],
            ["asc"]
        ),
        databases.createIndex(
            db, 
            workspaceCollection,
            "createdBy",
            IndexType.Fulltext,
            ["createdBy"],
            ["asc"]
        ),
        databases.createIndex(
            db, 
            workspaceCollection,
            "organizationId",
            IndexType.Fulltext,
            ["organizationId"],
            ["asc"]
        )
    ])
    console.log("Workspace index done.")
}