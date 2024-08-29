import { IndexType, Permission } from "node-appwrite";
import { usersCollection, db } from "../name";
import { databases } from "./config";

export default async function createUserCollection() {
    // Creating Collection
    await databases.createCollection(db, usersCollection, usersCollection, [
        Permission.create("any"),
        Permission.read("any"),
        Permission.read("any"),
        Permission.update("any"),
        Permission.delete("any"),
    ]);
    console.log("User Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createStringAttribute(db, usersCollection, "avatar", 100000, false),
        databases.createEmailAttribute(db, usersCollection, "email", true),
        databases.createStringAttribute(db, usersCollection, "name", 100, true),
    ]);
    console.log("User Attributes Created");

    await Promise.all([
        databases.createIndex(
            db, 
            usersCollection,
            "email",
            IndexType.Fulltext,
            ["email"],
            ["asc"]
        ),
    ])

    console.log("User index done.")
}