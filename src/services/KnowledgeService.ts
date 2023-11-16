import ApiUtil from '@utils/AxiosInstance'
import { DefaultResponse } from '@services'

export interface Lesson {
  _id: string
  name: string
  order: number
  chapter: string
  description: string
  attachment: Attachment | null
  status: boolean
}

export interface Chapter {
  _id: string
  name: string
  order: number
  course: string
  lessons: Lesson[]
  status: boolean
  attachment: Attachment | null
  checkpoint?: Quiz[]
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
export interface GetAllWordResponse extends DefaultResponse {
  data: {
    words: Word[]
  }
}
export const KnowledgeService = {
  getChapterAndLesson: () => {
    return ApiUtil.get<GetChapterAndLessonRes>(
      `/knowledge/chapter/get-chapters-and-lessons?timestamp=${new Date().getTime()}`,
    )
  },

  getQuizByLessonId: (lessonId: string) => {
    return ApiUtil.get<GetQuizByLessonIdRes>(
      `/knowledge/quiz/${lessonId}/get-quizzes-by-lesson?page=1&limit=20`,
    )
  },

  getWordByLessonId: (lessonId: string) => {
    return ApiUtil.get<GetWordByLessonIdRes>(
      `/knowledge/word/${lessonId}/get-words-by-lesson`,
    )
  },

  getAllWord: (page: number, limit: number) => {
    return ApiUtil.get<GetAllWordResponse>(
      `/knowledge/word/get-all?page=${page}&limit=${limit}`,
    )
  },
} as const
