import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Course } from '@services'

export interface LessonMapReducer {
  currentCourse: Course | undefined
  requireFetchNewCurrentLesson: boolean
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
    completed: 0,
    progress: 0,
  },
  requireFetchNewCurrentLesson: false,
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
    updateFetchNewLessonState(
      state: LessonMapReducer,
      action: PayloadAction<boolean>,
    ) {
      return {
        ...state,
        requireFetchNewCurrentLesson: action.payload,
      }
    },
  },
})

export const { updateCurrentCourse, updateFetchNewLessonState } =
  lessonMapReducer.actions

export const LessonMapReducer = lessonMapReducer.reducer
