import { INewStory } from "@/types"
import apiClient from "../api/axios"
import authHeader from "./authHeader"

const createStory = async (story : INewStory) => {
    const response = await apiClient.post<INewStory>("/Story", story, { headers: authHeader() })
    return response.data
}

const getStoryById = async (storyId:string | unknown, userId: string) => {
    const response = await apiClient.get<INewStory>("/Story/"+storyId, { headers: authHeader() })
    return response.data
}

const StoryService = {
    createStory,
    getStoryById
}

export default StoryService