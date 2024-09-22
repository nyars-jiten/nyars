export interface User {
  id: number
  username: string
  banned: boolean
  role: 'User' | 'Admin' | 'Moderator' | 'Admin, Moderator'
  access: number
  avatar: string
  isBot: boolean
  userRating: UserRating | null
  createdDate: Date
}
