import { DefaultResponse, Word } from '@services'
import APIUtils from '@utils/AxiosInstance'
import { Provider } from '@configs'
import { GetAllPostResponse } from '@services/PostService'

const enum endPoints {
  getUserData = 'user/me',
  updateUserAvatar = '/user/me',
  updateProgressLearning = '/user/update-progress-learning',
  getProgressLearning = '/user/learning-stats',
  getStreak = '/user/get-streaks',
  updateStreak = '/user/update-streak',
  getWordsBookmark = '/user/words-bookmark',
  updateFCM = '/user/update-fcm-token',
  getLearningStats = '/user/learning-stats',
  getPostBookmark = '/user/posts-bookmark',
  bookmarkPost = '/user/bookmark-post/',
  migrateGuestAccount = '/user/restored-account',
}

export interface Level {
  _id: string
  attachment: Attachment
  createdAt: string
  description: string
  name: string
  score: number
  type: string
  updatedAt: string
}

export interface UserData {
  _id: string
  email: string
  fullName: string
  avatar: Attachment
  badges: []
  coin: number
  courseCompleted: []
  createdAt: string
  id: string
  isVerified: boolean
  level: Level
  postBookmarks: string[]
  role: string
  score: number
  streaks: string[]
  username: string
  wordBookmarks: []
  provider: Provider | null
  refreshToken: string
  deviceId: string
  deviceName?: string
}

export interface UserStateResponse extends DefaultResponse {
  data: UserData
}

export interface UpdateUserAvatarRequest {
  avatar: Attachment
}

export interface UpdateProgressLearningRequest {
  chapter: string
  lesson?: string
  checkpointScore?: number
  score?: number
}

export interface UpdateProgressLearningResponse extends DefaultResponse {
  data: {
    _id: string
    chapter: string
    user: string
    createdAt: string
    lessons: string[]
    updatedAt: string
  }
}
export interface RankUser {
  streaks: string[]
  _id: string
  avatar: string
  level: string
  score: number
  username: string
}
export interface GetProgressLearningResponse extends DefaultResponse {
  data: number[]
}

export interface BookmarkWordResponse extends DefaultResponse {
  data: UserData
}

export interface GetStreakRequest {
  start: string
  end: string
}

export interface GetStreakResponse extends DefaultResponse {
  data: {
    streaks: string[]
    streakCount: number
  }
}

export interface GetWordsBookmarkResponse extends DefaultResponse {
  data: {
    words: Word[]
  }
}

export interface UpdateFCMTokenRequest {
  fcmToken: string
}

export interface UpdateFCMTokenResponse extends DefaultResponse {
  data: {}
}

export interface GetLearningStatsResponse extends DefaultResponse {
  data: Array<number>
}

export interface GetWordBookmarksReq {
  lessonId: string
  search: string
}
export interface GetBoardResponse extends DefaultResponse {
  data: RankUser[]
}

export interface MigrateAccountRequest {
  deviceId: string
}

interface MigrateAccountResponse extends DefaultResponse {
  data: UserData
}

export const UserService = {
  getUserData() {
    return APIUtils.get<UserStateResponse>(endPoints.getUserData)
  },

  updateUserAvatar(body: UpdateUserAvatarRequest) {
    return APIUtils.patch<UserStateResponse>(endPoints.updateUserAvatar, body)
  },

  getProgressLearning() {
    return APIUtils.get<GetProgressLearningResponse>(
      endPoints.getProgressLearning,
    )
  },

  updateProgressLearning(body: UpdateProgressLearningRequest) {
    return APIUtils.patch<UpdateProgressLearningResponse>(
      endPoints.updateProgressLearning,
      body,
    )
  },

  bookmarkWord(wordId: string) {
    return APIUtils.patch<BookmarkWordResponse>(
      `/user/bookmark-word/${wordId}`,
      {},
    )
  },
  getStreak(params: GetStreakRequest) {
    return APIUtils.get<GetStreakResponse>(endPoints.getStreak, undefined, {
      params,
    })
  },

  updateStreak() {
    return APIUtils.patch<GetStreakResponse>(endPoints.updateStreak, {})
  },

  getWordsBookmark(params?: Partial<GetWordBookmarksReq>) {
    return APIUtils.get<GetWordsBookmarkResponse>(
      endPoints.getWordsBookmark,
      undefined,
      { params },
    )
  },

  updateFCMToken(body: UpdateFCMTokenRequest) {
    return APIUtils.patch<UpdateFCMTokenResponse>(endPoints.updateFCM, body)
  },

  getLearningStats() {
    return APIUtils.get<GetLearningStatsResponse>(endPoints.getLearningStats)
  },

  getPostBookmark() {
    return APIUtils.get<GetAllPostResponse>(endPoints.getPostBookmark)
  },

  bookmarkPost(postId: string) {
    return APIUtils.patch(`${endPoints.bookmarkPost}/${postId}`, {})
  },

  getBoard(levelId: string) {
    return APIUtils.get<GetBoardResponse>(
      `/user/${levelId}/board?timeStamp=${new Date()}`,
    )
  },

  migrateWithGuestAccount(body: MigrateAccountRequest) {
    return APIUtils.post<MigrateAccountResponse>(
      endPoints.migrateGuestAccount,
      body,
    )
  },
} as const
