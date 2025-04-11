import conf from "../conf/conf";
import axios from "axios"
const API_URL = import.meta.env.VITE_BACKEND_URL

export class AuthService {
    
    async createAccount(formData){
        try {
            const response = await axios.post(
                `${API_URL}/users/register`, 
                formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || "Registration failed";
        }
    }

    async  getLoggedInUser() {
        
        try {
          const response = await axios.get(`${API_URL}/users/current-user`, { withCredentials: true });
          return response.data
        } catch (error) { 
            throw error.response?.data || "Failed to get the current user";
        }
      }

    async login ({email, username, password}){
         try {
            const response = await axios.post(`${API_URL}/users/login`, 
                {email, username, password},
                {withCredentials:true}
            )
            return response.data.data
         } catch (error) {
            throw error.response?.data || "Failed to login"
         }
      }
 
    async logout (){
        try {
            const token = localStorage.getItem("token");

        // Only send the Authorization header if a valid token exists
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.post(`${API_URL}/users/logout`, {}, {
            withCredentials: true,
            headers
        });
    
            localStorage.removeItem("token"); 
            localStorage.removeItem("user");
            return response.data
        } catch (error) {
            throw error.response?.data || "Failed to logout"
        }
    }
}

const authService = new AuthService(); //so that we can simply use each services as authService.login(...) etc.

export default authService;