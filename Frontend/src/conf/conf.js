const conf={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
    appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_COLLECTION_ID),
    editorApiKey: String(import.meta.env.VITE_EDITOR_API_KEY),
    geminiApiKey: String(import.meta.env.VITE_GEMINI_API_KEY),
}
export default conf;