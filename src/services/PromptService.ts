
import { IPrompt } from "@/types";
import apiClient from "../api/axios";
import authHeader from "./authHeader";

const getPrompt = async (date: string, userId: string) => {
    const response = await apiClient.get<boolean>(
      "/user/" + userId + "/" + date,
      { headers: authHeader() }
    );
  
    if (response.data) {
      return { written: true };
    } else {
      const promptData = await apiClient.get<IPrompt>(
        "/prompt/" + date,
        { headers: authHeader() }
      );
  
      if ("id" in promptData.data) {
        // TypeScript now knows that promptData.data is of type IPrompt
        return promptData.data;
      } else {
        // If not, return the fallback value
        return { written: true };
      }
    }
  };

const UserService = {
    getPrompt,
}

export default UserService