import { client } from "../../../data/client";

export const getGephiGraph = async (): Promise<string> => {
    const response = await client.get<string>(`/api/public/visualize`);

    return response.data;
};
