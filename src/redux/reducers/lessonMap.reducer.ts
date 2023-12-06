import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Course } from '@services'

export interface LessonMapReducer {
  currentCourse: Course | undefined
}

const initialState: LessonMapReducer = {
  currentCourse: {
    _id: '',
    name: '',
    attachment: {},
    level: {
      name: '',
      attachment: {},
      description: '',
      score: 0,
      id: '',
    },
    chapters: 0,
    status: false,
    description: '',
  },
}

const lessonMapReducer = createSlice({
  name: 'lessonMap',
  initialState: initialState,
  reducers: {
    updateCurrentCourse(
      state: LessonMapReducer,
      action: PayloadAction<Course>,
    ) {
      return {
        ...state,
        currentCourse: action.payload,
      }
    },
  },
})

export const { updateCurrentCourse } = lessonMapReducer.actions

export const LessonMapReducer = lessonMapReducer.reducer
