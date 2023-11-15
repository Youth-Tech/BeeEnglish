import { Word } from '@services'
import { createSlice } from '@reduxjs/toolkit'

export interface BookmarkWords {
  bookmarkWords: Word[]
}
const initialState: BookmarkWords = {
  bookmarkWords: [],
}
const bookmarkReducer = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    updateBookmarkWords(state, action) {
      state.bookmarkWords = action.payload
    },
  },
})
export const { updateBookmarkWords } = bookmarkReducer.actions
export const BookmarkReducer = bookmarkReducer.reducer
