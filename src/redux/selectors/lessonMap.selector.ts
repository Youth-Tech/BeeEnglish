import { RootState } from '@hooks'

export const getCurrentCourse = (state: RootState) =>
  state.root.lessonMap.currentCourse

export const getRequireFetchCurrentLesson = (state: RootState) =>
  state.root.lessonMap.requireFetchNewCurrentLesson
