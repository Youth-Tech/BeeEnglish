import {
  useDispatch,
  useSelector,
  shallowEqual,
  TypedUseSelectorHook,
} from 'react-redux'
import { store } from '@redux/store'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = (
  selector: (state: RootState) => TypedUseSelectorHook<RootState>,
) => useSelector(selector, shallowEqual)
