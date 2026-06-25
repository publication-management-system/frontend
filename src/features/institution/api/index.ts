import { authenticatedClient } from "../../../data/client";
import type { Institution } from "../../../data/institution";
import type { Invitation, User } from "../../../data/user";

export const getInstitutionData = async (institutionId: string): Promise<Institution> => {
    return await authenticatedClient
        .get<Institution>(`/api/institutions/${institutionId}`)
        .then((response) => response.data);
};

export const getInstitutionUsers = async (institutionId: string): Promise<User[]> => {
    return await authenticatedClient
        .get<User[]>(`/api/users/institution/${institutionId}`)
        .then((response) => response.data);
};

export const getInvitations = async (): Promise<Invitation[]> => {
    return await authenticatedClient.get<Invitation[]>(`/api/invitations`).then((response) => response.data);
};

export const sendInvitation = async (institutionId: string, email: string): Promise<Invitation> => {
    return await authenticatedClient
        .post<Invitation>("/api/invitations", { institutionId, email })
        .then((response) => response.data);
};

export const getInvitationById = async (invitationId: string): Promise<Invitation> => {
    return await authenticatedClient
        .get<Invitation>(`/api/public/invitations/${invitationId}`)
        .then((response) => response.data);
};
