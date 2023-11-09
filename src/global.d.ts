interface Topic {
  id: string
  name: string
  description: string
  attachment: Attachment
}

interface Level {
  id: string
  name: string
  description: string
  attachment: Attachment
  score: number
}
interface PostResponse {
  id: string
  title: string
  english: string[]
  vietnamese: string[]
  type: string
  topic: Topic
  level: Level
  note: string
  creator?: User
  attachment: Attachment[]
  flag?: boolean
  createdAt: string
  updateAt: string
}

interface User {
  id: string
  username: string
  fullName: string
  email: string
  avatar: string
  role: number
  score: number
  streak: number
  badges: []
  postBookmarks: []
  courseCompleted: []
  level: string
  wordBookmarks: []
  provider: string
}

interface Badges {
  id: string
  name: string
  desc: string
  attachment: {
    id: string
    type: string
    src: string
  }
}

interface Attachment {
  id?: any
  src?: string
  type?: import('@utils/enums').EAttachment
}

// Quiz Enum
type QuizType = 'multipleWord' | 'multipleImage' | 'cloze' | 'matching'
