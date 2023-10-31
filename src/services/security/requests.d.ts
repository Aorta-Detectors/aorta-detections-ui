import type { TUser, TUserLoginRequest, TUserLoginResponse, TUserRegistrationRequest } from '@/services/security/types';
export default class SecurityRequests {
    static login(payloadParams: TUserLoginRequest): Promise<import("axios").AxiosResponse<TUserLoginResponse, any>>;
    static registration(payloadParams: TUserRegistrationRequest): Promise<import("axios").AxiosResponse<TUser, any>>;
    static logout(): Promise<import("axios").AxiosResponse<{
        status: string;
    }, any>>;
    static refreshToken(): Promise<import("axios").AxiosResponse<TUserLoginResponse, any>>;
    static getMe(): Promise<import("axios").AxiosResponse<TUser, any>>;
}
