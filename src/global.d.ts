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

interface Script {
  start: string
  end: string
  content: string
}
interface Attachment {
  id?: any
  thumbnail?: string
  script?: Script[]
  src?: string
  duration?: number
  type?: import('@utils/enums').EAttachment
}

interface Pagination {
  total: number,
  page: number,
  hasPrev: boolean,
  hasNext: boolean
}

// Quiz Enum
type QuizType = 'multipleWord' | 'multipleImage' | 'cloze' | 'matching'
