import { DefaultResponse } from '@services/index'
import ApiUtil from '@utils/AxiosInstance'

export const TaskEndPoint = {
  stopTime: `/task/stop-time`,
  startTime: `/task/start-time`,
  getDailyTasks: `/task/get-daily-task`,
} as const

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

export interface GetTasksRes extends DefaultResponse {
  data: Task[]
}
export const TaskService = {
  getDailyTasks() {
    return ApiUtil.get<GetTasksRes>(TaskEndPoint.getDailyTasks)
  },
  startTime() {
    return ApiUtil.post<DefaultResponse>(TaskEndPoint.startTime, {})
  },
  stopTime() {
    return ApiUtil.post<DefaultResponse>(TaskEndPoint.stopTime, {})
  },
}
