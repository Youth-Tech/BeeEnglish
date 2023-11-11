import { AxiosRequestHeaders } from 'axios'

import { DefaultResponse, Word } from '@services'
import APIUtils from '@utils/AxiosInstance'

const enum endPoints {
  getUserData = 'user/me',
  updateUserAvatar = '/user/me',
  updateProgressLearning = '/user/update-progress-learning',
  getStreak = '/user/get-streaks',
  updateStreak = '/user/update-streak',
  getWordsBookmark = '/user/get-words-bookmark',
}

export interface UserData {
  _id: string
  email: string
  fullName: string
  avatar: Attachment
  badges: []
  courseCompleted: []
  createdAt: string
  id: string
  isVerified: boolean
  level: number
  postBookmarks: []
  role: string
  score: number
  streaks: string[]
  username: string
  wordBookmarks: []
  provider: string
  refreshToken: string
}

export type UserStateResponse = {
  data: UserData
}

export interface UpdateUserAvatarRequest {
  avatar: Attachment
}

export interface UpdateProgressLearningRequest {
  chapter: string
  lessons: string[]
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
export const UserService = {
  getUserData(token: string) {
    return APIUtils.get<UserStateResponse>(endPoints.getUserData, {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    } as AxiosRequestHeaders)
  },

  updateUserAvatar(body: UpdateUserAvatarRequest) {
    return APIUtils.patch<UserStateResponse>(endPoints.updateUserAvatar, body)
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
  getWordsBookmark() {
    return APIUtils.get<GetWordsBookmarkResponse>(endPoints.getWordsBookmark)
  },
} as const
