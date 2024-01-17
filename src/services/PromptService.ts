
import apiClient from "../api/axios"
import authHeader from "./authHeader"

const getPrompt = async (date: string, userId: string) => {
    const response = await apiClient.get<string>("/user/"+userId+"/"+date, { headers: authHeader() })
    if(response.data) {
        return {written : true}
    } else {
        const promptData = await apiClient.get<string>("/prompt/"+date, { headers: authHeader() })
        return promptData.data
    }
}

const UserService = {
    getPrompt,
}

export default UserService