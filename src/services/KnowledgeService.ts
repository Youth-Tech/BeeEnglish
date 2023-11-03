import { DefaultResponse } from '@services'
import ApiUtil from '@utils/AxiosInstance'

export interface Lesson {
  _id: string
  name: string
  description: string
  order: number
  chapter: string
  attachment: Attachment | null
}

export interface Chapter {
  _id: string
  name: string
  course: string
  order: number
  attachment: Attachment | null
  lessons: Lesson[]
}

export interface GetChapterAndLessonRes extends DefaultResponse {
  data: {
    chapters: Chapter[]
  }
}

export interface Quiz {
  _id: any
  question: string
  answer: any[]
  correctAnswer?: string
  type: QuizType
  attachment?: Attachment
  flag?: boolean
}

export interface GetQuizByLessonIdRes extends DefaultResponse {
  data: {
    quizzes: Quiz[]
  }
}

export const KnowledgeService = {
  getChapterAndLesson: () => {
    return ApiUtil.get<GetChapterAndLessonRes>(
      '/knowledge/chapter/get-chapters-and-lessons',
    )
  },

  getQuizByLessonId: (lessonId: string) => {
    return ApiUtil.get<GetQuizByLessonIdRes>(
      `/knowledge/quiz/${lessonId}/get-quizzes-by-lesson?page=1&limit=20`,
    )
  },
} as const
