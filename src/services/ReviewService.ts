import ApiUtil from '@utils/AxiosInstance'
import { DefaultResponse, Word } from '@services/index'

const ReviewEndPoint = {
  toggleWordReview: '/word-review/toggle',
  getAllWordReviews: '/word-review/get-all',
} as const

export interface ToggleWordRequest {
  word: string
  difficulty: string
}

export interface GetAllWordReviewsReq {
  lesson: string
  search: string
}

export interface ToggleWordResponse extends DefaultResponse {
  data: Word
}

export interface WordReviews {
  word: Word
  difficulty: string
}

export interface GetAllWordsResponse extends DefaultResponse {
  data: {
    wordsReview: WordReviews[]
  }
}

export const ReviewService = {
  toggleWordReview(body: ToggleWordRequest) {
    return ApiUtil.post<ToggleWordResponse>(
      ReviewEndPoint.toggleWordReview,
      body,
    )
  },
  getAllWordReviews(params?: Partial<GetAllWordReviewsReq>) {
    return ApiUtil.get<GetAllWordsResponse>(
      ReviewEndPoint.getAllWordReviews,
      undefined,
      { params },
    )
  },
} as const
