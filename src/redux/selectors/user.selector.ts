import { RootState } from '@hooks'

export const getUserData = (state: RootState) => state.root.user
export const getIsPreTest = (state: RootState) => state.root.user.pretest

export const getUserRole = (state: RootState) => state.root.user.role
