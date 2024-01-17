import { INewStory, IStory } from "@/types"
import apiClient from "../api/axios"
import authHeader from "./authHeader"

const createStory = async (story : INewStory ) => {
    const body : IStory = {
        date: story.date,
        quote: story.quote,
        writing: story.writing
    }
    const response = await apiClient.post<INewStory>("/story?userId="+ story.userId + "&promptId="+story.promptId, body, { headers: authHeader() })
    return response.data
}

const getStoryById = async (storyId:string | unknown, userId: string) => {
    const response = await apiClient.get<INewStory>("/story/"+storyId, { headers: authHeader() })
    return response.data
}

const StoryService = {
    createStory,
    getStoryById
}

export default StoryService