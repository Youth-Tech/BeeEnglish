import { DefaultResponse } from '@services'
import ApiUtil from '@utils/AxiosInstance'

export interface GetAllPostRequest {
  title: string
  creator: string
  type: 'video' | 'text'
}

export interface PostIdRequest {
  postId: string
}

export interface UpdateLikePostResponse extends DefaultResponse {}

export interface GetAllPostResponse extends DefaultResponse {
  data: {
    posts: PostResponse[]
  }
}

export interface GetPostCommentsResponse extends DefaultResponse {
  data: {
    comments: Array<Comment>
  }
}

export interface GetRepliesPostCommentRequest {
  postId: string
  commentId: string
}

export interface CreateCommentRequest {
  postId: string
  parent?: string
  content: string
}

export interface CreateCommentResponse extends DefaultResponse {
  data: Comment
}

export interface GetRepliesPostCommentResponse extends DefaultResponse {
  data: {
    comments: Array<Comment>
  }
}

export interface GetRecommendPostRequest {
  topic: string
  activePost: string
  page: number
  limit: number
}

export const PostServices = {
  getAllPost(params?: Partial<GetAllPostRequest>) {
    return ApiUtil.get<GetAllPostResponse>(`/post/get-all`, undefined, {
      params,
    })
  },

  getPostRecommend(query: GetRecommendPostRequest) {
    return ApiUtil.get<GetAllPostResponse>(
      `/post/get-all?type=text`,
      undefined,
      {
        params: query,
      },
    )
  },

  updateLikePost(params: PostIdRequest) {
    return ApiUtil.patch<UpdateLikePostResponse>(
      `/post/${params.postId}/toggle-like`,
      {},
      undefined,
    )
  },

  getPostComments(params: PostIdRequest) {
    return ApiUtil.get<GetPostCommentsResponse>(
      `/post/${params.postId}/comments?page=1&limit=15`,
    )
  },

  getRepliesPostComment(params: GetRepliesPostCommentRequest) {
    return ApiUtil.get<GetRepliesPostCommentResponse>(
      `/post/${params.postId}/comment/${params.commentId}/replies`,
    )
  },

  createComment(params: CreateCommentRequest) {
    return ApiUtil.post<CreateCommentResponse>(
      `/post/${params.postId}/comment`,
      {
        content: params.content,
        parent: params.parent,
      },
    )
  },
} as const
