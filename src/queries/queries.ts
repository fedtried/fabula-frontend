import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import UserService from "../services/UserService"
import { INewUser, INewStory } from "@/types"
import StoryService from "@/services/StoryService"
import PromptService from "@/services/PromptService"

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

export const useGetStoryByDate = (storyId?: string, userId?: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_STORY_BY_ID, storyId, userId],
      queryFn: () => StoryService.getStoryById(storyId, userId!),
      enabled: !!storyId && !!userId,
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

// export const useUpdateUser = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (user: IUpdateUser) => updateProfile(user),
//         onSuccess: (data) => {
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_CURRENT_USER],
//             });
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_KEYS.GET_USER_BY_ID, data!.id],
//             });
//         },
//     });
// };


export const useGetPromptByDate = (date: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_PROMPT, date],
      queryFn: () => PromptService.getPrompt(date),
      enabled: !!date
    });
}