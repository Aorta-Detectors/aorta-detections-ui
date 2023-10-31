import type { TUser, TUserLoginRequest } from '@/services/security/types';
export type TUserState = {
    user: TUser;
    status: {
        loggedIn: boolean;
    };
};
export declare const useUserStore: import("pinia").StoreDefinition<"userStore", TUserState, {
    loggedInStatus(state: TUserState): boolean;
    userInfo(state: TUserState): TUser;
}, {
    login(payload: TUserLoginRequest): Promise<void>;
    getMe(): Promise<void>;
    logout(): Promise<void>;
}>;
