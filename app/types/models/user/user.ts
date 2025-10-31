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
