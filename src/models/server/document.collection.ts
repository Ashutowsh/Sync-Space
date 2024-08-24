import { IndexType, Permission } from "node-appwrite";
import { documentCollection, db } from "../name";
import { databases } from "./config";

export default async function createDocumentCollection() {
    // Creating Collection
    await databases.createCollection(db, documentCollection, documentCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Document Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createStringAttribute(db, documentCollection, "title", 100, true),
        databases.createStringAttribute(db, documentCollection, "workSpaceId", 50, true),
        databases.createEmailAttribute(db, documentCollection, "createdBy", true),
        databases.createStringAttribute(db, documentCollection, "emoji", 1000, false),
        databases.createStringAttribute(db, documentCollection, "attachmentId", 100, false),
    ]);
    console.log("Document Attributes Created");

    await Promise.all([
        databases.createIndex(
            db, 
            documentCollection,
            "title",
            IndexType.Fulltext,
            ["title"],
            ["asc"]
        ),
        databases.createIndex(
            db, 
            documentCollection,
            "createdBy",
            IndexType.Fulltext,
            ["createdBy"],
            ["asc"]
        ),
        databases.createIndex(
            db, 
            documentCollection,
            "workSpaceId",
            IndexType.Fulltext,
            ["workSpaceId"],
            ["asc"]
        )
    ])

    console.log("Doc index done.")
}