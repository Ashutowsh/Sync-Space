import { Permission } from "node-appwrite";
import { workspaceAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateWorkSpaceStorage() {
    try {
        await storage.getBucket(workspaceAttachmentBucket);
        console.log("Storage Connected");
    } catch (error) {
        try {
            await storage.createBucket(
                workspaceAttachmentBucket,
                workspaceAttachmentBucket,
                [
                    Permission.create("users"),
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                false,
                undefined,
                undefined,
                ["jpg", "png", "gif", "jpeg", "webp", "heic", "emoji"]
            );

            console.log("Storage Created");
            console.log("Storage Connected");
        } catch (error) {
            console.error("Error creating storage:", error);
        }
    }
}