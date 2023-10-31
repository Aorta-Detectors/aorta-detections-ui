import { defineStore } from 'pinia';
import { handleError } from '@/utils/handleError';
import SecurityRequests from '@/services/security/requests';
import router from '@/router';
const userTokens = JSON.parse(localStorage.getItem('ad-token'));
const initialUserLoginState = userTokens !== null
    ? {
        status: { loggedIn: true }
    }
    : {
        status: { loggedIn: false }
    };
export const useUserStore = defineStore('userStore', {
    state: () => ({
        ...initialUserLoginState,
        user: {}
    }),
    getters: {
        loggedInStatus(state) {
            return state.status.loggedIn;
        },
        userInfo(state) {
            return state.user;
        }
    },
    actions: {
        async login(payload) {
            try {
                const t = await SecurityRequests.login(payload);
                const { data, status } = t;
                if (status === 200) {
                    localStorage.setItem('ad-token', JSON.stringify({
                        access_token: data.access_token,
                        refresh_token: data.refresh_token
                    }));
                }
                this.status.loggedIn = true;
                await router.push({ name: 'Dashboard' });
            }
            catch (e) {
                this.status.loggedIn = false;
                const errorMessage = handleError(e);
                console.error(errorMessage);
                throw e;
            }
        },
        async getMe() {
            try {
                const { data, status } = await SecurityRequests.getMe();
                if (status === 200 && data !== undefined) {
                    this.user = data;
                }
            }
            catch (e) {
                const errorMessage = handleError(e);
                console.error(errorMessage);
                throw e;
            }
        },
        async logout() {
            try {
                await SecurityRequests.logout();
                localStorage.removeItem('ad-token');
                this.user = {};
                await router.push({ name: 'LoginPage' });
            }
            catch (e) {
                const errorMessage = handleError(e);
                console.error(errorMessage);
                throw e;
            }
            finally {
                this.status.loggedIn = false;
            }
        }
    }
});
