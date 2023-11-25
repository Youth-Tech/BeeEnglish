import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getTaskThunk } from '@redux/actions'
import { Task } from '@services/TaskService'

export interface TaskReducerType {
  tasks: Task[]
}

const initialState: TaskReducerType = {
  tasks: [],
}

const streakReducer = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateTaskData(_, action: PayloadAction<TaskReducerType>) {
      return {
        ...action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskThunk.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    })
  },
})

export const { updateTaskData } = streakReducer.actions
const StreakReducer = streakReducer.reducer
export default StreakReducer
