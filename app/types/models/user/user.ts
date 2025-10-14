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
  createdAt: Date
}

export interface ExtendedUser extends User {
  access: number
  settings: string
}
