import { createSlice } from '@reduxjs/toolkit'

export interface DetailPostState {
  data?: PostResponse
  isLoading: boolean
  isShowBottomSheet: boolean
  isShowComment: boolean
  word: string
}

const initialState: DetailPostState = {
  isLoading: false,
  isShowBottomSheet: false,
  isShowComment: false,
  word: '',
}

const detailPostReducer = createSlice({
  name: 'detailPost',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setWord: (state, action) => {
      state.word = action.payload
      state.isShowBottomSheet = true
    },
    changeBottomSheetState: (state, action) => {
      state.isShowBottomSheet = action.payload
    },
    changeShowComment: (state, action) => {
      state.isShowComment = action.payload
    },
  },
})

export const {
  setLoading,
  setWord,
  changeBottomSheetState,
  changeShowComment,
} = detailPostReducer.actions
export const DetailPostReducer = detailPostReducer.reducer
