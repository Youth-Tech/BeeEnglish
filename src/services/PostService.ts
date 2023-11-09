import { DefaultResponse } from '@services'
import ApiUtil from '@utils/AxiosInstance'

export interface GetAllPostRequest {
  title: string
  creator: string
  type: 'video' | 'text'
}

export interface GetAllPostResponse extends DefaultResponse {
  data: {
    posts: PostResponse[]
  }
}

export const PostServices = {
  getAllPost(params?: Partial<GetAllPostRequest>) {
    return ApiUtil.get<GetAllPostResponse>(`/post/get-all`, undefined, {
      params,
    })
  },
} as const
