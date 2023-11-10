import ApiUtil from '@utils/AxiosInstance'
import { DefaultResponse, Word } from '@services/index'

export interface ToggleWordRequest {
  word: string
  difficulty: string
}
export interface ToggleWordResponse extends DefaultResponse {
  data: Word
}
const endPoints = {
  toggleWordReview: '/word-review/toggle',
}
export const ReviewService = {
  toggleWordReview(body: ToggleWordRequest) {
    return ApiUtil.post<ToggleWordResponse>(endPoints.toggleWordReview, body)
  },
} as const
