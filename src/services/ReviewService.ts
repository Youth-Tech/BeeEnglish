import ApiUtil from '@utils/AxiosInstance'
import { DefaultResponse, Word } from '@services/index'

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
export interface WordReviews extends Word {
  difficulty: string
}
export interface GetAllWordsResponse extends DefaultResponse {
  data: {
    wordsReview: WordReviews[]
  }
}
const endPoints = {
  toggleWordReview: '/word-review/toggle',
  getAllWordReviews: '/word-review/get-all',
}

export const ReviewService = {
  toggleWordReview(body: ToggleWordRequest) {
    return ApiUtil.post<ToggleWordResponse>(endPoints.toggleWordReview, body)
  },
  getAllWordReviews(params?: Partial<GetAllWordReviewsReq>) {
    return ApiUtil.get<GetAllWordsResponse>(
      endPoints.getAllWordReviews,
      undefined,
      { params },
    )
  },
} as const
