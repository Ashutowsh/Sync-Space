import env from "@/env"

export const db = "syncspace"
export const workspaceCollection = "workspace"
export const documentCollection = "document"
export const documentOutputCollection = "document_output"
export const commentCollection = "comment"
export const notificationCollection = "notification"
export const documentAttachmentBucket = "document-attachment"
export const workspaceAttachmentBucket = "workspace-attachment"
export const usersCollection = env.appwrite.userCollectionId