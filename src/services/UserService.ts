import { DefaultResponse } from '@services'
import APIUtils from '@utils/AxiosInstance'
import { AxiosRequestHeaders } from 'axios'

const enum endPoints {
  getUserData = 'user/me',
  updateUserAvatar = '/user/me',
  updateProgressLearning = '/user/update-progress-learning',
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
  streak: number
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
} as const
