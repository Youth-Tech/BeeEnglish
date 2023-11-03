interface PostResponse {
  id: number
  title: string
  english: string
  vietnamese: strings
  type: string
  topic: string
  level: string
  note: string
  creator: string
  attachment: string
  flag: boolean
}

interface User {
  id: number
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
  type?: EAttachment
}

// Media Enum
enum EAttachment {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
  Subtitle = 'subtitle',
}

// Quiz Enum
type QuizType = 'multipleWord' | 'multipleImage' | 'cloze' | 'matching'
