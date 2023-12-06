import ApiUtil from '@utils/AxiosInstance'
import { DefaultResponse, UserData } from '@services'

const KnowledgeEndPoint = {
  getAllWord: '/knowledge/word/get-all',
  getPreTest: '/knowledge/quiz/pretest/generate',
  sendResultPreTest: '/knowledge/quiz/pretest/send-result',
  getAllCourse: '/knowledge/course/get-all',

  getChapterAndLesson: (courseId: string) => `/knowledge/chapter/${courseId}/get-chapters-and-lessons`,
  getQuizByLessonId: (lessonId: string) =>
    `/knowledge/quiz/${lessonId}/get-quizzes-by-lesson`,
  getWordByLessonId: (lessonId: string) =>
    `/knowledge/word/${lessonId}/get-words-by-lesson`,
  getWordById: (wordId: string) => `/knowledge/word/${wordId}`,
} as const

export interface Lesson {
  _id: string
  name: string
  order: number
  chapter: string
  description: string
  attachment: Attachment | null
  status: boolean
  completed: boolean
}

export interface Chapter {
  _id: string
  name: string
  order: number
  course: string
  lessons: Lesson[]
  status: boolean
  attachment: Attachment | null
  checkpoint?: {
    questions: Quiz[]
    createAt: string
    score: number
  }
}

export interface GetChapterAndLessonRes extends DefaultResponse {
  data: {
    chapters: Chapter[]
  }
}

export interface Quiz {
  _id: any
  answer: any[]
  type: QuizType
  flag?: boolean
  question: string
  correctAnswer?: string
  attachments?: Attachment[]
}

export enum EWord {
  Noun = 'noun',
  Verb = 'verb',
  Adjective = 'adjective',
  Adverb = 'adverb',
  Pronoun = 'pronoun',
  Preposition = 'preposition',
  Conjunction = 'conjunction',
  Interjection = 'interjection',
}

export interface Senses {
  _id: string
  type: EWord
  vietnamese: string
  exampleEnglish: string
  exampleVietnamese: string
  synonyms: Array<string>
  antonyms: Array<string>
}

export interface Word {
  _id: string
  english: string
  pronunciation: string
  attachments: Attachment[]
  senses: Array<Senses>
}

export interface Course {
  _id: string
  name: string
  description: string
  level: Level
  attachment: Attachment
  chapters: number
  status: boolean
  progress: number | null
  completed: number
}

export interface GetQuizByLessonIdRes extends DefaultResponse {
  data: {
    quizzes: Quiz[]
  }
}

export interface GetWordByLessonIdRes extends DefaultResponse {
  data: {
    words: Word[]
  }
}

export interface GetAllWordReq {
  page: number
  limit: number
  search: string
}

export interface GetAllWordResponse extends DefaultResponse {
  data: {
    words: Word[]
  }
}

export interface GetWordByIdResponse extends DefaultResponse {
  data: Word
}

export interface GetPreTestResponse extends DefaultResponse {
  data: Array<Quiz>
}

export interface SendPreTestResultRequest {
  score: number
}

export interface SendPreTestResultResponse extends DefaultResponse {
  data: UserData
}

export interface GetAllCourseResponse extends DefaultResponse {
  data: {
    courses: Array<Course>
  }
}

export const KnowledgeService = {
  getChapterAndLesson: (courseId: string) => {
    return ApiUtil.get<GetChapterAndLessonRes>(
      KnowledgeEndPoint.getChapterAndLesson(courseId),
      undefined,
      {
        params: {
          timestamp: new Date().getTime(),
        },
      },
    )
  },

  getQuizByLessonId: (lessonId: string) => {
    return ApiUtil.get<GetQuizByLessonIdRes>(
      KnowledgeEndPoint.getQuizByLessonId(lessonId),
      undefined,
      {
        params: {
          page: 1,
          limit: 15,
          timestamp: new Date().getTime(),
        },
      },
    )
  },

  getWordByLessonId: (lessonId: string) => {
    return ApiUtil.get<GetWordByLessonIdRes>(
      KnowledgeEndPoint.getWordByLessonId(lessonId),
      undefined,
      {
        params: {
          timestamp: new Date().getTime(),
        },
      },
    )
  },

  getAllWord: (params?: Partial<GetAllWordReq>) => {
    return ApiUtil.get<GetAllWordResponse>(
      KnowledgeEndPoint.getAllWord,
      undefined,
      { params },
    )
  },

  getWordById: (id: string) => {
    return ApiUtil.get<GetWordByIdResponse>(KnowledgeEndPoint.getWordById(id))
  },

  getPreTest: () => {
    return ApiUtil.get<GetPreTestResponse>(KnowledgeEndPoint.getPreTest)
  },

  sendResultPreTest: (body: SendPreTestResultRequest) => {
    return ApiUtil.post<SendPreTestResultResponse>(
      KnowledgeEndPoint.sendResultPreTest,
      body,
    )
  },

  getAlCourse: () => {
    return ApiUtil.get<GetAllCourseResponse>(KnowledgeEndPoint.getAllCourse, undefined, {
      params: {
        timestamp: new Date().getTime()
      }
    })
  },
} as const
