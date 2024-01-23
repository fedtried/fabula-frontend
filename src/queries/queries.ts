import PromptService from "@/services/PromptService"
import StoryService from "@/services/StoryService"
import { INewStory, INewUser, IPrompt, IStory, IUpdateUser } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import UserService from "../services/UserService"
import { QUERY_KEYS } from "./queryKeys"

export const useGetAllUsers = () => {
    return useQuery ({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: UserService.findAllUsers
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: UserService.signOutAccount,
      });
}

export const useCreateUseAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => UserService.createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
        }) => UserService.signInAccount(user)
    })
}

export const useCreateStory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (story: INewStory) => StoryService.createStory(story),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_STORIES]
            })
        }
    })
}

export const useGetStoryByDate = (storyId?: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_STORY_BY_ID, storyId],
      queryFn: () => StoryService.getStoryById(storyId),
      enabled: !!storyId,
    });
}

export const useGetUserStories = (userId?: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_STORIES, userId],
        queryFn: () => UserService.getUserStories(userId!),
        enabled: !!userId,
    })
}

export const useGetUserById = (userId: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
      queryFn: () => UserService.getUserById(userId),
      enabled: !!userId,
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user: IUpdateUser) => UserService.updateUser(user),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            });
        },
    });
};


export const useGetPromptByDate = (date: string, userId: string) => {
    return useQuery<IPrompt | { written: boolean }>({
      queryKey: [QUERY_KEYS.GET_PROMPT, date],
      queryFn: () => PromptService.getPrompt(date, userId),
      enabled: !!date
    });
}

export const useDeleteUser = () => {
    return useMutation({
        mutationFn: UserService.deleteUser,
      });
}

export const useGetStoriesByDate = (date: string) => {
    return useQuery<IStory[]>({
      queryKey: [QUERY_KEYS.GET_ALL_STORIES, date],
      queryFn: () => StoryService.getTodayStory(date),
      enabled: !!date
    });
}