const env = {
    appwrite : {
        endpoint : String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apiKey : String(process.env.APPWRITE_API_KEY),
        userCollectionId : String(process.env.APPWRITE_USER_COLLECTION_ID)
    }
}

export default env