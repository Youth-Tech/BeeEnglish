import { RootState } from '@hooks'

export const getCurrentCourse = (state: RootState) =>
  state.root.lessonMap.currentCourse