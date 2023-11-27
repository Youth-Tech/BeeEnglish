import { createAsyncThunk } from '@reduxjs/toolkit'
import { TaskReducerType } from '@redux/reducers/task.reducer'
import { TaskService } from '@services/TaskService'

export const getTaskThunk = createAsyncThunk<TaskReducerType>(
  'user/getTask',
  async () => {
    try {
      const resTask = await TaskService.getDailyTasks()

      return {
        tasks: resTask.data.data,
      }
    } catch (e) {
      console.log(e)
    }

    return {
      tasks: [],
    }
  },
)
