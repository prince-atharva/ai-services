import { api } from '../axios'
import { UserInput } from '../validations'

interface AuthResponse {
  message: string
}

interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

interface ProfileResponse {
  data: {
    id: number
    name: string
    email: string
  }
}

export const Auth = {
  register: async (data: UserInput): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/register', data)
  },

  login: async (email: string, password: string): Promise<LoginResponse> => {
    return api.post<LoginResponse>('/login', { email, password })
  },

  logout: async (): Promise<void> => {
    return api.post('/logout')
  },

  getProfile: async (): Promise<ProfileResponse> => {
    return api.get<ProfileResponse>('/profile')
  },
}