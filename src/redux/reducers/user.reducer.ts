import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EAttachment } from '@utils/enums'
import { UserData } from '@services/UserService'
import {
  loginForGuest,
  loginOAuthThunk,
  updateProfile,
  updateUserAvatar,
} from '@redux/actions'
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
  coin: 0,
  courseCompleted: [],
  createdAt: '',
  id: '',
  isVerified: false,
  level: '',
  postBookmarks: [],
  role: '',
  score: 0,
  streaks: [],
  username: '',
  wordBookmarks: [],
  provider: null,
  refreshToken: '',
  deviceId: '',
  deviceName: '',
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
    setPostBookmark(
      state: UserData,
      action: PayloadAction<Pick<UserData, 'postBookmarks'>>,
    ) {
      return {
        ...state,
        postBookmarks: action.payload.postBookmarks,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state) => {
        console.log('Hello')
        return {
          ...state,
          // ...action.payload.data,
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
          ...action.payload?.data.user,
        }
      })
      .addCase(loginForGuest.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload?.data.user,
        }
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          return {
            ...state,
            ...action.payload,
          }
        }
        return state
      })
  },
})

export const { setUserState, setPostBookmark } = userSlice.actions
export const UserReducer = userSlice.reducer
