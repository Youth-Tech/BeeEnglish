interface PostResponse {
  id: number
  title: string
  english: string
  vietnamese: string
  type: string
  topic: string
  level: string
  note: string
  creator: string
  attachment: string
  flag: boolean
}

interface User {
  id: number,
  username: string,
  fullName: string,
  email: string,
  avatar: string,
  role: number,
  score: number,
  streak: number
  badges: [],
  postBookmarks: [],
  courseCompleted: [],
  level: string,
  wordBookmarks: [],
  provider: string,
}
