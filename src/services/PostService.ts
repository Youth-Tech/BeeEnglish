import { DefaultResponse } from '@services'
import ApiUtil from '@utils/AxiosInstance'

const PostEndPoint = {
  getAllPost: '/post/get-all',
  getPostRecommend: '/post/get-all?type=text',
  getPostComments: (postId: string) => `/post/${postId}/comments`,
  updateLikePost: (postId: string) => `/post/${postId}/toggle-like`,
  getRepliesPostComment: (params: GetRepliesPostCommentRequest) =>
    `/post/${params.postId}/comment/${params.commentId}/replies`,
  createComment: (postId: string) => `/post/${postId}/comment`,
  markAsRead: (postId: string) => `/post/${postId}/mark-as-read`,
} as const

export interface GetAllPostRequest {
  title: string
  creator: string
  type: 'video' | 'text'
  read?: boolean
  like?: boolean
  page: number
  limit: number
}

export interface PostIdRequest {
  postId: string
}

export interface UpdateLikePostResponse extends DefaultResponse {}

export interface GetAllPostResponse extends DefaultResponse {
  data: {
    posts: PostResponse[]
    pagination: Pagination
  }
}

export interface GetPostCommentRequest {
  postId: string
  limit?: number
  page?: number
}

export interface GetPostCommentsResponse extends DefaultResponse {
  data: {
    comments: Array<Comment>
    pagination: Pagination
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
    return ApiUtil.get<GetAllPostResponse>(PostEndPoint.getAllPost, undefined, {
      params,
    })
  },

  getPostRecommend(query: GetRecommendPostRequest) {
    return ApiUtil.get<GetAllPostResponse>(
      PostEndPoint.getPostRecommend,
      undefined,
      {
        params: query,
      },
    )
  },

  updateLikePost(params: PostIdRequest) {
    return ApiUtil.patch<UpdateLikePostResponse>(
      PostEndPoint.updateLikePost(params.postId),
      {},
      undefined,
    )
  },

  getPostComments(params: GetPostCommentRequest) {
    return ApiUtil.get<GetPostCommentsResponse>(
      PostEndPoint.getPostComments(params.postId),
      undefined,
      {
        params: {
          ...params,
          timestamp: new Date().getTime(),
        },
      },
    )
  },

  getRepliesPostComment(params: GetRepliesPostCommentRequest) {
    return ApiUtil.get<GetRepliesPostCommentResponse>(
      PostEndPoint.getRepliesPostComment(params),
    )
  },

  createComment(params: CreateCommentRequest) {
    return ApiUtil.post<CreateCommentResponse>(
      PostEndPoint.createComment(params.postId),
      {
        content: params.content,
        parent: params.parent,
      },
    )
  },

  markAsRead(postId: string) {
    return ApiUtil.patch<DefaultResponse>(PostEndPoint.markAsRead(postId), {})
  },
} as const
