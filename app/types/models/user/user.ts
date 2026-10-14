export interface ShortUser {
  id: string
  username: string
  isBot: boolean
  avatar: string
}

export interface User extends ShortUser {
  login: string
  banned: boolean
  isAdmin: boolean
  stats: StatsUser
  lastOnline: Date
  createdAt: Date
}

export interface ExtendedUser extends User {
  access: number
  settings: string
}

export interface UserAccessResponse {
  userId: string
  username: string
  access: number
  isAdmin: boolean
}

// Ответы авторизации (схема: dto.RefreshResponse, dto.SessionResponse)
export interface RefreshResponse {
  access_expires_at: string
  user: ExtendedUser
}

export interface UserSession {
  id: string
  user_agent: string
  ip: string
  created_at: string
  last_used_at: string
  expires_at: string
  current: boolean
}
