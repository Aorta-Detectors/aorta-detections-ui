import commonApi from '@/http/commonApi'
import type {
  TUser,
  TUserLoginRequest,
  TUserLoginResponse, TUserRegisterForm,
} from '@/services/security/types'
import api from '@/http'

const authBasePath = '/auth'

export default class SecurityRequests {
  static async login(payloadParams: TUserLoginRequest) {
    return commonApi().post<TUserLoginResponse>(`${authBasePath}/login`, payloadParams)
  }

  static async registration(payloadParams: TUserRegisterForm) {
    return commonApi().post<TUser>(`${authBasePath}/register`, payloadParams)
  }

  static async logout() {
    return api().get<{ status: string }>(`${authBasePath}/logout`)
  }

  static async refreshToken() {
    return commonApi().get<TUserLoginResponse>(`${authBasePath}/refresh`)
  }

  static async getMe() {
    return api().get<TUser>(`/info/me`)
  }
}
