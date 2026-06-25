import { client } from "../../../data/client";
import type { AcceptInvitationDto, RegisterData, RegisterResponse, User } from "../../../data/user";

export const registerUser = async (request: RegisterData): Promise<RegisterResponse> => {
    const response = await client.post<RegisterResponse>("/session/register", { ...request });
    return response.data;
};

export const registerUserViaInvitation = async (request: AcceptInvitationDto): Promise<User> => {
    return await client
        .post<User>("/api/public/invitations/accept-invitation", { ...request })
        .then((response) => response.data);
};
