import { client } from "../../../data/client";

interface LoginResponse {
    accessToken: string;
}

export const login = async (email: string, password: string) => {
    const resp = await client.post<LoginResponse>("/session/login", { email, password });

    return resp.data;
};
