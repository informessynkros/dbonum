
export interface User {
  id_user: string
  checkpoint: string
  name: string
  phone: string
  active: boolean
  date_created: string
  last_login?: string
}

export interface Tokens {
  idToken: string
  accessToken: string
  refreshToken: string
}

export interface AuthState {
  user: User | null
  tokens: Tokens | null
  isAuthenticated: boolean
}

export interface AuthActions {
  setAuth: (user: User, tokens: Tokens) => void
  clearAuth: () => void
}

export type AuthStore = AuthState & AuthActions
