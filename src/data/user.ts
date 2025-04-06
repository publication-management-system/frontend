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