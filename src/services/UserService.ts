import User, { INewUser } from "@/types"
import apiClient from "../api/axios"
import authHeader from "./authHeader"

const findAllUsers = async () => {
    const response = await apiClient.get<User[]>("/user", { headers: authHeader() })
    return response.data
}

const getCurrentUser = async () => {
    const id = JSON.parse(localStorage.getItem('user')!)
    const response = await apiClient.get<User>("/user/"+id.id, { headers: authHeader() })
    return response
}

const signOutAccount = async () => {
    localStorage.removeItem("user");

    return 
}

const signInAccount = async (user: {email: string, password: string}) => {
    const response = await apiClient.post("/v1/auth/signin", user)
    if(response.data.token){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data
}

const createUserAccount =async (user: INewUser) => {
    const response = await apiClient.post("/v1/auth/signup", user)
    if(response.data.token){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data
}

const getUserById = async (id:string) => {
    const response = await apiClient.get<User>("/user/"+id, { headers: authHeader() })
    return response.data
}

const getUserStories = async (id: string) => {
    const response = await apiClient.get<User>("/user/"+id, { headers: authHeader() })
    return response.data
}

const UserService = {
    findAllUsers,
    getCurrentUser,
    signOutAccount,
    signInAccount,
    createUserAccount,
    getUserById,
    getUserStories
}

export default UserService