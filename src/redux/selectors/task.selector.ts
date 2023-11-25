import { RootState } from '@hooks'

export const getTask = (state: RootState) => state.root.taskReducer.tasks
