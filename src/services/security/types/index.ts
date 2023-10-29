export type UserStore = {
  user: TUser,

}

export type TUserRegistrationRequest = {
  name: string
  password: string
  username: string
}

export type TUserRegisterForm = Omit<TUser, 'user_id'>

export type TUser = {
  user_id: number
  first_name: string
  second_name: string
  email: string
  role: string
  password?: string
}

export type TUserLoginRequest = {
  email: string
  password: string
}

export type TUserLoginResponse = {
  access_token: string
  refresh_token: string
  status: string
}


