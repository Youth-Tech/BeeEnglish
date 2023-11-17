interface Topic {
  _id: string
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
  _id: string
  title: string
  english: string[]
  vietnamese: string[]
  type: string
  topic: Topic
  level: Level
  note: string
  creator?: User
  attachments: Attachment[]
  flag?: boolean
  createdAt: string
  updateAt: string
  liked: boolean
  usersLiked: string[]
  likeCount: number
  commentCount: number
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
  deviceId: string
  deviceName: string
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

interface Comment {
  _id: string
  content: string
  post: string
  creator: {
    _id: string
    avatar: {
      src: string
    }
    id: string
    username: string
  }
  parent: string | null
  createdAt: string
  updatedAt: string
  likeCount: number
  childCount: number
  id: string
}

interface Attachment {
  id?: any
  src?: string
  type?: import('@utils/enums').EAttachment
}

// Quiz Enum
type QuizType = 'multipleWord' | 'multipleImage' | 'cloze' | 'matching'
