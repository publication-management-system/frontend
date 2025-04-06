import {jwtDecode, JwtPayload} from "jwt-decode";

interface AccessTokenData {
    accessToken: string,
    userId: string,
    institutionId: string,
}

type AuthTokenPayload = JwtPayload & { institutionId: string } | undefined;

export const getUserInfo = (): AccessTokenData => {

    const getPayload = (): AuthTokenPayload => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return undefined;
        }

        return jwtDecode<AuthTokenPayload>(accessToken);
    }

    return {
        accessToken: localStorage.getItem("access_token") ?? '',
        userId: getPayload()?.sub ?? '',
        institutionId: getPayload()?.institutionId ?? '',
    }
}