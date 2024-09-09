const env = {
    appwrite : {
        endpoint : String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apiKey : String(process.env.APPWRITE_API_KEY),
        userCollectionId : String(process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID)
    },

    liveBlocks : {
        liveblocksApiKey : String(process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY),
        commentSecret : String(process.env.NEXT_PUBLIC_LIVEBLOCK_COMMENT_ACCESS_TOKEN_SECRET)
    },

    ai : {
        apiKey : String(process.env.NEXT_PUBLIC_GEMINI_API_KEY)
    },

    limit : {
        docs : Number(process.env.NEXT_PUBLIC_MAX_FILE)
    }
}

export default env