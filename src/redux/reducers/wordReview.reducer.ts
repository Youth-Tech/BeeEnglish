import { WordReviews } from '@services'
import { createSlice } from '@reduxjs/toolkit'

export interface WordReviewWords {
  reviewWords: WordReviews[]
}
const initialState: WordReviewWords = {
  reviewWords: [],
}
const wordReviewReducer = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    updateReviewWords(state, action) {
      state.reviewWords = action.payload
    },
  },
})
export const { updateReviewWords } = wordReviewReducer.actions
export const WordReviewReducer = wordReviewReducer.reducer
