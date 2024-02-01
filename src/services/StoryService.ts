import { ICreateStoryRequest, INewStory, IStory } from "@/types"
import apiClient from "../api/axios"
import authHeader from "./authHeader"

const createStory = async (story : INewStory ) => {
    const body : ICreateStoryRequest = {
        userId: story.userId,
        promptId: story.promptId,
        date: story.date,
        quote: story.quote,
        writing: story.writing,
        share: story.share
    }
    const response = await apiClient.post<INewStory>("/story", body, { headers: authHeader() })
    return response.data
}

const getStoryById = async (storyId:string | unknown) => {
    const response = await apiClient.get<INewStory>("/story/"+storyId, { headers: authHeader() })
    return response.data
}

const getTodayStory = async (date: string) => {
    const response = await apiClient.get<IStory[]>(
      "/story/date/" + date,
      { headers: authHeader() }
    );
    return response.data
  };

const StoryService = {
    createStory,
    getStoryById,
    getTodayStory
}

export default StoryService