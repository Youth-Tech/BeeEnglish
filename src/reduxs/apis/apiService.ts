import { RootState } from '@hooks/useRedux'
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://192.168.1.6:8000'
const END_POINT_REFRESH_TOKEN = '/refresh'

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).root.auth.token
      if (token && endpoint !== END_POINT_REFRESH_TOKEN) {
        headers.set('authorization', `Bearer ${token}`)
        // other header....
      }
      return headers
    },
  }),
  {
    // default retry 3 times
    maxRetries: 3,
  },
)
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      END_POINT_REFRESH_TOKEN,
      api,
      extraOptions,
    )
    if (refreshResult.data) {
      // store the new token
      //   api.dispatch(tokenReceived(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      //   api.dispatch(loggedOut())
    }
  }
  return result
}

export const apiService = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
