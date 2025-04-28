export interface User {
    id: string,
    firstName: string,
    middleName?: string,
    lastName: string,
    email: string,
    userType: string,
    imageUrl: string
}

export interface UserData {
    user?: User,
    loadingUser: boolean,
}

export interface UserName {
    firstName: string,
    middleName?: string,
    lastName: string,
}

export interface UpdatePassword {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export interface Institution {
    id: string,
    address: string,
    email: string,
    name: string,
    phone_number: string
}

export interface InstitutionData {
    institution?: Institution,
    loadingInstitution: boolean
}

export interface Invitation {
    id: string,
    link: string,
    wasTaken: boolean;
}

export interface InvitationData {
    invitation?: Invitation,
    loadingInvitation: boolean
}
