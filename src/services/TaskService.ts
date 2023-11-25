import { DefaultResponse } from '@services/index'
import ApiUtil from '@utils/AxiosInstance'

export interface Task {
  _id: string
  title: string
  chapter: string
  progress: number
  score: number
  spentTime: number
  status: string
  target: string
  type: string
}
const endpoints = {
  getDailyTasks: `/task/get-daily-task`,
  startTime: `/task/start-time`,
  stopTime: `/task/stop-time`,
}
export interface GetTasksRes extends DefaultResponse {
  data: Task[]
}
export const TaskService = {
  getDailyTasks() {
    return ApiUtil.get<GetTasksRes>(endpoints.getDailyTasks)
  },
  startTime() {
    return ApiUtil.post<DefaultResponse>(endpoints.startTime, {})
  },
  stopTime() {
    return ApiUtil.post<DefaultResponse>(endpoints.stopTime, {})
  },
}
