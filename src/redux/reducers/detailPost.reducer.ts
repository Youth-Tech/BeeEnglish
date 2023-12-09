import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DetailPostState {
  data?: PostResponse
  isLoading: boolean
  isShowBottomSheet: boolean
  isShowComment: boolean
  word: string
  isAdjustPostData: boolean
  parentCommentId: string
}

const initialState: DetailPostState = {
  word: '',
  isLoading: false,
  parentCommentId: '',
  isShowComment: false,
  isShowBottomSheet: false,
  isAdjustPostData: false,
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
    setIsAdjustPostData: (state, action: PayloadAction<boolean>) => {
      state.isAdjustPostData = action.payload
    },
    setParentCommentId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        parentCommentId: action.payload,
      }
    },
  },
})

export const {
  setWord,
  setLoading,
  changeShowComment,
  setIsAdjustPostData,
  setParentCommentId,
  changeBottomSheetState,
} = detailPostReducer.actions
export const DetailPostReducer = detailPostReducer.reducer
