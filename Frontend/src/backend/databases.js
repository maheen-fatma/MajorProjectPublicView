import { Client, Databases, Storage, ID } from "appwrite";
import conf from "../conf/conf";
import axios from "axios"
const API_URL = import.meta.env.VITE_BACKEND_URL

export class DatabaseService{
    client = new Client();
    databases;
    storage;

    async newPost (formData){ //to create a new post
        
        try {
            const response = await axios.post(`${API_URL}/posts/upload-post`,
                formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true 
                }
            )
            console.log("new post", response);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Post could not be uploaded";
        }
    }

    async getPost (id){ //to get a post based upon id
        try {
            const response = await axios.get(`${API_URL}/posts/${id}`, {withCredentials:true})
            return response.data.data
        } catch (error) {
            throw error.response?.data || "Could not get the post";
        }
    }

    async deletePost(id){ //to delete a post
        try {
            const response = await axios.delete(`${API_URL}/posts/${id}/delete-post`, {withCredentials:true})
            console.log("delete post    ", response);
            return response.data.data
        } catch (error) {
            throw error.response?.data || "Could not delete the post";
        }
    }

    async editPost (id, {title, content, purchaseLink}){ //to edit a post
        try {
            const response = await axios.patch(`${API_URL}/posts/${id}/edit-post`, {title, content, purchaseLink}, {withCredentials: true })
            return response.data
        } catch (error) {
            throw error.response?.data || "Could not edit the post";
        }
    }
    
    async getAllPost (owner, page =1, limit=15){ //send the owner id as getAllPost(here)
        try {
            const response = await axios.get(`${API_URL}/posts/view-posts`, {
                params: owner ? {owner, page, limit} : { page, limit },
                withCredentials: true
            })
            
            return response.data.data
        } catch (error) {
           throw error.response?.data || "Could not get posts";
        }
    }

    async getMyLikes (){
        try {
            const response = await axios.get(`${API_URL}/users/my-likes`,{ withCredentials:true })
            return response.data.data
        } catch (error) {
            throw error.response?.data || "Could not get my liked posts"
        }
    }

}

const dbService = new DatabaseService()
export default dbService;