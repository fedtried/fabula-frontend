import apiClient from "@/api/axios";
import { IMode } from "@/types";
import authHeader from "./authHeader";

const findModes = async () => {
    try {
        const i = Math.floor(Math.random() * 3);
        const response = await apiClient.get<IMode[]>("/mode", { headers: authHeader() });

        if (!response || !response.data || response.data.length === 0) {
            throw new Error('Invalid API response');
        }

        return response.data[i] as IMode;
    } catch (error) {
        return { mode_id: '0', mode_name: 'standard' } as unknown as IMode;
    }
}

const ModeService = {
    findModes
}

export default ModeService