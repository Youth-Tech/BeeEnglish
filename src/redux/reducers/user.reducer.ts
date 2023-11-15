import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EAttachment } from '@utils/enums'
import { UserData } from '@services/UserService'
import { loginOAuthThunk, updateUserAvatar } from '@redux/actions'
import { login, signUp, verifyAccount } from '@redux/actions/auth.action'

export const defaultUserState: UserData = {
  _id: '',
  email: '',
  fullName: '',
  avatar: {
    id: '',
    src: '',
    type: EAttachment.Image,
  },
  badges: [],
  courseCompleted: [],
  createdAt: '',
  id: '',
  isVerified: false,
  level: 0,
  postBookmarks: [],
  role: '',
  score: 0,
  streaks: [],
  username: '',
  wordBookmarks: [],
  provider: '',
  refreshToken: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: defaultUserState,
  reducers: {
    setUserState(state: UserData, action: PayloadAction<UserData>) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        console.log('Hello')
        return {
          ...state,
          ...action.payload.data,
        }
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        return {
          ...state,
          isVerified: action.payload === 200,
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload.data.user,
        }
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        // console.log(action.payload?.code)
        return {
          ...state,
          ...action.payload?.data,
        }
      })
      .addCase(loginOAuthThunk.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload?.data.user
        }
      })
  },
})

export const { setUserState } = userSlice.actions
export const UserReducer = userSlice.reducer
