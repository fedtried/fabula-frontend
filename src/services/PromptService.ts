
import apiClient from "../api/axios"
import authHeader from "./authHeader"

const getPrompt = async (date: string) => {
    const response = await apiClient.get<string>("/prompt/"+date, { headers: authHeader() })
    return response.data
}

const UserService = {
    getPrompt,
}

export default UserService