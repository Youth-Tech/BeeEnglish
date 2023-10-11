import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "@redux/reducers/auth.reducer";
import {UserData} from "@services/UserService";

const defaultUserState: UserData = {
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
        setUserState(state: UserData, action: PayloadAction<AuthState>) {
            return {
                ...state,
                ...action.payload,
            }
        },
    },
})

export const { setUserState } = userSlice.actions
export const UserReducer = userSlice.reducer
