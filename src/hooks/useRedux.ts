import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { store } from 'reduxs/store'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
