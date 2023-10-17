import { UserData } from '@services/UserService'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signIn, verifyAccount } from '@redux/actions/auth.action'

export const defaultUserState: UserData = {
  _id: '',
  email: '',
  fullName: '',
  avatar: '',
  badges: [],
  courseCompleted: [],
  createdAt: '',
  id: '',
  isVerified: false,
  level: 0,
  postBookmarks: [],
  role: '',
  score: 0,
  streak: 0,
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
      console.log('Hello from reducer')
      return {
        ...state,
        ...action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
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
  },
})

export const { setUserState } = userSlice.actions
export const UserReducer = userSlice.reducer