import { Permission } from "node-appwrite";
import { documentOutputCollection, db } from "../name";
import { databases } from "./config";

export default async function createDocumentOutputCollection() {
    // Creating Collection
    await databases.createCollection(db, documentOutputCollection, documentOutputCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createStringAttribute(db, documentOutputCollection, "docId", 50, true),
        databases.createStringAttribute(db, documentOutputCollection, "output", 100000000000, true, "", true),
        databases.createStringAttribute(db, documentOutputCollection, "attachmentId", 100, false),
    ]);
    console.log("Attributes Created");
}