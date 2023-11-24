import { createSlice } from '@reduxjs/toolkit'

export interface IVideos {
  videos: PostResponse[]
}
const initialState: IVideos = {
  videos: [],
}
const videoReducer = createSlice({
  name: 'video',
  initialState,
  reducers: {
    updateVideos(state, action) {
      state.videos = action.payload
    },
  },
})
export const { updateVideos } = videoReducer.actions
export const VideoReducer = videoReducer.reducer
