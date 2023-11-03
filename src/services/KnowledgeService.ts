import ApiUtil from '@utils/AxiosInstance'
import { DefaultResponse } from '@services'

export interface Lesson {
  _id: string
  name: string
  order: number
  chapter: string
  description: string
  attachment: Attachment | null
}

export interface Chapter {
  _id: string
  name: string
  order: number
  course: string
  lessons: Lesson[]
  attachment: Attachment | null
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
  attachment?: Attachment
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
