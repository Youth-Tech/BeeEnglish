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
  attachments: string
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
  attachments: {
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
