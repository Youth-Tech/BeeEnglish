import ApiUtil from '@utils/AxiosInstance'
import { DefaultResponse, Word } from '@services/index'

export interface ToggleWordRequest {
  word: string
  difficulty: string
}
export interface ToggleWordResponse extends DefaultResponse {
  data: Word
}
export interface WordReviews {
  _id: string
  user: string
  word: Word
  difficulty: string
  stage: number
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
  getAllWordReviews(lessonId?: string) {
    return ApiUtil.get<GetAllWordsResponse>(
      lessonId
        ? endPoints.getAllWordReviews.concat(`?lesson=${lessonId}`)
        : endPoints.getAllWordReviews,
    )
  },
} as const
