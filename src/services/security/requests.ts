import commonApi from '@/http/commonApi'
import api from '@/http'

const authBasePath = '/auth';
export default class SecurityRequests {
    static async login(payloadParams) {
        return commonApi().post(`${authBasePath}/login`, payloadParams);
    }
    static async registration(payloadParams) {
        return commonApi().post(`${authBasePath}/register`, payloadParams);
    }
    static async logout() {
        return api.get(`${authBasePath}/logout`);
    }
    static async refreshToken() {
        return commonApi().get(`${authBasePath}/refresh`);
    }
    static async getMe() {
        return api.get(`/info/me`);
    }
}
