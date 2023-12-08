import { Provider } from '@configs'
import APIUtils from '@utils/AxiosInstance'
import { DefaultResponse, Word } from '@services'
import { GetAllPostResponse } from '@services/PostService'


const UserEndPoint = {
  getUserData: 'user/me',
  updateUserAvatar: '/user/me',
  getStreak: '/user/get-streaks',
  updateStreak: '/user/update-streak',
  updateFCM: '/user/update-fcm-token',
  bookmarkPost: '/user/bookmark-post/',
  getPostBookmark: '/user/posts-bookmark',
  getLearningStats: '/user/learning-stats',
  getWordsBookmark: '/user/words-bookmark',
  getCurrentLesson: '/user/current-lessons',
  getProgressLearning: '/user/learning-stats',
  migrateGuestAccount: '/user/restored-account',
  updateProgressLearning: '/user/update-progress-learning',
  bookmarkWord: (wordId: string) => `/user/bookmark-word/${wordId}`,
  getBoard: (levelId: string) =>
    `/user/${levelId}/board?timeStamp=${new Date()}`,
    getCoins : '/user/coins',
} as const

export interface Level {
  _id: string
  attachment: Attachment
  description: string
  name: string
  score: number
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
  pretest: boolean
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
export interface GetCoinsResponse extends DefaultResponse {
  data: Pick<UserData, '_id' | 'coin'>
}

export interface CurrentLesson {
  lesson: {
    _id: string
    name: string
    description: string
    chapter: {
      _id: string
      topic: {
        _id: string
        name: string
        attachment: Attachment
      }
    }
    order: 3
    attachment: Attachment
  }
  completedAt: string
}

export interface GetCurrentLessonResponse extends DefaultResponse {
  data: Array<CurrentLesson>
}

export const UserService = {
  getUserData() {
    return APIUtils.get<UserStateResponse>(
      UserEndPoint.getUserData.concat(`?timestamp=${new Date().getTime()}`),
    )
  },

  updateUserAvatar(body: UpdateUserAvatarRequest) {
    return APIUtils.patch<UserStateResponse>(
      UserEndPoint.updateUserAvatar,
      body,
    )
  },

  getProgressLearning() {
    return APIUtils.get<GetProgressLearningResponse>(
      UserEndPoint.getProgressLearning,
    )
  },

  updateProgressLearning(body: UpdateProgressLearningRequest) {
    return APIUtils.patch<UpdateProgressLearningResponse>(
      UserEndPoint.updateProgressLearning,
      body,
    )
  },

  bookmarkWord(wordId: string) {
    return APIUtils.patch<BookmarkWordResponse>(
      UserEndPoint.bookmarkWord(wordId),
      {},
    )
  },
  getStreak(params: GetStreakRequest) {
    return APIUtils.get<GetStreakResponse>(UserEndPoint.getStreak, undefined, {
      params,
    })
  },

  updateStreak() {
    return APIUtils.patch<GetStreakResponse>(UserEndPoint.updateStreak, {})
  },

  getWordsBookmark(params?: Partial<GetWordBookmarksReq>) {
    return APIUtils.get<GetWordsBookmarkResponse>(
      UserEndPoint.getWordsBookmark,
      undefined,
      { params },
    )
  },

  updateFCMToken(body: UpdateFCMTokenRequest) {
    return APIUtils.patch<UpdateFCMTokenResponse>(UserEndPoint.updateFCM, body)
  },

  getLearningStats() {
    return APIUtils.get<GetLearningStatsResponse>(UserEndPoint.getLearningStats)
  },

  getPostBookmark() {
    return APIUtils.get<GetAllPostResponse>(UserEndPoint.getPostBookmark)
  },

  bookmarkPost(postId: string) {
    return APIUtils.patch(`${UserEndPoint.bookmarkPost}/${postId}`, {})
  },

  getBoard(levelId: string) {
    return APIUtils.get<GetBoardResponse>(UserEndPoint.getBoard(levelId))
  },

  migrateWithGuestAccount(body: MigrateAccountRequest) {
    return APIUtils.post<MigrateAccountResponse>(
      UserEndPoint.migrateGuestAccount,
      body,
    )
  },
  getCoins() {
    return APIUtils.get<GetCoinsResponse>(UserEndPoint.getCoins)
  },
  getCurrentLesson() {
    return APIUtils.get<GetCurrentLessonResponse>(UserEndPoint.getCurrentLesson)
  },
} as const
