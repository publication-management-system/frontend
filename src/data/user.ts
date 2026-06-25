export interface User {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    userType: string;
    imageUrl: string;
}

export interface UserData {
    user?: User;
    loadingUser: boolean;
}

export interface UserName {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export interface UpdatePassword {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface Invitation {
    id: string;
    link: string;
    email: string;
    createdAt: string;
    acceptedAt?: string;
}

export interface InvitationData {
    invitation?: Invitation;
    loadingInvitation: boolean;
}

export interface RegisterData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    institutionAddress: string;
    institutionName: string;
    institutionPhoneNumber: string;
    institutionEmailAddress: string;
    confirmPassword: string;
}

export interface RegisterResponse {
    userId: string;
    institutionId: string;
}

export interface AcceptInvitationDto {
    emailAddress: string;
    invitationId: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}
