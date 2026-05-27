import { client } from "../../../data/client";
import type { RegisterData, RegisterResponse } from "../../../data/user";

export const registerUser = async (request: RegisterData): Promise<RegisterResponse> => {
    const response = await client.post<RegisterResponse>("/session/register", { ...request });
    return response.data;
};
